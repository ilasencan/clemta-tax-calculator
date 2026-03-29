'use client';

import { TaxResult, Country } from '@/types/tax';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import ResultCard from '@/components/ui/ResultCard';
import TaxBreakdownChart from '@/components/ui/TaxBreakdownChart';
import TaxBracketTable from '@/components/ui/TaxBracketTable';
import Disclaimer from '@/components/ui/Disclaimer';

interface ResultsStepProps {
  result: TaxResult;
  country: Country;
  grossIncome: number;
  deductibleExpenses: number;
  onStartOver: () => void;
}

export default function ResultsStep({ result, country, grossIncome, deductibleExpenses, onStartOver }: ResultsStepProps) {
  const { data } = result;

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 flex flex-wrap gap-2">
        <span className="font-medium text-gray-700">{country.name}</span>
        <span>·</span>
        <span className="font-medium text-gray-700">{result.type === 'llc' ? 'LLC' : 'C-Corp'}</span>
        <span>·</span>
        <span>{data.hasPhysicalEstablishment ? 'With US PE' : 'No US PE'}</span>
        <span>·</span>
        <span>Income: {formatCurrency(grossIncome)}</span>
        {deductibleExpenses > 0 && (
          <>
            <span>·</span>
            <span>Expenses: {formatCurrency(deductibleExpenses)}</span>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ResultCard
          title="Total Estimated Tax"
          value={formatCurrency(data.totalTax)}
          variant="highlight"
        />
        <ResultCard
          title="Effective Tax Rate"
          value={formatPercent(data.effectiveRate)}
        />
        <ResultCard
          title="Estimated Take-Home"
          value={formatCurrency(data.takeHome)}
          variant="success"
        />
      </div>

      {/* ── C-Corp Results ── */}
      {result.type === 'ccorp' && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">C-Corp Tax Breakdown</h3>
          <div className="p-3 rounded-lg bg-blue-50 text-sm text-blue-800">
            A US-incorporated C-Corp is always subject to 21% corporate tax on net income,
            regardless of the owner&apos;s residence or permanent establishment status.
            Dividend withholding ({formatPercent(result.data.dividendWithholdingRate)}) applies
            when distributing profits to foreign shareholders
            {country.hasTreaty ? ' (treaty rate)' : ' (default rate, no treaty)'}.
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              title="Corporate Tax (21%)"
              value={formatCurrency(result.data.corporateTax)}
              subtitle={`On net income of ${formatCurrency(result.data.netIncome)}`}
            />
            <ResultCard
              title={`Dividend Withholding (${formatPercent(result.data.dividendWithholdingRate)})`}
              value={formatCurrency(result.data.dividendWithholding)}
              subtitle={`On after-tax profit of ${formatCurrency(result.data.afterTaxProfit)}`}
            />
          </div>
          <TaxBreakdownChart
            segments={[
              { label: 'Corporate Tax (21%)', value: result.data.corporateTax, color: '#2563eb' },
              { label: 'Dividend Withholding', value: result.data.dividendWithholding, color: '#7c3aed' },
              { label: 'Take-Home', value: result.data.takeHome, color: '#22c55e' },
            ]}
            total={result.data.netIncome}
          />
        </div>
      )}

      {/* ── LLC Results ── */}
      {result.type === 'llc' && (
        <div className="space-y-4">
          {data.hasPhysicalEstablishment ? (
            <>
              <h3 className="font-semibold text-gray-900">LLC Tax Breakdown - Effectively Connected Income (ECI)</h3>
              <div className="p-3 rounded-lg bg-blue-50 text-sm text-blue-800">
                You are engaged in a US trade or business. Your LLC income is treated as
                Effectively Connected Income (ECI) and taxed at graduated federal individual rates (10%–37%).
                Business deductions are allowed against gross income.
              </div>
              <TaxBracketTable brackets={result.data.bracketDetails} />
              <TaxBreakdownChart
                segments={[
                  { label: 'Federal Income Tax (ECI)', value: result.data.totalTax, color: '#2563eb' },
                  { label: 'Take-Home', value: result.data.takeHome, color: '#22c55e' },
                ]}
                total={result.data.netIncome}
              />
            </>
          ) : (
            <>
              <h3 className="font-semibold text-gray-900">LLC Tax - No US Trade or Business</h3>
              <div className="p-3 rounded-lg bg-[var(--clemta-green-light)] text-sm text-green-800">
                <strong>No US federal income tax on business profits.</strong> You are not engaged in a
                US trade or business, so your LLC&apos;s business income is not treated as Effectively
                Connected Income (ECI) and is not subject to US federal income tax.
                {country.hasTreaty && (
                  <> Additionally, the US–{country.name} tax treaty (Article 7) provides an extra
                  layer of protection for business profits when there is no permanent establishment.</>
                )}
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-800">
                <strong>Note:</strong> This applies to active business profits only.
                US-sourced passive income (FDAP - dividends, interest, royalties, rental income)
                may still be subject to {country.hasTreaty ? 'treaty-reduced' : '30% default'} withholding tax.
                You are still required to file Form 5472 with a pro forma Form 1120 annually for reporting purposes.
              </div>
            </>
          )}
        </div>
      )}

      <Disclaimer />

      <button
        onClick={onStartOver}
        className="w-full py-3 px-4 border-2 border-[var(--clemta-blue)] text-[var(--clemta-blue)] font-semibold rounded-lg hover:bg-[var(--clemta-blue-light)] transition-colors"
      >
        Start Over
      </button>
    </div>
  );
}
