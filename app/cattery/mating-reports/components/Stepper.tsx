import React from "react";

const mobileSteps = [
  "Select Male Cat",
  "Select Female Cat",
  "Mating Information",
  "Add Offspring",
  "Upload Dokumen",
  "Review & Submit",
];

interface StepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function Stepper({ currentStep }: StepperProps) {
  // Mobile step: Step 2 di sistem dipetakan sebagai Step 1 di UI Mobile ("Select Male Cat")
  const mobileActiveStep = Math.max(1, Math.min(currentStep - 1, mobileSteps.length));
  const totalMobileSteps = mobileSteps.length;

  return (
    <>
      {/* ========================================================= */}
      {/* 1. TAMPILAN MOBILE (Stepper Sticky di Atas Layar)        */}
      {/* ========================================================= */}
      <div className="md:hidden sticky top-0 z-20 bg-[#F8F6F2] pt-2 pb-3 -mx-4 px-4 border-b border-[#EEDFD5]/60 shadow-2xs">
        <div className="rounded-2xl border border-[#EEDFD5] bg-white p-4 shadow-2xs">
          {/* Header Title Step Mobile */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#F4EFE9]">
            <h3 className="font-bold text-xs text-[#1A1513]">
              {mobileSteps[mobileActiveStep - 1]}
            </h3>
            <span className="text-[10px] text-[#8C8074] font-medium">
              Step {mobileActiveStep} dari {totalMobileSteps}
            </span>
          </div>

          {/* Progress Bar Top */}
          <div className="w-full bg-[#F4EFE9] h-1.5 rounded-full overflow-hidden mt-2.5 mb-3.5">
            <div
              className="bg-[#F05A1B] h-full transition-all duration-300 rounded-full"
              style={{ width: `${(mobileActiveStep / totalMobileSteps) * 100}%` }}
            />
          </div>

          {/* List Step Vertikal */}
          <div className="relative pl-1 space-y-3">
            {/* Garis Penghubung Vertikal Background */}
            <div className="absolute left-[11px] top-2 bottom-2 w-[1.5px] bg-[#EFE9E1]" />

            {/* Garis Progress Vertikal Aktif */}
            <div
              className="absolute left-[11px] top-2 w-[1.5px] bg-[#F05A1B] transition-all duration-300"
              style={{
                height: `${((Math.min(mobileActiveStep, totalMobileSteps) - 1) / (totalMobileSteps - 1)) * 100}%`,
              }}
            />

            {mobileSteps.map((label, idx) => {
              const stepNum = idx + 1;
              const isCompleted = stepNum < mobileActiveStep;
              const isCurrent = stepNum === mobileActiveStep;

              return (
                <div key={label} className="relative z-10 flex items-center gap-3">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shrink-0 transition ${
                      isCompleted
                        ? "border-2 border-[#F48637] bg-gradient-to-b from-[#FF9A51] to-[#F05A1B] text-white"
                        : isCurrent
                        ? "border-2 border-[#F48637] bg-white text-[#F05A1B] ring-3 ring-[#FFF4EB]"
                        : "border border-[#EEDFD5] bg-white text-[#8C8074]"
                    }`}
                  >
                    {isCompleted ? "✓" : stepNum}
                  </div>

                  <span
                    className={`text-xs ${
                      isCurrent
                        ? "font-bold text-[#1A1513]"
                        : isCompleted
                        ? "font-medium text-[#1A1513]"
                        : "font-normal text-[#8C8074]"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. TAMPILAN DESKTOP (Stepper Horizontal Utuh)            */}
      {/* ========================================================= */}
      <div className="hidden md:block rounded-xl border border-[var(--color-ink-100)] bg-white p-5 shadow-lg shadow-[#F05A1B]/10 -mt-4">
        <div className="relative">
          <div
            className="absolute top-4 h-[2px] -translate-y-1/2 bg-gray-200"
            style={{ left: `7.14%`, width: `85.71%` }}
          />
          <div
            className="absolute top-4 h-[2px] -translate-y-1/2 bg-[var(--color-brand-orange-500)] transition-all duration-300"
            style={{
              left: `7.14%`,
              width: `${(85.71 * (currentStep - 1)) / 6}%`,
            }}
          />

          <div className="relative flex">
            {[
              "Data Cattery",
              "Pilih Pejantan",
              "Pilih Induk",
              "Mating Information",
              "Add Offspring",
              "Upload Dokumen",
              "Review & Submit",
            ].map((label, idx) => {
              const stepNum = idx + 1;
              const isCompleted = stepNum < currentStep;
              const isActive = stepNum === currentStep;

              return (
                <div key={label} className="flex flex-1 flex-col items-center">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-[12px] font-semibold transition-all duration-300 ${
                      isCompleted
                        ? "border-[var(--color-brand-orange-500)] bg-gradient-to-b from-[var(--color-brand-orange-100)] to-[var(--color-brand-orange-500)] text-white shadow-[0_0_0_4px_rgba(255,159,92,0.3)]"
                        : isActive
                        ? "border-[var(--color-brand-orange-500)] bg-white text-[var(--color-brand-orange-700)] shadow-[0_0_0_4px_rgba(255,159,92,0.15)]"
                        : "border-gray-200 bg-white text-gray-400"
                    }`}
                  >
                    {isCompleted ? "✓" : stepNum}
                  </div>

                  <span
                    className={`mt-2 max-w-[90px] text-center text-[11px] leading-tight ${
                      isActive
                        ? "font-semibold text-gray-900"
                        : isCompleted
                        ? "font-medium text-[var(--color-brand-orange-700)]"
                        : "font-normal text-gray-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}