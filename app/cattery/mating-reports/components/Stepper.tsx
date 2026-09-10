const steps = [
  "Data Cattery", "Pilih Pejantan", "Pilih Induk", "Mating Information",
  "Add Offspring", "Upload Dokumen", "Review & Submit",
];

interface StepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function Stepper({ currentStep, onStepClick }: StepperProps) {
  const totalSteps = steps.length;
  const halfStep = 50 / totalSteps;
  const trackWidth = 100 - halfStep * 2;
  const progressWidth =
    totalSteps > 1 ? trackWidth * ((currentStep - 1) / (totalSteps - 1)) : 0;

  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5 shadow-[0_4px_px_-8px_rgba(238,107,40,0.35)]">
      <div className="relative">
        <div
          className="absolute top-4 h-[2px] -translate-y-1/2 bg-gray-200"
          style={{ left: `${halfStep}%`, width: `${trackWidth}%` }}
        />
        <div
          className="absolute top-4 h-[2px] -translate-y-1/2 bg-[var(--color-brand-orange-500)] transition-all duration-300"
          style={{ left: `${halfStep}%`, width: `${progressWidth}%` }}
        />

        <div className="relative flex">
          {steps.map((label, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isActive = stepNum === currentStep;
            const isClickable = stepNum < currentStep; // cuma boleh mundur, bukan maju

            return (
              <div key={label} className="flex flex-1 flex-col items-center">
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick(stepNum)}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-[12px] font-semibold transition-all duration-300 ${
                    isCompleted
                      ? "cursor-pointer border-[var(--color-brand-orange-500)] bg-gradient-to-b from-[var(--color-brand-orange-100)] to-[var(--color-brand-orange-500)] text-white shadow-[0_0_0_4px_rgba(255,159,92,0.3)] hover:brightness-95"
                      : isActive
                        ? "border-[var(--color-brand-orange-500)] bg-white text-[var(--color-brand-orange-700)] shadow-[0_0_0_4px_rgba(255,159,92,0.15)]"
                        : "border-gray-200 bg-white text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    "✓"
                  ) : (
                    stepNum
                  )}
                </button>

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
  );
}