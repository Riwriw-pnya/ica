import React from "react";

const STEPS = [
  { step: 1, label: "Dikirim" },
  { step: 2, label: "Review admin" },
  { step: 3, label: "Verifikasi dokumen" },
  { step: 4, label: "Disetujui" },
];

interface ApplicationStepperProps {
  currentStep: number;
}

export default function ApplicationStepper({ currentStep }: ApplicationStepperProps) {
  return (
    <>
      {/* ========================================================= */}
      {/*  TAMPILAN MOBILE                                          */}
      {/* ========================================================= */}
      <div className="block md:hidden pl-1">
        <div className="relative space-y-5">
          {/* Garis Penghubung Vertikal Background */}
          <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-[#EFE9E1]" />

          {/* Garis Progress Vertikal Aktif */}
          <div
            className="absolute left-[11px] top-3 w-[2px] bg-[var(--color-brand-orange-500)] transition-all duration-300"
            style={{
              height: `${((Math.min(currentStep, 4) - 1) / 3) * 100}%`,
            }}
          />

          {STEPS.map((s) => {
            const isCompleted = s.step < currentStep || (s.step === 4 && currentStep >= 4);
            const isCurrent = s.step === currentStep && currentStep < 4;

            return (
              <div key={s.step} className="relative z-10 flex items-center gap-3">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold shrink-0 transition ${
                    isCompleted
                      ? "border-2 border-[#EE6B28] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white shadow-xs"
                      : isCurrent
                      ? "border-2 border-[#EE6B28] bg-white ring-4 ring-[#EE6B28]/20"
                      : "border-2 border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {isCompleted ? "✓" : ""}
                </div>

                <span
                  className={`text-xs font-bold ${
                    isCompleted || isCurrent ? "text-[#1a1513]" : "text-[#8c8074]"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAMPILAN DESKTOP                                          */}
      {/* ========================================================= */}
      <div className="hidden md:flex relative mt- items-center justify-between px-6">
        {/* Connector Line */}
        <div className="absolute left-12 right-12 top-2.5 h-[2px] bg-[var(--color-ink-100)]" />
        
        {/* Progress Line */}
        <div
          className="absolute left-12 top-2.5 h-[2px] bg-[var(--color-brand-orange-500)] transition-all duration-300"
          style={{
            width: `${((Math.min(currentStep, 4) - 1) / 3) * 89.5}%`,
          }}
        />

        {STEPS.map((s) => {
          const isCompleted = s.step < currentStep || (s.step === 4 && currentStep >= 4);
          const isCurrent = s.step === currentStep && currentStep < 4;

          return (
            <div key={s.step} className="relative z-10 flex flex-col items-center">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition ${
                  isCompleted
                    ? "border-2 border-[#f48637] bg-gradient-to-b from-[var(--color-brand-orange-300)] to-[var(--color-brand-orange-500)] text-white shadow-[0_2px_6px_rgba(244,134,55,0.4)]"
                    : isCurrent
                    ? "border-2 border-[#f48637] bg-white text-[var(--color-brand-orange-500)] ring-4 ring-[var(--color-brand-orange-50)]"
                    : "border-2 border-gray-300 bg-white text-gray-400"
                }`}
              >
                {isCompleted ? "✓" : ""}
              </div>
              <span
                className={`mt-2 text-[11px] font-medium ${
                  isCompleted || isCurrent ? "text-[var(--color-ink-900)]" : "text-[var(--color-ink-400)]"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}