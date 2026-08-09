import { Contract, ContractVersion, Assignment, AssignmentStatus } from '../types';

const CONTRACTS_STORAGE_KEY = 'arbetslyft_contracts';
const ASSIGNMENTS_STORAGE_KEY = 'arbetslyft_assignments';
const AUDIT_STORAGE_KEY = 'arbetslyft_contract_audits';

export interface ContractAuditEntry {
  id: string;
  contractNumber: string;
  versionNumber: number;
  action: string;
  actor: string;
  timestamp: string;
  details?: string;
}

export const INITIAL_SAMPLE_CONTRACT: Contract = {
  id: 'c-101',
  contractNumber: 'AL-2026-000123',
  jobId: 'job-1',
  companyId: 'c-1',
  workerId: 'w-1',
  status: 'PENDING',
  createdAt: '2026-08-09T10:20:00Z',
  currentVersion: {
    id: 'cv-1',
    contractId: 'c-101',
    versionNumber: 1.0,
    companyName: 'Svensk Logistik Solutions AB',
    orgNumber: '556123-4567',
    workerName: 'Astrid Lindgren',
    jobTitle: 'Lagerarbetare — 5 dagar (Högsäsong)',
    jobDescription: 'Orderplock, truckkörning A1-A4 och godshantering under kampanjperioden.',
    workLocation: 'Stockholm, Älvsjö',
    startDate: '2026-08-15',
    endDate: '2026-08-20',
    startTime: '07:00',
    endTime: '16:00',
    expectedHours: 40,
    breakMinutes: 45,
    hourlyRate: 165,
    expectedGrossAmount: 6600,
    paymentMethod: 'Arbetslyft Plattform / Arbetsgivarattest',
    cancellationTerms: 'Avbokning ska ske senast 24 timmar innan arbetspassets start. Vid senare avbokning utgår ersättning enligt gällande villkor.',
    workTerms: 'Arbetstagaren åtar sig att följa arbetsplatsens säkerhetsföreskrifter och använda föreskriven skyddsutrustning. Arbetsgivaren ansvarar för arbetsmiljö och introduktion på plats.',
    isActive: true,
    createdAt: '2026-08-09T10:20:00Z',
    workerAcceptedAt: undefined,
    employerAcceptedAt: '2026-08-09T10:22:00Z',
  },
  versionsHistory: []
};

export const INITIAL_SAMPLE_ASSIGNMENT: Assignment = {
  id: 'ass-101',
  jobId: 'job-1',
  contractId: 'c-101',
  workerId: 'w-1',
  companyId: 'c-1',
  jobTitle: 'Lagerarbetare — 5 dagar (Högsäsong)',
  companyName: 'Svensk Logistik Solutions AB',
  workerName: 'Astrid Lindgren',
  startDate: '2026-08-15',
  endDate: '2026-08-20',
  hourlyRate: 165,
  status: 'CONTRACT_PENDING',
  permanentEmploymentOffered: false,
  totalApprovedHours: 0,
  totalGrossAmount: 0,
  createdAt: '2026-08-09T10:20:00Z',
};

export class ContractService {
  static getContracts(): Contract[] {
    const saved = localStorage.getItem(CONTRACTS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [INITIAL_SAMPLE_CONTRACT];
      }
    }
    localStorage.setItem(CONTRACTS_STORAGE_KEY, JSON.stringify([INITIAL_SAMPLE_CONTRACT]));
    return [INITIAL_SAMPLE_CONTRACT];
  }

  static getAssignments(): Assignment[] {
    const saved = localStorage.getItem(ASSIGNMENTS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [INITIAL_SAMPLE_ASSIGNMENT];
      }
    }
    localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify([INITIAL_SAMPLE_ASSIGNMENT]));
    return [INITIAL_SAMPLE_ASSIGNMENT];
  }

  static getAudits(contractNumber?: string): ContractAuditEntry[] {
    const saved = localStorage.getItem(AUDIT_STORAGE_KEY);
    let audits: ContractAuditEntry[] = [];
    if (saved) {
      try {
        audits = JSON.parse(saved);
      } catch {
        audits = [];
      }
    }
    if (audits.length === 0) {
      audits = [
        {
          id: 'aud-1',
          contractNumber: 'AL-2026-000123',
          versionNumber: 1.0,
          action: 'Avtal Genererat',
          actor: 'System (Arbetslyft)',
          timestamp: '2026-08-09 10:20',
          details: 'Digitalt avtalsutkast skapat baserat på accepterat jobberbjudande.',
        },
        {
          id: 'aud-2',
          contractNumber: 'AL-2026-000123',
          versionNumber: 1.0,
          action: 'Arbetsgivare Signerade',
          actor: 'Svensk Logistik Solutions AB',
          timestamp: '2026-08-09 10:22',
          details: 'Arbetsgivaren har godkänt villkoren och timersättningen (165 SEK/tim).',
        }
      ];
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(audits));
    }
    if (contractNumber) {
      return audits.filter(a => a.contractNumber === contractNumber);
    }
    return audits;
  }

  static acceptWorkerContract(contractId: string, workerName: string): Contract {
    const contracts = this.getContracts();
    const contract = contracts.find(c => c.id === contractId);
    if (contract) {
      contract.currentVersion.workerAcceptedAt = new Date().toISOString();
      contract.status = 'ACTIVE';
      localStorage.setItem(CONTRACTS_STORAGE_KEY, JSON.stringify(contracts));

      // Update Assignment to READY_TO_START
      const assignments = this.getAssignments();
      const assignment = assignments.find(a => a.contractId === contractId);
      if (assignment) {
        assignment.status = 'READY_TO_START';
        localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(assignments));
      }

      // Add audit entry
      const audits = this.getAudits();
      audits.push({
        id: `aud-${Date.now()}`,
        contractNumber: contract.contractNumber,
        versionNumber: contract.currentVersion.versionNumber,
        action: 'Arbetstagare Accepterade',
        actor: workerName,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        details: 'Arbetstagaren har bekräftat: "Jag har läst och accepterar avtalet."',
      });
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(audits));
    }
    return contract!;
  }

  /**
   * Immutable Contract Versioning:
   * When material terms (hourly rate, dates, hours) are altered after creation,
   * preserve the old version in versionsHistory and create a new pending version (e.g. 2.0).
   */
  static createNewVersion(
    contractId: string,
    updates: Partial<ContractVersion>,
    reason: string
  ): Contract {
    const contracts = this.getContracts();
    const contract = contracts.find(c => c.id === contractId);
    if (contract) {
      // Archive old version
      const oldVersion = { ...contract.currentVersion, isActive: false };
      contract.versionsHistory.push(oldVersion);

      // New incremented version
      const nextVersionNumber = Number((contract.currentVersion.versionNumber + 1.0).toFixed(1));
      const newVersion: ContractVersion = {
        ...contract.currentVersion,
        ...updates,
        id: `cv-${Date.now()}`,
        versionNumber: nextVersionNumber,
        isActive: true,
        workerAcceptedAt: undefined, // Requires new acceptance
        createdAt: new Date().toISOString(),
      };

      contract.currentVersion = newVersion;
      contract.status = 'PENDING';
      localStorage.setItem(CONTRACTS_STORAGE_KEY, JSON.stringify(contracts));

      // Add audit entry
      const audits = this.getAudits();
      audits.push({
        id: `aud-${Date.now()}`,
        contractNumber: contract.contractNumber,
        versionNumber: nextVersionNumber,
        action: `Ny Avtalsversion skapad (v${nextVersionNumber})`,
        actor: 'Arbetsgivare',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        details: `Villkorsändring: ${reason}. Kräver förnyat godkännande.`,
      });
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(audits));
    }
    return contract!;
  }
}
