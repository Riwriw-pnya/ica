"use client";

import { Suspense, useEffect, useRef, useState, useCallback } from "react";
import { useToast } from "@/context/ToastContext";
import { useRouter, useSearchParams } from "next/navigation";
import { catteryProfile, maleCats, femaleCats } from "@/data/cattery";
import { useDrafts } from "@/context/DraftContext";
import { useHeaderAction } from "@/context/HeaderActionContext";
import Stepper from "./components/Stepper";
import StepFooter from "./components/StepFooter";
import StepDataCattery from "./components/StepDataCattery";
import StepPilihPejantan from "./components/StepPilihPejantan";
import StepPilihInduk from "./components/StepPilihInduk";
import StepMatingInformation from "./components/StepMatingInformation";
import StepAddOffspring from "./components/StepAddOffspring";
import StepUploadDokumen, { toFileInfo } from "./components/StepUploadDocument";
import StepReviewSubmit from "./components/StepReviewSubmit";
import { CatCertificateFile, OffspringItem } from "@/types/cattery";

const stepTitles = ["Data Cattery", "Pilih Pejantan", "Pilih Induk", "Mating Information", "Add Offspring", "Upload Dokumen", "Review & Submit"];
const SESSION_STORAGE_KEY = "mating_report_form_persistent_data";

function MatingReportsForm() {
  const { showToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draft");
  const { getDraft, saveDraft, deleteDraft } = useDrafts();
  const { setCustomAction } = useHeaderAction();

  const [activeDraftId, setActiveDraftId] = useState<string | undefined>(undefined);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMaleId, setSelectedMaleId] = useState<number | null>(null);
  const [selectedFemaleId, setSelectedFemaleId] = useState<number | null>(null);

  const [matingDate, setMatingDate] = useState("");
  const [estimatedBirthDate, setEstimatedBirthDate] = useState("");
  const [witnessName, setWitnessName] = useState("");
  const [isEstimateAuto, setIsEstimateAuto] = useState(true);

  const [offspringItems, setOffspringItems] = useState<OffspringItem[]>([
    { id: 1, name: "", gender: "" as any, color: "", birthDate: "", birthWeight: "", breed: "", status: "" as any },
  ]);

  const [matingPhoto, setMatingPhoto] = useState<CatCertificateFile | null>(null);
  const [kittenPhotos, setKittenPhotos] = useState<CatCertificateFile | null>(null);
  const [vetLetter, setVetLetter] = useState<CatCertificateFile | null>(null);
  const [paymentProof, setPaymentProof] = useState<CatCertificateFile | null>(null);

  const hasLoadedData = useRef(false);

  // Ref untuk lacak data saat unmount/navigasi keluar
  const selectedMaleIdRef = useRef(selectedMaleId);
  useEffect(() => {
    selectedMaleIdRef.current = selectedMaleId;
  }, [selectedMaleId]);

  const submittedRef = useRef(false);

  // 1. LOAD DATA DARI SESSION STORAGE ATAU DRAFT
  useEffect(() => {
    if (hasLoadedData.current) return;
    hasLoadedData.current = true;

    if (draftId) {
      const draft = getDraft(draftId);
      if (!draft) {
        showToast("Draft tidak ditemukan", "Draft ini mungkin sudah dihapus atau tidak valid.", { tone: "error" });
        return;
      }

      setActiveDraftId(draft.id);
      setSelectedMaleId(draft.selectedMaleId);
      setSelectedFemaleId(draft.selectedFemaleId);
      setMatingDate(draft.matingDate);
      setEstimatedBirthDate(draft.estimatedBirthDate);
      setIsEstimateAuto(draft.isEstimateAuto);
      setWitnessName(draft.witnessName);
      setOffspringItems(draft.offspringItems);
      setCurrentStep(draft.currentStep);

      showToast("Draft dimuat", `Melanjutkan ${draft.code} · ${draft.pair} dari step ${draft.currentStep}.`);
      return;
    }

    const isPageReloaded =
      typeof window !== "undefined" &&
      performance.getEntriesByType("navigation").some(
        (nav: any) => nav.type === "reload"
      );

    if (isPageReloaded && typeof window !== "undefined") {
      const savedForm = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (savedForm) {
        try {
          const parsed = JSON.parse(savedForm);
          if (parsed) {
            if (parsed.currentStep) setCurrentStep(parsed.currentStep);
            if (parsed.selectedMaleId !== undefined) setSelectedMaleId(parsed.selectedMaleId);
            if (parsed.selectedFemaleId !== undefined) setSelectedFemaleId(parsed.selectedFemaleId);
            if (parsed.matingDate) setMatingDate(parsed.matingDate);
            if (parsed.estimatedBirthDate) setEstimatedBirthDate(parsed.estimatedBirthDate);
            if (parsed.isEstimateAuto !== undefined) setIsEstimateAuto(parsed.isEstimateAuto);
            if (parsed.witnessName) setWitnessName(parsed.witnessName);
            if (parsed.offspringItems) setOffspringItems(parsed.offspringItems);
            if (parsed.matingPhoto) setMatingPhoto(parsed.matingPhoto);
            if (parsed.kittenPhotos) setKittenPhotos(parsed.kittenPhotos);
            if (parsed.vetLetter) setVetLetter(parsed.vetLetter);
            if (parsed.paymentProof) setPaymentProof(parsed.paymentProof);
            return;
          }
        } catch (e) {
          console.error("Gagal membaca cache form:", e);
        }
      }
    }

    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }

    setActiveDraftId(undefined);
    setSelectedMaleId(null);
    setSelectedFemaleId(null);
    setMatingDate("");
    setEstimatedBirthDate("");
    setIsEstimateAuto(true);
    setWitnessName("");
    setOffspringItems([
      { id: 1, name: "", gender: "" as any, color: "", birthDate: "", birthWeight: "", breed: "", status: "" as any },
    ]);
    setMatingPhoto(null);
    setKittenPhotos(null);
    setVetLetter(null);
    setPaymentProof(null);
    setCurrentStep(typeof window !== "undefined" && window.innerWidth < 768 ? 2 : 1);
  }, [draftId, getDraft, showToast]);

  // 2. OTOMATIS SIMPAN KE SESSION STORAGE SETIAP KALI STATE BERUBAH
  useEffect(() => {
    if (typeof window === "undefined") return;

    const formData = {
      currentStep,
      selectedMaleId,
      selectedFemaleId,
      matingDate,
      estimatedBirthDate,
      isEstimateAuto,
      witnessName,
      offspringItems,
      matingPhoto,
      kittenPhotos,
      vetLetter,
      paymentProof,
    };

    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(formData));
  }, [
    currentStep,
    selectedMaleId,
    selectedFemaleId,
    matingDate,
    estimatedBirthDate,
    isEstimateAuto,
    witnessName,
    offspringItems,
    matingPhoto,
    kittenPhotos,
    vetLetter,
    paymentProof,
  ]);

  const selectedMale = maleCats.find((c) => c.id === selectedMaleId);
  const selectedFemale = femaleCats.find((c) => c.id === selectedFemaleId);

  const handleSaveDraft = useCallback(
    (options?: { silent?: boolean }) => {
      const pair =
        selectedMale && selectedFemale
          ? `${selectedMale.name.split(" ")[0]} × ${selectedFemale.name.split(" ")[0]}`
          : "Belum lengkap";

      const newId = saveDraft({
        id: activeDraftId,
        pair,
        currentStep,
        selectedMaleId,
        selectedFemaleId,
        matingDate,
        estimatedBirthDate,
        isEstimateAuto,
        witnessName,
        offspringItems,
      });

      setActiveDraftId(newId);
      if (!options?.silent) {
        showToast("Draft tersimpan", "Anda bisa melanjutkan pengisian kapan saja dari halaman Draft.");
      }
    },
    [
      saveDraft,
      activeDraftId,
      selectedMale,
      selectedFemale,
      currentStep,
      selectedMaleId,
      selectedFemaleId,
      matingDate,
      estimatedBirthDate,
      isEstimateAuto,
      witnessName,
      offspringItems,
      showToast,
    ]
  );

  const handleSaveDraftRef = useRef(handleSaveDraft);
  useEffect(() => {
    handleSaveDraftRef.current = handleSaveDraft;
  }, [handleSaveDraft]);

  // AUTO-SAVE SAAT NAVIGASI KELUAR / UNMOUNT
  useEffect(() => {
    return () => {
      if (submittedRef.current) return;
      if (typeof window === "undefined") return;

      if (selectedMaleIdRef.current !== null) {
        handleSaveDraftRef.current?.({ silent: true });
      }

      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    };
  }, []);

  useEffect(() => {
    setCustomAction(() => () => {
      if (handleSaveDraftRef.current) {
        handleSaveDraftRef.current();
      }
    });

    return () => setCustomAction(null);
  }, [setCustomAction]);

  function formatSingleDate(dateStr: string, days: number) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function formatDateRangeLabel(dateStr: string, minDays: number, maxDays: number) {
    const base = new Date(dateStr);
    const min = new Date(base);
    min.setDate(min.getDate() + minDays);
    const max = new Date(base);
    max.setDate(max.getDate() + maxDays);
    const minLabel = min.toLocaleDateString("id-ID", { day: "numeric" });
    const maxLabel = max.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    return `${minLabel}–${maxLabel}`;
  }

  const handleMatingDateChange = (value: string) => {
    setMatingDate(value);
    if (isEstimateAuto && value) {
      setEstimatedBirthDate(formatSingleDate(value, 64));
    }
  };

  const handleEstimatedBirthDateChange = (value: string) => {
    setEstimatedBirthDate(value);
    setIsEstimateAuto(false);
  };

  const totalSteps = stepTitles.length;

  const breedLabel =
    selectedMale && selectedFemale
      ? selectedMale.breed === selectedFemale.breed
        ? selectedMale.breed
        : `${selectedMale.breed} × ${selectedFemale.breed}`
      : "-";

  const isStepValid = (step: number) => {
    if (step === 1) return true;
    if (step === 2) return selectedMaleId !== null;
    if (step === 3) return selectedFemaleId !== null;
    if (step === 4) return matingDate !== "" && estimatedBirthDate !== "" && witnessName.trim() !== "";
    if (step === 5) return offspringItems.some((k) => k.name && k.gender && k.birthDate);
    if (step === 6) return matingPhoto !== null;
    return true;
  };

  const canGoNext = isStepValid(currentStep);
  const [showError, setShowError] = useState(false);

  const goNext = () => {
    if (!canGoNext) {
      setShowError(true);
      if (currentStep === 2) showToast("Kucing pejantan belum dipilih", "Pilih satu pejantan sebelum melanjutkan.", { tone: "error" });
      else if (currentStep === 3) showToast("Kucing induk belum dipilih", "Pilih satu induk sebelum melanjutkan.", { tone: "error" });
      else if (currentStep === 4) {
        if (!matingDate) showToast("Tanggal mating belum diisi", "Lengkapi tanggal mating terlebih dahulu.", { tone: "error" });
        else if (!estimatedBirthDate) showToast("Estimasi tanggal lahir belum diisi", "Lengkapi estimasi tanggal lahir terlebih dahulu.", { tone: "error" });
        else if (!witnessName.trim()) showToast("Nama saksi belum diisi", "Lengkapi nama saksi / breeder pendamping.", { tone: "error" });
      } else if (currentStep === 5) showToast("Data kitten belum lengkap", "Minimal satu kitten wajib diisi nama, jenis kelamin, dan tanggal lahir.", { tone: "error" });
      else if (currentStep === 6) showToast("Dokumen wajib belum lengkap", "Foto mating / kandang wajib diunggah.", { tone: "error" });
      return;
    }
    setShowError(false);
    setCurrentStep((s) => Math.min(totalSteps, s + 1));
  };

  const goBack = () => {
    setShowError(false);
    const minStep = typeof window !== "undefined" && window.innerWidth < 768 ? 2 : 1;
    setCurrentStep((s) => Math.max(minStep, s - 1));
  };

  const goToStep = (step: number) => {
    if (step < currentStep) {
      setShowError(false);
      setCurrentStep(step);
    }
  };

  const [maleCertFile, setMaleCertFile] = useState<CatCertificateFile | null>(null);
  const [femaleCertFile, setFemaleCertFile] = useState<CatCertificateFile | null>(null);

  useEffect(() => {
    if (selectedMale?.certificateFile && !maleCertFile) {
      setMaleCertFile(selectedMale.certificateFile);
    }
  }, [selectedMale]);

  useEffect(() => {
    if (selectedFemale?.certificateFile && !femaleCertFile) {
      setFemaleCertFile(selectedFemale.certificateFile);
    }
  }, [selectedFemale]);

  // FUNGSI SUBMIT UTAMA & CLEANUP DRAFT
  const handleSubmit = async () => {
    submittedRef.current = true;

    if (draftId || activeDraftId) {
      deleteDraft(draftId || activeDraftId!);
    }

    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }

    const code = `MR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    router.push(`/cattery/mating-reports/success?code=${encodeURIComponent(code)}`);
  };

  return (
    <div className="p-3 sm:p-8 pb-12 sm:pb-8">
      <main className="min-h-full bg-[var(--color-ink-50)]">
        <div className="mx-auto max-w-[1200px] p-2 sm:p-6">
          <Stepper currentStep={currentStep} onStepClick={goToStep} />

          <div className="mt-3 sm:mt-4">
            {currentStep === 1 && <StepDataCattery profile={catteryProfile} />}

            {currentStep === 2 && (
              <StepPilihPejantan
                cats={maleCats}
                selectedId={selectedMaleId}
                onSelect={setSelectedMaleId}
                showError={showError}
              />
            )}

            {currentStep === 3 && (
              <StepPilihInduk
                cats={femaleCats}
                selectedId={selectedFemaleId}
                onSelect={setSelectedFemaleId}
                selectedMale={selectedMale}
                selectedMaleId={selectedMaleId}
                showError={showError}
              />
            )}

            {currentStep === 4 && (
              <StepMatingInformation
                maleRegCode={selectedMale?.regCode ?? "-"}
                femaleRegCode={selectedFemale?.regCode ?? "-"}
                matingDate={matingDate}
                onMatingDateChange={handleMatingDateChange}
                estimatedBirthDate={estimatedBirthDate}
                onEstimatedBirthDateChange={handleEstimatedBirthDateChange}
                isEstimateAuto={isEstimateAuto}
                rangeLabel={matingDate ? formatDateRangeLabel(matingDate, 60, 68) : ""}
                witnessName={witnessName}
                onWitnessNameChange={setWitnessName}
                showError={showError}
              />
            )}

            {currentStep === 5 && (
              <StepAddOffspring items={offspringItems} onChangeItems={setOffspringItems} defaultBreed={breedLabel} showError={showError} />
            )}

            {currentStep === 6 && (
              <StepUploadDokumen
                maleCertFile={maleCertFile}
                onMaleCertChange={(f) => setMaleCertFile(toFileInfo(f))}
                onMaleCertRemove={() => setMaleCertFile(null)}

                femaleCertFile={femaleCertFile}
                onFemaleCertChange={(f) => setFemaleCertFile(toFileInfo(f))}
                onFemaleCertRemove={() => setFemaleCertFile(null)}

                matingPhoto={{ file: matingPhoto }}
                onMatingPhotoChange={(f) => setMatingPhoto(toFileInfo(f))}
                onMatingPhotoRemove={() => setMatingPhoto(null)}

                kittenPhotos={{ file: kittenPhotos }}
                onKittenPhotosChange={(f) => setKittenPhotos(toFileInfo(f))}
                onKittenPhotosRemove={() => setKittenPhotos(null)}

                vetLetter={{ file: vetLetter }}
                onVetLetterChange={(f) => setVetLetter(toFileInfo(f))}
                onVetLetterRemove={() => setVetLetter(null)}

                paymentProof={{ file: paymentProof }}
                onPaymentProofChange={(f) => setPaymentProof(toFileInfo(f))}
                onPaymentProofRemove={() => setPaymentProof(null)}
                showError={showError}
              />
            )}

            {currentStep === 7 && (
              <StepReviewSubmit
                maleName={selectedMale?.name ?? "-"}
                femaleName={selectedFemale?.name ?? "-"}
                maleRegCode={selectedMale?.regCode ?? "-"}
                femaleRegCode={selectedFemale?.regCode ?? "-"}
                matingDate={matingDate}
                estimatedBirthDate={estimatedBirthDate}
                witnessName={witnessName}
                offspringItems={offspringItems}
                documents={[
                  { label: "Sertifikat pedigree pejantan", file: selectedMale?.certificateFile ?? null },
                  { label: "Sertifikat pedigree induk", file: selectedFemale?.certificateFile ?? null },
                  { label: "Foto mating / kandang", file: matingPhoto },
                  { label: "Foto tiap kitten", file: kittenPhotos },
                  { label: "Surat keterangan dokter hewan", file: vetLetter },
                  { label: "Bukti pembayaran", file: paymentProof },
                ]}
                onEditStep={goToStep}
                onSubmit={handleSubmit}
              />
            )}
          </div>

          {currentStep < 7 && (
            <StepFooter
              currentStep={currentStep}
              totalSteps={totalSteps}
              onBack={goBack}
              onNext={goNext}
              nextDisabled={!canGoNext}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default function MatingReportsPage() {
  return (
    <Suspense fallback={null}>
      <MatingReportsForm />
    </Suspense>
  );
}