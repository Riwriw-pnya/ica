"use client";

import { toast } from "sonner";
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
    if (step === 4) return matingDate !== "" && estimatedBirthDate !== "";
    if (step === 5) return offspringItems.some((k) => k.name && k.gender && k.birthDate);
    if (step === 6) return matingPhoto !== null;
    return true;
  };

  const canGoNext = isStepValid(currentStep);

  const goBack = () => setCurrentStep((s) => Math.max(1, s - 1));

  const goNext = () => {
    if (!canGoNext) return;
    setCurrentStep((s) => Math.min(totalSteps, s + 1));
  };

  const goToStep = (step: number) => {
    if (step < currentStep) setCurrentStep(step); // cuma izinkan mundur (dobel-jaga, Stepper juga sudah cegah)
  };

  const handleNextStep = () => {
  if (currentStep === 2) {
    if(!selectedMale){
      toast.error("Kucing belum dipilih")
    }
  }

    if (currentStep === 3) {
    if(!selectedFemale){
      toast.error("Kucing belum dipilih")
    }
  }

  if (currentStep === 4) {
    if (!matingDate) {
      toast.error("Tanggal mating belum diisi");
      return;
    }

    if (!estimatedBirthDate) {
      toast.error("Estimasi tanggal lahir belum diisi");
      return;
    }

    if (!witnessName.trim()) {
      toast.error("Nama saksi belum diisi");
      return;
    }
  }

  setCurrentStep((prev) => prev + 1);
};

  return (
    <main className="min-h-full bg-[var(--color-ink-50)]">
      <div className="mx-auto max-w-[1200px] p-5 lg:p-6">
        <Stepper currentStep={currentStep} onStepClick={goToStep} />

        <div className="mt-4">
          {currentStep === 1 && <StepDataCattery profile={catteryProfile} />}
          {currentStep === 2 && (
            <StepPilihPejantan cats={maleCats} selectedId={selectedMaleId} onSelect={setSelectedMaleId} />
          )}
          {currentStep === 3 && (
            <StepPilihInduk cats={femaleCats} selectedId={selectedFemaleId} onSelect={setSelectedFemaleId} />
          )}
          {currentStep === 4 && (
            <StepMatingInformation
              maleRegCode={selectedMale?.regCode ?? "-"}
              femaleRegCode={selectedFemale?.regCode ?? "-"}
              matingDate={matingDate}
              onMatingDateChange={setMatingDate}
              estimatedBirthDate={estimatedBirthDate}
              onEstimatedBirthDateChange={setEstimatedBirthDate}
              witnessName={witnessName}
              onWitnessNameChange={setWitnessName}
            />
          )}
          {currentStep === 5 && (
            <StepAddOffspring items={offspringItems} onChangeItems={setOffspringItems} defaultBreed={breedLabel} />
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
            onNext={handleNextStep}
            nextDisabled={!canGoNext}
          />
        )}
      </div>
    </main>
  );
}