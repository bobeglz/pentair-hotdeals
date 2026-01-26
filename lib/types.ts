export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: 'bounty' | 'standard' | 'upgrade';
  description: string;
}

export interface SKU {
  sku: string;
  model: string;
}

export interface Rebate {
  id: string;
  category: string;
  name: string;
  description: string;
  rebateAmount: number;
  currency: string;
  startDate: string;
  endDate: string;
  submissionDeadlineDays: number;
  paymentMethod: string;
  type: 'bounty' | 'standard' | 'upgrade';
  competitorBrands?: string[];
  countries: string[];
  skus: SKU[];
  termsUrl: string;
}

export interface RebatesData {
  lastUpdated: string;
  countries: Country[];
  categories: Category[];
  rebates: Rebate[];
}
