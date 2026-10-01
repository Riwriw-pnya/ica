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

  const handleNextClick = () => {
    if (nextDisabled) {
      showToast("Lengkapi Data", "Silakan lengkapi bidang yang diperlukan sebelum melanjutkan.", {
        tone: "error",
      });
    } else {
      onNext();
    }
  };

  return (
    <>
      {/* ========================================================= */}
      {/* 1. TAMPILAN MOBILE FOOTER (Sticky / Fixed Bottom Persis Foto) */}
      {/* ========================================================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#eedfd5] px-4 py-3 z-50 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <button
          type="button"
          onClick={onBack}
          disabled={currentStep === 1}
          className="flex-1 py-3 px-4 rounded-full border border-[#eedfd5] bg-white text-xs font-bold text-[#8c8074] hover:bg-[#faf7f2] active:scale-[0.98] transition disabled:opacity-40 disabled:pointer-events-none"
        >
          Kembali
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          className="flex-1 py-3 px-4 rounded-full bg-gradient-to-b from-[#ffc299] to-[#f05a1b] text-white text-xs font-bold shadow-xs hover:from-[#f05a1b] hover:to-[#c8601d] active:scale-[0.98] transition"
        >
          Lanjut
        </button>
      </div>

      {/* ========================================================= */}
      {/* 2. TAMPILAN DESKTOP FOOTER (Tidak Tersentuh Sama Sekali)  */}
      {/* ========================================================= */}
      <div className="hidden md:flex mt-6 items-center justify-between border-t border-[var(--color-ink-100)] pt-5">
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
            onClick={handleNextClick}
            className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-7 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
          >
            Lanjut
          </button>
        </div>
      </div>
    </>
  );
}