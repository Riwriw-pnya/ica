"use client";

import { showIncompleteToast } from "@/lib/toast";

interface StepFooterProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
}

export default function StepFooter({ currentStep, totalSteps, onBack, onNext, nextDisabled = false }: StepFooterProps) {
  return (
    <div className="mt-6 flex items-center justify-between border-t border-[var(--color-ink-100)] pt-5">
      <button
        onClick={onBack}
        disabled={currentStep === 1}
        className="rounded-full border border-[var(--color-ink-100)] bg-gradient-to-b from-white to-[var(--color-ink-300)] px-6 py-2.5 text-[13px] font-medium text-[var(--color-ink-700)] shadow-black/5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Kembali
      </button>

      <div className="flex items-center gap-4">
        <span className="text-[12px] text-[var(--color-ink-400)]">
          Step {currentStep} dari {totalSteps}
        </span>

        <button
          onClick={onNext}
          className={`cursor-pointer rounded-full border-t px-7 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 ${
            nextDisabled
              ? "border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28]"
              : "border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
          }`}
        >
          Lanjut
        </button>
      </div>
    </div>
  );
}