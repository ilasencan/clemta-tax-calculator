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
    <div className="flex items-center justify-between mb-8 px-4">
      {steps.map((step, i) => (
        <div key={step.number} className="flex items-center flex-1 last:flex-none">
          {/* Circle + Label */}
          <div className="flex flex-col items-center relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ring-4 ${
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
            <span
              className={`text-xs mt-2 whitespace-nowrap hidden sm:block ${
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

          {/* Connector line */}
          {i < steps.length - 1 && (
            <div className="flex-1 mx-3 relative">
              {/* Background track */}
              <div className="h-1 rounded-full bg-gray-200 w-full" />
              {/* Filled progress */}
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
  );
}
