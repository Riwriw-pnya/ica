"use client";

import { useToast } from "@/context/ToastContext";

interface StepFooterProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
}

export default function StepFooter({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  nextDisabled = false,
}: StepFooterProps) {
  const { showToast } = useToast();

  return (
    <div className="mt-6 flex items-center justify-between border-t border-[var(--color-ink-100)] pt-5">
      <button
        type="button"
        onClick={onBack}
        disabled={currentStep === 1}
        className="cursor-pointer rounded-full border border-[var(--color-ink-100)] bg-gradient-to-b from-white to-[var(--color-ink-100)] px-6 py-2.5 text-[13px] font-medium text-[var(--color-ink-700)] shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
      >
        Kembali
      </button>

      <div className="flex items-center gap-4">
        <span className="text-[12px] text-[var(--color-ink-400)]">
          Step {currentStep} dari {totalSteps}
        </span>

        <button
          type="button"
          onClick={() => {
            if (nextDisabled) {
              showToast("Lengkapi Data", "Silakan lengkapi bidang yang diperlukan sebelum melanjutkan.", {
                tone: "error",
              });
            } else {
              onNext();
            }
          }}
          className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-7 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
        >
          Lanjut
        </button>
      </div>
    </div>
  );
}