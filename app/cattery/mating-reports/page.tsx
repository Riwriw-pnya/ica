"use client";

import { useState } from "react";
import { catteryProfile, maleCats } from "@/data/cattery";
import Stepper from "./components/Stepper";
import StepFooter from "./components/StepFooter";
import StepDataCattery from "./components/StepDataCattery";
import StepPilihPejantan from "./components/StepPilihPejantan";
import StepPlaceholder from "./components/StepPlaceholder";

const stepTitles = ["Data Cattery", "Pilih Pejantan", "Pilih Induk", "Mating Information", "Add Offspring", "Upload Dokumen", "Review & Submit"];

export default function MatingReportsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMaleId, setSelectedMaleId] = useState<number | null>(2);
  const totalSteps = stepTitles.length;

  const goBack = () => setCurrentStep((s) => Math.max(1, s - 1));
  const goNext = () => setCurrentStep((s) => Math.min(totalSteps, s + 1));

  return (
    <main className="min-h-full bg-[var(--color-ink-50)]">
      <div className="mx-auto max-w-[1000px] p-5 lg:p-6">
        <Stepper currentStep={currentStep} />

        <div className="mt-4">
          {currentStep === 1 && <StepDataCattery profile={catteryProfile} />}
          {currentStep === 2 && (
            <StepPilihPejantan cats={maleCats} selectedId={selectedMaleId} onSelect={setSelectedMaleId} />
          )}
          {currentStep >= 3 && <StepPlaceholder title={stepTitles[currentStep - 1]} />}
        </div>

        <StepFooter currentStep={currentStep} totalSteps={totalSteps} onBack={goBack} onNext={goNext} />
      </div>
    </main>
  );
}