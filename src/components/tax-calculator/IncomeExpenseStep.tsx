'use client';

import { Country, CompanyType } from '@/types/tax';
import CurrencyInput from '@/components/ui/CurrencyInput';
import { formatCurrency } from '@/lib/formatters';

interface IncomeExpenseStepProps {
  country: Country;
  companyType: CompanyType;
  grossIncome: number;
  deductibleExpenses: number;
  onGrossIncomeChange: (value: number) => void;
  onDeductibleExpensesChange: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function IncomeExpenseStep({
  country,
  companyType,
  grossIncome,
  deductibleExpenses,
  onGrossIncomeChange,
  onDeductibleExpensesChange,
  onNext,
  onBack,
}: IncomeExpenseStepProps) {
  const netIncome = Math.max(0, grossIncome - deductibleExpenses);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
        <span className="font-medium text-gray-700">{country.name}</span>
        <span>·</span>
        <span className="font-medium text-gray-700">{companyType === 'llc' ? 'LLC' : 'C-Corp'}</span>
        <button onClick={onBack} className="ml-auto text-[var(--clemta-blue)] hover:underline text-sm">
          Change
        </button>
      </div>

      <CurrencyInput
        label="Estimated Annual Gross Income (USD)"
        value={grossIncome}
        onChange={onGrossIncomeChange}
      />

      <CurrencyInput
        label="Estimated Deductible Expenses (USD)"
        value={deductibleExpenses}
        onChange={onDeductibleExpensesChange}
      />

      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-sm text-gray-500">Net Taxable Income</div>
        <div className="text-xl font-bold text-gray-900">{formatCurrency(netIncome)}</div>
        {deductibleExpenses > grossIncome && (
          <div className="text-xs text-amber-600 mt-1">
            Expenses exceed income. Net income set to $0.
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={grossIncome <= 0}
          className="flex-1 py-3 px-4 bg-[var(--clemta-blue)] text-white font-semibold rounded-lg hover:bg-[var(--clemta-blue-dark)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Calculate Tax
        </button>
      </div>
    </div>
  );
}
