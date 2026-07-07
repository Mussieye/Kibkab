export interface DonationConfig {
  stripe: {
    publishableKey: string;
    secretKey: string;
    webhookSecret: string;
  };
  donation: {
    currencies: string[];
    defaultAmounts: number[];
    minAmount: number;
    maxAmount: number;
  };
}

export interface DonationSession {
  sessionId: string;
  amount: number;
  currency: string;
  frequency: 'one-time' | 'monthly' | 'weekly';
  donorInfo: {
    email: string;
    name: string;
    phone?: string;
    address?: {
      line1: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
  };
  metadata: {
    church_name: string;
    donation_type: string;
    campaign?: string;
  };
}

export interface DonationRecord {
  id: string;
  sessionId: string;
  amount: number;
  currency: string;
  frequency: 'one-time' | 'monthly' | 'weekly';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  donorEmail: string;
  donorName: string;
  createdAt: Date;
  completedAt?: Date;
  metadata: Record<string, string>;
}

// Default donation configuration
export const defaultDonationConfig: DonationConfig = {
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },
  donation: {
    currencies: ['USD', 'EUR', 'GBP'],
    defaultAmounts: [10, 25, 50, 100, 250],
    minAmount: 1,
    maxAmount: 10000,
  },
};

// Helper functions
export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount / 100); // Stripe uses cents
}

export function validateDonationAmount(amount: number, config: DonationConfig): boolean {
  return amount >= config.donation.minAmount && amount <= config.donation.maxAmount;
}

export function getDonationFrequencyLabel(frequency: 'one-time' | 'monthly' | 'weekly', language: string = 'en'): string {
  const labels = {
    en: {
      'one-time': 'One-time',
      'monthly': 'Monthly',
      'weekly': 'Weekly',
    },
    es: {
      'one-time': 'Único',
      'monthly': 'Mensual',
      'weekly': 'Semanal',
    },
    fr: {
      'one-time': 'Unique',
      'monthly': 'Mensuel',
      'weekly': 'Hebdomadaire',
    },
    nl: {
      'one-time': 'Eenmalig',
      'monthly': 'Maandelijks',
      'weekly': 'Wekelijks',
    },
  };
  
  return labels[language as keyof typeof labels]?.[frequency] || labels.en[frequency];
}

export function getDonationTypeLabel(type: string, language: string = 'en'): string {
  const labels = {
    en: {
      'tithe': 'Tithe',
      'offering': 'Offering',
      'building_fund': 'Building Fund',
      'missions': 'Missions',
      'youth': 'Youth Ministry',
      'general': 'General Fund',
    },
    es: {
      'tithe': 'Diezmo',
      'offering': 'Ofrenda',
      'building_fund': 'Fondo de Edificio',
      'missions': 'Misiones',
      'youth': 'Ministerio Juvenil',
      'general': 'Fondo General',
    },
    fr: {
      'tithe': 'Dîme',
      'offering': 'Offrande',
      'building_fund': 'Fonds de Construction',
      'missions': 'Missions',
      'youth': 'Ministère des Jeunes',
      'general': 'Fonds Général',
    },
    nl: {
      'tithe': 'Tiende',
      'offering': 'Offering',
      'building_fund': 'Gebouwfonds',
      'missions': 'Missies',
      'youth': 'Jeugdministerie',
      'general': 'Algemeen Fonds',
    },
  };
  
  return labels[language as keyof typeof labels]?.[type as keyof typeof labels.en] || labels.en[type as keyof typeof labels.en];
}
