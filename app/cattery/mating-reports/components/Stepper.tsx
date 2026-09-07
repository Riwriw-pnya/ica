const steps = [
  "Data Cattery", "Pilih Pejantan", "Pilih Induk", "Mating Information",
  "Add Offspring", "Upload Dokumen", "Review & Submit",
];

export default function Stepper({ currentStep }: { currentStep: number }) {
  const totalSteps = steps.length;
  const halfStep = 50 / totalSteps; // persen — jarak dari tepi ke pusat lingkaran pertama/terakhir
  const trackWidth = 100 - halfStep * 2;
  const progressWidth =
    totalSteps > 1 ? trackWidth * ((currentStep - 1) / (totalSteps - 1)) : 0;

  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
      <div className="relative">
        {/* Garis track abu-abu (background) */}
        <div
          className="absolute top-4 h-[2px] -translate-y-1/2 bg-gray-200"
          style={{ left: `${halfStep}%`, width: `${trackWidth}%` }}
        />
        {/* Garis progress oranye (di atas track) */}
        <div
          className="absolute top-4 h-[2px] -translate-y-1/2 bg-[var(--color-brand-orange-500)] transition-all duration-300"
          style={{ left: `${halfStep}%`, width: `${progressWidth}%` }}
        />

        {/* Lingkaran + label — masing-masing dijamin center sempurna */}
        <div className="relative flex">
          {steps.map((label, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isActive = stepNum === currentStep;

            return (
              <div key={label} className="flex flex-1 flex-col items-center">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white text-[12px] font-semibold ${
                    isCompleted
                      ? "border-[var(--color-brand-orange-500)] bg-[var(--color-brand-orange-500)] text-white"
                      : isActive
                        ? "border-[var(--color-brand-orange-500)] text-[var(--color-brand-orange-700)]"
                        : "border-gray-200 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNum
                  )}
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
  );
}