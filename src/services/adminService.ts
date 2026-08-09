import { Dispute } from '../types';

export interface SystemIntegrationStatus {
  serviceName: string;
  category: 'DATABASE' | 'IDENTITY' | 'PAYMENT' | 'PAYROLL' | 'GOVERNMENT';
  status: 'CONNECTED' | 'NOT_CONNECTED' | 'CONFIGURED';
  statusLabel: string;
  details: string;
}

export interface AdminKPIs {
  totalUsers: number;
  activeWorkers: number;
  activeEmployers: number;
  activeJobs: number;
  activeAssignments: number;
  grossVolumeSek: number;
  platformRevenueSek: number;
  disputesCount: number;
}

const DISPUTES_STORAGE_KEY = 'arbetslyft_disputes';

export const INITIAL_DISPUTES: Dispute[] = [
  {
    id: 'disp-1',
    assignmentId: 'ass-101',
    raisedBy: 'w-1',
    raisedAgainst: 'c-1',
    reason: 'Rapporterad övertid',
    description: 'Arbetstagaren rapporterade 45 min extra på grund av fördröjd godstransport. Arbetsgivaren ville justera.',
    status: 'OPEN',
    createdAt: '2026-08-09T18:30:00Z',
  }
];

export class AdminService {
  static getKPIs(): AdminKPIs {
    return {
      totalUsers: 1480,
      activeWorkers: 1120,
      activeEmployers: 360,
      activeJobs: 34,
      activeAssignments: 28,
      grossVolumeSek: 420000,
      platformRevenueSek: 42000,
      disputesCount: 1,
    };
  }

  static getSystemIntegrations(): SystemIntegrationStatus[] {
    return [
      {
        serviceName: 'PostgreSQL / Supabase Schema',
        category: 'DATABASE',
        status: 'CONFIGURED',
        statusLabel: 'Konfigurerad (23 Tabeller & RLS)',
        details: 'Fullständigt SQL-schema med Row Level Security-regler definierat i supabase/schema.sql.',
      },
      {
        serviceName: 'Svenskt BankID (BankID på fil / Mobilt BankID)',
        category: 'IDENTITY',
        status: 'NOT_CONNECTED',
        statusLabel: 'Ej ansluten (Förberedd abstraktion)',
        details: 'Integrationslager implementerat. Visar "BankID — Ej ansluten" tills produktionscertifikat konfigureras.',
      },
      {
        serviceName: 'Betalningsinstitut / Bankgirot',
        category: 'PAYMENT',
        status: 'NOT_CONNECTED',
        statusLabel: 'Ej ansluten (Förberedd abstraktion)',
        details: 'PaymentProvider-gränssnitt redo för anslutning av auktoriserad svensk betalningsleverantör.',
      },
      {
        serviceName: 'Lönehanteringssystem / Skatteverket AGI',
        category: 'PAYROLL',
        status: 'NOT_CONNECTED',
        statusLabel: 'Ej ansluten (Förberedd abstraktion)',
        details: 'Löneunderlag och skatteberäkningsgränssnitt redo för svensk löneleverantörskoppling.',
      },
      {
        serviceName: 'Arbetsförmedlingen Platsbanken API',
        category: 'GOVERNMENT',
        status: 'NOT_CONNECTED',
        statusLabel: 'Ej ansluten (Förberedd integration)',
        details: 'SSYK-klassificering och Platsbanken XML/JSON exportformat implementerat i GovernmentService.',
      }
    ];
  }

  static getDisputes(): Dispute[] {
    const saved = localStorage.getItem(DISPUTES_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_DISPUTES;
      }
    }
    localStorage.setItem(DISPUTES_STORAGE_KEY, JSON.stringify(INITIAL_DISPUTES));
    return INITIAL_DISPUTES;
  }

  static resolveDispute(disputeId: string, resolution: string): Dispute {
    const disputes = this.getDisputes();
    const item = disputes.find(d => d.id === disputeId);
    if (item) {
      item.status = 'RESOLVED';
      item.resolution = resolution;
      item.resolvedAt = new Date().toISOString();
      localStorage.setItem(DISPUTES_STORAGE_KEY, JSON.stringify(disputes));
    }
    return item!;
  }
}
