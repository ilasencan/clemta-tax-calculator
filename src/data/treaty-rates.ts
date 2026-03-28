import { TreatyRates } from '@/types/tax';

// US tax treaty withholding rates by country code (ISO 3166-1 alpha-2)
// Source: IRS Publication 901, individual treaty texts
// Dividend rates: general (portfolio) and qualified (10%+ ownership)
// All rates as decimals (e.g., 0.15 = 15%)
export const TREATY_RATES: Record<string, TreatyRates> = {
  AM: { dividendRate: 0.05, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.05 }, // Armenia
  AU: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.05 }, // Australia
  AT: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.00 }, // Austria
  AZ: { dividendRate: 0.10, dividendQualifiedRate: 0.10, interestRate: 0.10, royaltyRate: 0.10 }, // Azerbaijan
  BD: { dividendRate: 0.15, dividendQualifiedRate: 0.10, interestRate: 0.10, royaltyRate: 0.10 }, // Bangladesh
  BB: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.05, royaltyRate: 0.05 }, // Barbados
  BY: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.10 }, // Belarus
  BE: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.00 }, // Belgium
  BG: { dividendRate: 0.10, dividendQualifiedRate: 0.05, interestRate: 0.05, royaltyRate: 0.05 }, // Bulgaria
  CA: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.10 }, // Canada
  CN: { dividendRate: 0.10, dividendQualifiedRate: 0.10, interestRate: 0.10, royaltyRate: 0.10 }, // China
  CY: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.00 }, // Cyprus
  CZ: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.10 }, // Czech Republic
  DK: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.00 }, // Denmark
  EG: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.15, royaltyRate: 0.15 }, // Egypt
  EE: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.10 }, // Estonia
  FI: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.00 }, // Finland
  FR: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.00 }, // France
  GE: { dividendRate: 0.05, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.00 }, // Georgia
  DE: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.00 }, // Germany
  GR: { dividendRate: 0.30, dividendQualifiedRate: 0.30, interestRate: 0.00, royaltyRate: 0.00 }, // Greece
  IS: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.05 }, // Iceland
  IN: { dividendRate: 0.25, dividendQualifiedRate: 0.15, interestRate: 0.15, royaltyRate: 0.15 }, // India
  ID: { dividendRate: 0.15, dividendQualifiedRate: 0.10, interestRate: 0.10, royaltyRate: 0.10 }, // Indonesia
  IE: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.00 }, // Ireland
  IL: { dividendRate: 0.25, dividendQualifiedRate: 0.12, interestRate: 0.10, royaltyRate: 0.10 }, // Israel
  IT: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.08 }, // Italy
  JM: { dividendRate: 0.15, dividendQualifiedRate: 0.10, interestRate: 0.12, royaltyRate: 0.10 }, // Jamaica
  JP: { dividendRate: 0.10, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.00 }, // Japan
  KZ: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.10 }, // Kazakhstan
  KR: { dividendRate: 0.15, dividendQualifiedRate: 0.10, interestRate: 0.12, royaltyRate: 0.15 }, // South Korea
  KG: { dividendRate: 0.15, dividendQualifiedRate: 0.15, interestRate: 0.10, royaltyRate: 0.10 }, // Kyrgyzstan
  LV: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.10 }, // Latvia
  LT: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.10 }, // Lithuania
  LU: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.00 }, // Luxembourg
  MT: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.10 }, // Malta
  MX: { dividendRate: 0.10, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.10 }, // Mexico
  MD: { dividendRate: 0.10, dividendQualifiedRate: 0.10, interestRate: 0.10, royaltyRate: 0.10 }, // Moldova
  MA: { dividendRate: 0.15, dividendQualifiedRate: 0.10, interestRate: 0.15, royaltyRate: 0.10 }, // Morocco
  NL: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.00 }, // Netherlands
  NZ: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.10 }, // New Zealand
  NO: { dividendRate: 0.15, dividendQualifiedRate: 0.15, interestRate: 0.00, royaltyRate: 0.00 }, // Norway
  PK: { dividendRate: 0.15, dividendQualifiedRate: 0.15, interestRate: 0.00, royaltyRate: 0.00 }, // Pakistan
  PH: { dividendRate: 0.25, dividendQualifiedRate: 0.20, interestRate: 0.15, royaltyRate: 0.15 }, // Philippines
  PL: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.10 }, // Poland
  PT: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.10 }, // Portugal
  RO: { dividendRate: 0.10, dividendQualifiedRate: 0.10, interestRate: 0.10, royaltyRate: 0.10 }, // Romania
  RU: { dividendRate: 0.10, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.00 }, // Russia
  SK: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.10 }, // Slovakia
  SI: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.05, royaltyRate: 0.05 }, // Slovenia
  ZA: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.00 }, // South Africa
  ES: { dividendRate: 0.15, dividendQualifiedRate: 0.10, interestRate: 0.10, royaltyRate: 0.10 }, // Spain
  LK: { dividendRate: 0.15, dividendQualifiedRate: 0.15, interestRate: 0.10, royaltyRate: 0.10 }, // Sri Lanka
  SE: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.00 }, // Sweden
  CH: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.00 }, // Switzerland
  TJ: { dividendRate: 0.10, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.00 }, // Tajikistan (via USSR treaty)
  TH: { dividendRate: 0.15, dividendQualifiedRate: 0.10, interestRate: 0.10, royaltyRate: 0.05 }, // Thailand
  TT: { dividendRate: 0.30, dividendQualifiedRate: 0.30, interestRate: 0.00, royaltyRate: 0.15 }, // Trinidad and Tobago
  TN: { dividendRate: 0.20, dividendQualifiedRate: 0.14, interestRate: 0.15, royaltyRate: 0.15 }, // Tunisia
  TR: { dividendRate: 0.20, dividendQualifiedRate: 0.15, interestRate: 0.10, royaltyRate: 0.10 }, // Turkey
  TM: { dividendRate: 0.10, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.00 }, // Turkmenistan (via USSR treaty)
  UA: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.10 }, // Ukraine
  GB: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.00, royaltyRate: 0.00 }, // United Kingdom
  UZ: { dividendRate: 0.10, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.00 }, // Uzbekistan (via USSR treaty)
  VE: { dividendRate: 0.15, dividendQualifiedRate: 0.05, interestRate: 0.10, royaltyRate: 0.10 }, // Venezuela
  VN: { dividendRate: 0.15, dividendQualifiedRate: 0.15, interestRate: 0.10, royaltyRate: 0.10 }, // Vietnam
};
