'use client';

import { Country, CompanyType } from '@/types/tax';
import { COUNTRIES } from '@/data/countries';
import { TREATY_RATES } from '@/data/treaty-rates';
import SearchableSelect from '@/components/ui/SearchableSelect';
import CompanyTypeToggle from '@/components/ui/CompanyTypeToggle';
import { formatPercent } from '@/lib/formatters';

interface CountryCompanyStepProps {
  country: Country | null;
  companyType: CompanyType;
  hasPhysicalEstablishment: boolean;
  onCountryChange: (country: Country) => void;
  onCompanyTypeChange: (type: CompanyType) => void;
  onPhysicalEstablishmentChange: (value: boolean) => void;
  onNext: () => void;
}

export default function CountryCompanyStep({
  country,
  companyType,
  hasPhysicalEstablishment,
  onCountryChange,
  onCompanyTypeChange,
  onPhysicalEstablishmentChange,
  onNext,
}: CountryCompanyStepProps) {
  return (
    <div className="space-y-6">
      <SearchableSelect
        countries={COUNTRIES}
        value={country}
        onChange={onCountryChange}
      />

      {country && (
        <div
          className={`p-3 rounded-lg text-sm ${
            country.hasTreaty
              ? 'bg-[var(--clemta-green-light)] text-green-800'
              : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}
        >
          {country.hasTreaty ? (
            <>
              <strong>{country.name}</strong> has a tax treaty with the US.
              {' '}Dividend withholding: {formatPercent(TREATY_RATES[country.code].dividendRate)} (general),
              {' '}{formatPercent(TREATY_RATES[country.code].dividendQualifiedRate)} (qualified).
            </>
          ) : (
            <>
              <strong>{country.name}</strong> does not have a tax treaty with the US.
              Default 30% withholding rate will apply on all income types.
            </>
          )}
        </div>
      )}

      <CompanyTypeToggle value={companyType} onChange={onCompanyTypeChange} />

      <div>
        <label className="flex items-start gap-3 cursor-pointer p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <input
            type="checkbox"
            checked={hasPhysicalEstablishment}
            onChange={(e) => onPhysicalEstablishmentChange(e.target.checked)}
            className="mt-0.5 w-5 h-5 rounded border-gray-300 text-[var(--clemta-blue)] focus:ring-[var(--clemta-blue)] accent-[var(--clemta-blue)]"
          />
          <div>
            <span className="font-medium text-gray-900">
              Engaged in a US trade or business
            </span>
            <p className="text-sm text-gray-500 mt-0.5">
              Do you have an office, employees, warehouse, or other fixed place of business in the US,
              or do you regularly conduct business activities within the United States?
              This determines whether your income is treated as Effectively Connected Income (ECI).
            </p>
          </div>
        </label>
      </div>

      <button
        onClick={onNext}
        disabled={!country}
        className="w-full py-3 px-4 bg-[var(--clemta-blue)] text-white font-semibold rounded-lg hover:bg-[var(--clemta-blue-dark)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
}
