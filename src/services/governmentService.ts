import { Job, WorkerProfile } from '../types';

export interface SSYKClassification {
  code: string;
  title: string;
  category: string;
}

export const SSYK_TAXONOMY: SSYKClassification[] = [
  { code: '9333', title: 'Godshanterare och lagerarbetare', category: 'Lager & Logistik' },
  { code: '5223', title: 'Butikssäljare och kassa', category: 'Butik & Handel' },
  { code: '5120', title: 'Kockar och köksbiträden', category: 'Hotell & Restaurang' },
  { code: '5131', title: 'Serveringspersonal', category: 'Hotell & Restaurang' },
  { code: '9313', title: 'Bygghantlangare och grovarbetare', category: 'Bygg & Hantverk' },
  { code: '3339', title: 'Eventpersonal och mässvärdar', category: 'Event & Mässa' },
  { code: '4110', title: 'Kontorsassistenter och receptionister', category: 'Administration & Kundtjänst' },
];

export class GovernmentService {
  static getStatus(): { isConnected: boolean; statusText: string } {
    return {
      isConnected: false,
      statusText: 'Arbetsförmedlingen — Ej ansluten (Förberedd integration)',
    };
  }

  static getSSYKForJob(category: string): SSYKClassification {
    const found = SSYK_TAXONOMY.find(s => s.category.toLowerCase().includes(category.toLowerCase()));
    return found || SSYK_TAXONOMY[0];
  }

  /**
   * Generates official Arbetsförmedlingen JobStream / Platsbanken compatible JSON payload
   */
  static generatePlatsbankenPayload(job: Job) {
    const ssyk = this.getSSYKForJob(job.category);
    return {
      external_id: job.id,
      original_id: `AL-${job.id}`,
      source: 'ARBETSLYFT',
      headline: job.title,
      description: {
        text: job.description,
        conditions: `${job.hourlyRate} SEK/tim, ${job.startDate} till ${job.endDate}`,
      },
      employment_type: {
        code: 'TIM',
        label: 'Tidsbegränsad anställning / Timanställning',
      },
      salary_type: {
        code: 'TIM',
        label: 'Fast timlön',
      },
      occupations: [
        {
          ssyk_code: ssyk.code,
          label: ssyk.title,
        }
      ],
      workplace_address: {
        city: job.location.split(',')[0].trim(),
        country: 'Sverige',
      },
      application_details: {
        url: `https://arbetslyft.se/jobs/${job.id}`,
      }
    };
  }

  /**
   * Generates verified municipal activity report for Arbetsmarknadsenheter & Försäkringskassan
   */
  static generateMunicipalityActivityReport(worker: WorkerProfile) {
    return {
      reportType: 'Aktivitets- och Arbetstidsintyg för Arbetsmarknadsinsatser',
      issuedBy: 'Arbetslyft Digital Verifiering',
      date: new Date().toISOString().split('T')[0],
      worker: {
        name: worker.fullName,
        city: worker.location,
        totalVerifiedHours: worker.totalHours,
        completedAssignments: worker.completedAssignments,
        verifiedSkills: worker.skills,
        verifiedCertificates: worker.certificates,
      },
      authenticityCode: `KOMMUN-${Date.now().toString().slice(-6)}`,
      notice: 'Detta intyg sammanställer faktiskt utfört och attesterat arbete via Arbetslyft.',
    };
  }
}
