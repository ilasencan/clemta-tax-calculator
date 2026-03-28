'use client';

import { useState } from 'react';
import { Country, CompanyType, TaxResult } from '@/types/tax';
import { calculateTax } from '@/lib/tax-calculator';
import StepIndicator from './StepIndicator';
import CountryCompanyStep from './CountryCompanyStep';
import IncomeExpenseStep from './IncomeExpenseStep';
import LeadCaptureStep from './LeadCaptureStep';
import ResultsStep from './ResultsStep';

export default function TaxCalculator() {
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState<Country | null>(null);
  const [companyType, setCompanyType] = useState<CompanyType>('llc');
  const [hasPhysicalEstablishment, setHasPhysicalEstablishment] = useState(false);
  const [grossIncome, setGrossIncome] = useState(0);
  const [deductibleExpenses, setDeductibleExpenses] = useState(0);
  const [result, setResult] = useState<TaxResult | null>(null);

  function handleIncomeNext() {
    const taxResult = calculateTax({
      country,
      companyType,
      grossIncome,
      deductibleExpenses,
      hasPhysicalEstablishment,
    });
    setResult(taxResult);
    setStep(3);
  }

  function handleLeadSubmit(name: string, email: string) {
    // TODO: Send lead data to your backend/CRM
    console.log('Lead captured:', { name, email, country: country?.name, companyType });
    setStep(4);
  }

  function handleStartOver() {
    setStep(1);
    setCountry(null);
    setCompanyType('llc');
    setHasPhysicalEstablishment(false);
    setGrossIncome(0);
    setDeductibleExpenses(0);
    setResult(null);
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <StepIndicator currentStep={step} />

        {step === 1 && (
          <CountryCompanyStep
            country={country}
            companyType={companyType}
            hasPhysicalEstablishment={hasPhysicalEstablishment}
            onCountryChange={setCountry}
            onCompanyTypeChange={setCompanyType}
            onPhysicalEstablishmentChange={setHasPhysicalEstablishment}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && country && (
          <IncomeExpenseStep
            country={country}
            companyType={companyType}
            grossIncome={grossIncome}
            deductibleExpenses={deductibleExpenses}
            onGrossIncomeChange={setGrossIncome}
            onDeductibleExpensesChange={setDeductibleExpenses}
            onNext={handleIncomeNext}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <LeadCaptureStep
            onSubmit={handleLeadSubmit}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && result && country && (
          <ResultsStep
            result={result}
            country={country}
            grossIncome={grossIncome}
            deductibleExpenses={deductibleExpenses}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </div>
  );
}
