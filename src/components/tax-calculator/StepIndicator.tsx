interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: 'Country & Company' },
  { number: 2, label: 'Income & Expenses' },
  { number: 3, label: 'Your Info' },
  { number: 4, label: 'Tax Estimate' },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8 px-6">
      {/* Top row: circles and lines only */}
      <div className="flex items-center">
        {steps.map((step, i) => (
          <div key={step.number} className={`flex items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ring-4 shrink-0 ${
                step.number < currentStep
                  ? 'bg-[var(--clemta-green)] text-white ring-[var(--clemta-green-light)]'
                  : step.number === currentStep
                  ? 'bg-[var(--clemta-blue)] text-white ring-[var(--clemta-blue-light)]'
                  : 'bg-gray-100 text-gray-400 ring-gray-100'
              }`}
            >
              {step.number < currentStep ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 mx-2 relative h-1">
                <div className="h-1 rounded-full bg-gray-200 w-full" />
                <div
                  className={`absolute top-0 left-0 h-1 rounded-full transition-all duration-500 ${
                    step.number < currentStep
                      ? 'bg-[var(--clemta-green)] w-full'
                      : 'w-0'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom row: labels aligned under each circle */}
      <div className="flex mt-2">
        {steps.map((step, i) => (
          <div key={step.number} className={`flex items-start ${i < steps.length - 1 ? 'flex-1' : ''}`}>
            <span
              className={`text-xs whitespace-nowrap hidden sm:inline w-10 text-center shrink-0 ${
                step.number < currentStep
                  ? 'text-green-600 font-medium'
                  : step.number === currentStep
                  ? 'text-[var(--clemta-blue)] font-semibold'
                  : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
