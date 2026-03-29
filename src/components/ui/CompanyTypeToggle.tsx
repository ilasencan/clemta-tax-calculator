'use client';

import { CompanyType } from '@/types/tax';

interface CompanyTypeToggleProps {
  value: CompanyType;
  onChange: (type: CompanyType) => void;
}

const options: { type: CompanyType; title: string }[] = [
  {
    type: 'llc',
    title: 'LLC',
  },
  {
    type: 'ccorp',
    title: 'C-Corp',
  },
];

export default function CompanyTypeToggle({ value, onChange }: CompanyTypeToggleProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Company Type
      </label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => (
          <button
            key={opt.type}
            type="button"
            onClick={() => onChange(opt.type)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              value === opt.type
                ? 'border-[var(--clemta-blue)] bg-[var(--clemta-blue-light)]'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className={`font-semibold text-lg text-center ${value === opt.type ? 'text-[var(--clemta-blue)]' : 'text-gray-900'}`}>
              {opt.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
