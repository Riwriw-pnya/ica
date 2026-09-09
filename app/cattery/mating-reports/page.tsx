"use client";
import { showErrorToast } from "@/lib/toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { catteryProfile, maleCats, femaleCats } from "@/data/cattery";
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

export default function MatingReportsPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMaleId, setSelectedMaleId] = useState<number | null>(null);
  const [selectedFemaleId, setSelectedFemaleId] = useState<number | null>(null);

  const [matingDate, setMatingDate] = useState("");
  const [estimatedBirthDate, setEstimatedBirthDate] = useState("");
  const [witnessName, setWitnessName] = useState("");

  const [isEstimateAuto, setIsEstimateAuto] = useState(true);

  function formatSingleDate(dateStr: string, days: number) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10); // format YYYY-MM-DD buat <input type="date">
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
      setEstimatedBirthDate(formatSingleDate(value, 64)); // titik tengah 60-68 hari
    }
  };

  const handleEstimatedBirthDateChange = (value: string) => {
    setEstimatedBirthDate(value);
    setIsEstimateAuto(false);
  };

  const [offspringItems, setOffspringItems] = useState<OffspringItem[]>([
    { id: 1, name: "", gender: "", color: "", birthDate: "", birthWeight: "", breed: "", status: "Hidup" },
  ]);

  const [matingPhoto, setMatingPhoto] = useState<CatCertificateFile | null>(null);
  const [kittenPhotos, setKittenPhotos] = useState<CatCertificateFile | null>(null);
  const [vetLetter, setVetLetter] = useState<CatCertificateFile | null>(null);
  const [paymentProof, setPaymentProof] = useState<CatCertificateFile | null>(null);

  const selectedMale = maleCats.find((c) => c.id === selectedMaleId);
  const selectedFemale = femaleCats.find((c) => c.id === selectedFemaleId);

  const totalSteps = stepTitles.length;

  const breedLabel =
    selectedMale && selectedFemale
      ? selectedMale.breed === selectedFemale.breed
        ? selectedMale.breed
        : `${selectedMale.breed} × ${selectedFemale.breed}`
      : "-";

  // Validasi: apakah step ini sudah cukup lengkap untuk lanjut?
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

    if (currentStep === 2) {
      showErrorToast("Kucing pejantan belum dipilih", "Pilih satu pejantan sebelum melanjutkan.");
    } else if (currentStep === 3) {
      showErrorToast("Kucing induk belum dipilih", "Pilih satu induk sebelum melanjutkan.");
    } else if (currentStep === 4) {
      if (!matingDate) {
        showErrorToast("Tanggal mating belum diisi", "Lengkapi tanggal mating terlebih dahulu.");
      } else if (!estimatedBirthDate) {
        showErrorToast("Estimasi tanggal lahir belum diisi", "Lengkapi estimasi tanggal lahir terlebih dahulu.");
      } else if (!witnessName.trim()) {
        showErrorToast("Nama saksi belum diisi", "Lengkapi nama saksi / breeder pendamping.");
      }
    } else if (currentStep === 5) {
      showErrorToast("Data kitten belum lengkap", "Minimal satu kitten wajib diisi nama, jenis kelamin, dan tanggal lahir.");
    } else if (currentStep === 6) {
      showErrorToast("Dokumen wajib belum lengkap", "Foto mating / kandang wajib diunggah.");
    }

    return;
  }

  setShowError(false);
  setCurrentStep((s) => Math.min(totalSteps, s + 1));
};

  const goBack = () => {
    setShowError(false);
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const goToStep = (step: number) => {
    if (step < currentStep) {
      setShowError(false);
      setCurrentStep(step);
    }
  };

  return (
    <main className="min-h-full bg-[var(--color-ink-50)]">
      <div className="mx-auto max-w-[1200px] p-5 lg:p-6">
        <Stepper currentStep={currentStep} onStepClick={goToStep} />

        <div className="mt-4">
          {currentStep === 1 && <StepDataCattery profile={catteryProfile} />}
          {currentStep === 2 && (
            <StepPilihPejantan cats={maleCats} selectedId={selectedMaleId} onSelect={setSelectedMaleId} showError={showError}/>
          )}
          {currentStep === 3 && (
            <StepPilihInduk cats={femaleCats} selectedId={selectedFemaleId} onSelect={setSelectedFemaleId} showError={showError}/>
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
            <StepAddOffspring items={offspringItems} onChangeItems={setOffspringItems} defaultBreed={breedLabel} showError={showError}/>
          )}
          {currentStep === 6 && (
            <StepUploadDokumen
              maleCertFile={selectedMale?.certificateFile ?? null}
              femaleCertFile={selectedFemale?.certificateFile ?? null}
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
              onSubmit={async () => {
                // Sementara, sebelum API tersedia
                const code = `MR-2026-${Math.floor(1000 + Math.random() * 9000)}`;

                router.push(`/cattery/mating-reports/success?code=${code}`);

                return code;
              }}
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
  );
}