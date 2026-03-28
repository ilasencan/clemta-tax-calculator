'use client';

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export default function CurrencyInput({ label, value, onChange }: CurrencyInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
        <input
          type="text"
          inputMode="numeric"
          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--clemta-blue)] focus:border-transparent text-gray-900 bg-white"
          value={value === 0 ? '' : value.toLocaleString('en-US')}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, '');
            const num = raw === '' ? 0 : Math.min(parseInt(raw, 10), 999999999);
            onChange(num);
          }}
          placeholder="0"
        />
      </div>
    </div>
  );
}
