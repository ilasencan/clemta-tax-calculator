import { TaxInput, TaxResult, CCorpResult, LLCResult, LLCBracketDetail } from '@/types/tax';
import { TAX_BRACKETS_2024, CCORP_RATE, DEFAULT_WITHHOLDING_RATE } from '@/data/tax-brackets';
import { TREATY_RATES } from '@/data/treaty-rates';

export function calculateCCorpTax(input: TaxInput): CCorpResult {
  const netIncome = Math.max(0, input.grossIncome - input.deductibleExpenses);

  // C-Corp is a US entity - ALWAYS subject to 21% corporate tax
  // regardless of PE status or foreign ownership
  const corporateTax = Math.round(netIncome * CCORP_RATE);
  const afterTaxProfit = netIncome - corporateTax;

  // Dividend withholding when distributing to foreign shareholders
  let dividendWithholdingRate = DEFAULT_WITHHOLDING_RATE;
  if (input.country?.hasTreaty && input.country.code in TREATY_RATES) {
    dividendWithholdingRate = TREATY_RATES[input.country.code].dividendRate;
  }

  const dividendWithholding = Math.round(afterTaxProfit * dividendWithholdingRate);
  const totalTax = corporateTax + dividendWithholding;
  const effectiveRate = netIncome > 0 ? totalTax / netIncome : 0;
  const takeHome = netIncome - totalTax;

  return {
    netIncome,
    corporateTax,
    corporateTaxRate: CCORP_RATE,
    afterTaxProfit,
    dividendWithholdingRate,
    dividendWithholding,
    totalTax,
    effectiveRate,
    takeHome,
    hasPhysicalEstablishment: input.hasPhysicalEstablishment,
  };
}

function calculateLLCBrackets(netIncome: number): { bracketDetails: LLCBracketDetail[]; totalTax: number } {
  const bracketDetails: LLCBracketDetail[] = [];
  let totalTax = 0;

  for (const bracket of TAX_BRACKETS_2024) {
    const upperLimit = bracket.max ?? Infinity;
    if (netIncome <= bracket.min) break;

    const taxableInBracket = Math.min(netIncome, upperLimit) - bracket.min;
    const taxForBracket = Math.round(taxableInBracket * bracket.rate);
    totalTax += taxForBracket;

    bracketDetails.push({ bracket, taxableInBracket, taxForBracket });
  }

  return { bracketDetails, totalTax };
}

export function calculateLLCTax(input: TaxInput): LLCResult {
  const netIncome = Math.max(0, input.grossIncome - input.deductibleExpenses);
  let bracketDetails: LLCBracketDetail[] = [];
  let totalTax = 0;

  if (input.hasPhysicalEstablishment) {
    // Engaged in US trade or business: income is ECI,
    // taxed at graduated individual rates (10%-37%)
    // With treaty: PE threshold applies (Article 7)
    // Without treaty: USTB under IRC 864(b) applies
    // Either way, if engaged in USTB → ECI → graduated rates
    const result = calculateLLCBrackets(netIncome);
    bracketDetails = result.bracketDetails;
    totalTax = result.totalTax;
  } else {
    // NOT engaged in US trade or business:
    // No ECI → no US federal income tax on business profits
    // This applies regardless of treaty status.
    // Only FDAP income (passive: dividends, interest, royalties)
    // would be subject to withholding, but business profits are not taxed.
    // Treaty countries additionally get Article 7 PE protection as a safety net.
    totalTax = 0;
  }

  const effectiveRate = netIncome > 0 ? totalTax / netIncome : 0;
  const takeHome = netIncome - totalTax;

  return {
    netIncome,
    bracketDetails,
    totalTax,
    effectiveRate,
    takeHome,
    hasPhysicalEstablishment: input.hasPhysicalEstablishment,
  };
}

export function calculateTax(input: TaxInput): TaxResult {
  if (input.companyType === 'ccorp') {
    return { type: 'ccorp', data: calculateCCorpTax(input) };
  }
  return { type: 'llc', data: calculateLLCTax(input) };
}
