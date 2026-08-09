import { PaymentRecord } from '../types';

export interface PaymentProviderStatus {
  isConnected: boolean;
  providerName: string;
  statusMessage: string;
}

export interface PlatformPricingConfig {
  employerFeePercent: number; // e.g. 10%
  perHourPlatformFeeSek: number; // e.g. 15 SEK
  permanentHiringFeeSek: number; // e.g. 4500 SEK
  subscriptionPlans: {
    name: string;
    priceSekMonthly: number;
    features: string[];
  }[];
}

const PAYMENTS_STORAGE_KEY = 'arbetslyft_payments';
const PRICING_STORAGE_KEY = 'arbetslyft_pricing_config';

export const DEFAULT_PRICING_CONFIG: PlatformPricingConfig = {
  employerFeePercent: 10.0,
  perHourPlatformFeeSek: 15.0,
  permanentHiringFeeSek: 4500,
  subscriptionPlans: [
    {
      name: 'Basic (Flexibel)',
      priceSekMonthly: 0,
      features: ['Pay-per-assignment', '10% plattformsavgift', 'Digitala standardavtal', 'Work Passport verifiering'],
    },
    {
      name: 'Professional',
      priceSekMonthly: 2490,
      features: ['Obegränsad kandidatsökning', 'Reducerad plattformsavgift (6%)', 'Prioriterad AI-Matchning', 'Månadsvis samlingsfaktura'],
    },
    {
      name: 'Enterprise',
      priceSekMonthly: 7990,
      features: ['Dedikerad account manager', 'Skräddarsydda avtalsmallar', 'API-integration mot lön/ERP', 'Fri fastanställningskonvertering'],
    }
  ]
};

export const INITIAL_SAMPLE_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-101',
    assignmentId: 'ass-101',
    workerId: 'w-1',
    companyId: 'c-1',
    grossAmount: 9500,
    platformFee: 950,
    netAmount: 8550,
    currency: 'SEK',
    status: 'PAID',
    payrollStatus: 'COMPLETED',
    createdAt: '2026-08-09T17:00:00Z',
  }
];

export class PaymentService {
  /**
   * Payment Provider Abstraction Interface.
   * Swedish payment and payroll execution requires authorized Swedish payment institution / Bankgirot integration.
   */
  static getPaymentProviderStatus(): PaymentProviderStatus {
    return {
      isConnected: false,
      providerName: 'Swedish Bankgiro / Payroll API',
      statusMessage: 'Betalnings- & Löneleverantör — Ej ansluten (Prepared Interface)',
    };
  }

  static getPayments(): PaymentRecord[] {
    const saved = localStorage.getItem(PAYMENTS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_SAMPLE_PAYMENTS;
      }
    }
    localStorage.setItem(PAYMENTS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_PAYMENTS));
    return INITIAL_SAMPLE_PAYMENTS;
  }

  static getPricingConfig(): PlatformPricingConfig {
    const saved = localStorage.getItem(PRICING_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_PRICING_CONFIG;
      }
    }
    localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(DEFAULT_PRICING_CONFIG));
    return DEFAULT_PRICING_CONFIG;
  }

  static updatePricingConfig(config: PlatformPricingConfig): PlatformPricingConfig {
    localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(config));
    return config;
  }
}
