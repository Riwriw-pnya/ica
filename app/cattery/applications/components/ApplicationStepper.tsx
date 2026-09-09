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
    <div className="relative mt-6 flex items-center justify-between px-6">
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
        // Jika currentStep >= 4 (Disetujui/Selesai), maka step 4 juga bernilai true untuk centang
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
                  : "border-2 border-[var(--color-ink-200)] bg-white text-[var(--color-ink-300)]"
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
  );
}