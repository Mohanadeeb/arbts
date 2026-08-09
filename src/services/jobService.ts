import { Job, JobCategory, Company, EmployerProfile } from '../types';
import { DEMO_EMPLOYER_PROFILE } from './authService';

const JOBS_STORAGE_KEY = 'arbetslyft_jobs';
const COMPANY_STORAGE_KEY = 'arbetslyft_company_profile';

export const JOB_CATEGORIES: JobCategory[] = [
  { id: 'cat-1', name: 'Lager & Logistik', icon: 'Briefcase', description: 'Paketering, truckkörning och godshantering.' },
  { id: 'cat-2', name: 'Butik & Handel', icon: 'Building2', description: 'Kassa, varupåfyllning och kundservice.' },
  { id: 'cat-3', name: 'Event & Mässa', icon: 'Sparkles', description: 'Värdskap, montering och registrering.' },
  { id: 'cat-4', name: 'Hotell & Restaurang', icon: 'Coins', description: 'Servering, disk och kökshjälp.' },
  { id: 'cat-5', name: 'Bygg & Hantverk', icon: 'Award', description: 'Grovstäd, hantverkshjälp och materialhantering.' },
  { id: 'cat-6', name: 'Administration & Kundtjänst', icon: 'Bot', description: 'Telefoni, support och dataregistrering.' },
];

export const INITIAL_SAMPLE_JOBS: Job[] = [
  {
    id: 'job-1',
    companyId: 'c-1',
    employerUserId: 'u-employer-1',
    companyName: 'Svensk Logistik Solutions AB',
    companyLogo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80',
    title: 'Lagerarbetare — 5 dagar (Högsäsong)',
    description: 'Vi söker 3 drivna medarbetare för orderplock, paketering och truckkörning under vår intensiva kampanjvecka.',
    category: 'Lager & Logistik',
    skillsRequired: ['Lagerarbete', 'Truckkort A1-A4', 'Paketering'],
    experienceRequired: '1+ år erfarenhet',
    location: 'Stockholm, Älvsjö',
    isRemote: false,
    startDate: '2026-08-15',
    endDate: '2026-08-20',
    startTime: '07:00',
    endTime: '16:00',
    workersNeeded: 3,
    hourlyRate: 165,
    languageRequirements: ['Svenska', 'Engelska'],
    certificatesRequired: ['Truckkort A1-A4'],
    drivingLicenseRequired: true,
    status: 'OPEN',
    matchScore: 96,
    matchBreakdown: {
      total: 96,
      skillsMatch: 98,
      experienceMatch: 95,
      availabilityMatch: 100,
      distanceMatch: 92,
      requirementsMatch: 100,
      reasons: [
        'Du har Truckkort A1-A4 som efterfrågas',
        'Du är markerad som ledig för 15–20 augusti',
        'Avstånd inom din önskade radie (12 km)',
        'Din önskade timlön (165 SEK) matchar exakt budgeten'
      ]
    },
    createdAt: '2026-08-08T10:00:00Z',
  },
  {
    id: 'job-2',
    companyId: 'c-2',
    employerUserId: 'u-employer-2',
    companyName: 'Nordic Event & Expo Group',
    companyLogo: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80',
    title: 'Eventvärdar till Teknikmässa — 3 dagar',
    description: 'Hjälp till att välkomna besökare, scanna biljetter och assistera utställare på Stockholmsmässan.',
    category: 'Event & Mässa',
    skillsRequired: ['Event & Mässa', 'Kundtjänst', 'Kassa/Butik'],
    experienceRequired: 'Ingen specifik krävs',
    location: 'Stockholm, Mässvägen',
    isRemote: false,
    startDate: '2026-08-22',
    endDate: '2026-08-24',
    startTime: '08:30',
    endTime: '17:30',
    workersNeeded: 6,
    hourlyRate: 155,
    languageRequirements: ['Svenska', 'Engelska'],
    certificatesRequired: [],
    drivingLicenseRequired: false,
    status: 'OPEN',
    matchScore: 91,
    matchBreakdown: {
      total: 91,
      skillsMatch: 90,
      experienceMatch: 92,
      availabilityMatch: 95,
      distanceMatch: 94,
      requirementsMatch: 100,
      reasons: [
        'Erfarenhet från tidigare mässor finns i ditt Work Passport',
        'Flytande svenska och engelska matchar kraven',
        'Inga licenskrav'
      ]
    },
    createdAt: '2026-08-09T09:00:00Z',
  },
  {
    id: 'job-3',
    companyId: 'c-3',
    employerUserId: 'u-employer-3',
    companyName: 'City Matmarknad AB',
    companyLogo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80',
    title: 'Butiksmedarbetare & Kassapersonal — 2 veckor',
    description: 'Extraresurs för kassaarbete och uppackning av varor under semestertäckning med möjlighet till förlängning.',
    category: 'Butik & Handel',
    skillsRequired: ['Kassa/Butik', 'Kundtjänst'],
    experienceRequired: 'Kassaerfarenhet meriterande',
    location: 'Stockholm, Odenplan',
    isRemote: false,
    startDate: '2026-08-18',
    endDate: '2026-08-31',
    startTime: '10:00',
    endTime: '19:00',
    workersNeeded: 2,
    hourlyRate: 160,
    languageRequirements: ['Svenska'],
    certificatesRequired: ['Hygienpass'],
    drivingLicenseRequired: false,
    status: 'OPEN',
    matchScore: 88,
    matchBreakdown: {
      total: 88,
      skillsMatch: 85,
      experienceMatch: 88,
      availabilityMatch: 90,
      distanceMatch: 95,
      requirementsMatch: 90,
      reasons: [
        'Nära din bostadsort (4 km)',
        'Du har Hygienpass verifierat',
        'Möjlighet till fast anställning'
      ]
    },
    createdAt: '2026-08-07T14:30:00Z',
  },
  {
    id: 'job-4',
    companyId: 'c-4',
    employerUserId: 'u-employer-4',
    companyName: 'Mälardalen Byggsupport AB',
    companyLogo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80',
    title: 'Bygghantlangare & Grovstäd — 1 månad',
    description: 'Assistera snickare och sköta materialhantering samt säkerhetsstädning på nybyggnadsprojekt i Solna.',
    category: 'Bygg & Hantverk',
    skillsRequired: ['Bygg & Hantverk', 'Paketering'],
    experienceRequired: 'God fysik och punktlighet',
    location: 'Solna, Stockholm',
    isRemote: false,
    startDate: '2026-09-01',
    endDate: '2026-09-30',
    startTime: '06:30',
    endTime: '15:30',
    workersNeeded: 4,
    hourlyRate: 175,
    languageRequirements: ['Svenska'],
    certificatesRequired: ['Första Hjälpen (CPR)'],
    drivingLicenseRequired: true,
    status: 'OPEN',
    matchScore: 84,
    matchBreakdown: {
      total: 84,
      skillsMatch: 80,
      experienceMatch: 85,
      availabilityMatch: 85,
      distanceMatch: 90,
      requirementsMatch: 90,
      reasons: [
        'Hög timersättning: 175 SEK/tim',
        'B-körkort och Första Hjälpen uppfyllt'
      ]
    },
    createdAt: '2026-08-06T11:00:00Z',
  }
];

export class JobService {
  static getJobs(): Job[] {
    const saved = localStorage.getItem(JOBS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_SAMPLE_JOBS;
      }
    }
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_JOBS));
    return INITIAL_SAMPLE_JOBS;
  }

  static createJob(jobData: Omit<Job, 'id' | 'createdAt' | 'status'>): Job {
    const jobs = this.getJobs();
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      status: 'OPEN',
      matchScore: Math.floor(Math.random() * 15) + 85, // 85 - 100 for newly created jobs
      createdAt: new Date().toISOString(),
    };
    jobs.unshift(newJob);
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
    return newJob;
  }

  static getCompany(): Company {
    const saved = localStorage.getItem(COMPANY_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_EMPLOYER_PROFILE.company!;
      }
    }
    return DEMO_EMPLOYER_PROFILE.company!;
  }

  static saveCompany(company: Company): Company {
    localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(company));
    return company;
  }
}
