export type CompanyType = 'llc' | 'ccorp';

export interface Country {
  code: string;
  name: string;
  hasTreaty: boolean;
}

export interface TreatyRates {
  dividendRate: number;
  dividendQualifiedRate: number;
  interestRate: number;
  royaltyRate: number;
}

export interface TaxInput {
  country: Country | null;
  companyType: CompanyType;
  grossIncome: number;
  deductibleExpenses: number;
  hasPhysicalEstablishment: boolean;
}

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

export interface LLCBracketDetail {
  bracket: TaxBracket;
  taxableInBracket: number;
  taxForBracket: number;
}

export interface CCorpResult {
  netIncome: number;
  corporateTax: number;
  corporateTaxRate: number;
  afterTaxProfit: number;
  dividendWithholdingRate: number;
  dividendWithholding: number;
  totalTax: number;
  effectiveRate: number;
  takeHome: number;
  hasPhysicalEstablishment: boolean;
}

export interface LLCResult {
  netIncome: number;
  bracketDetails: LLCBracketDetail[];
  totalTax: number;
  effectiveRate: number;
  takeHome: number;
  hasPhysicalEstablishment: boolean;
}

export type TaxResult =
  | { type: 'ccorp'; data: CCorpResult }
  | { type: 'llc'; data: LLCResult };
