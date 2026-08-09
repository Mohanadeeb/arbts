export type UserRole = 'WORKER' | 'EMPLOYER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Company {
  id: string;
  companyName: string;
  orgNumber: string;
  logoUrl?: string;
  industry: string;
  description: string;
  location: string;
  contactEmail: string;
  contactPhone?: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

export interface EmployerProfile {
  id: string;
  userId: string;
  companyId?: string;
  fullName: string;
  position: string;
  phone?: string;
  company?: Company;
}

export interface WorkerProfile {
  id: string;
  userId: string;
  fullName: string;
  profilePhoto?: string;
  phone?: string;
  location: string;
  biography: string;
  skills: string[];
  education: string;
  languages: string[];
  certificates: string[];
  drivingLicenses: string[];
  preferredJobCategories: string[];
  preferredDistanceKm: number;
  desiredHourlyRate: number;
  rating: number;
  completedAssignments: number;
  totalHours: number;
  bankidVerified: boolean;
  workHistory?: WorkHistoryItem[];
}

export interface WorkHistoryItem {
  id: string;
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  hoursWorked: number;
  rating: number;
  feedback?: string;
}

export interface JobCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Job {
  id: string;
  companyId: string;
  employerUserId: string;
  companyName: string;
  companyLogo?: string;
  title: string;
  description: string;
  category: string;
  skillsRequired: string[];
  experienceRequired: string;
  location: string;
  isRemote: boolean;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  workersNeeded: number;
  hourlyRate: number;
  languageRequirements: string[];
  certificatesRequired: string[];
  drivingLicenseRequired: boolean;
  status: 'OPEN' | 'FILLED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  matchScore?: number;
  matchBreakdown?: MatchBreakdown;
  createdAt: string;
}

export interface MatchBreakdown {
  total: number; // 0 - 100
  skillsMatch: number;
  experienceMatch: number;
  availabilityMatch: number;
  distanceMatch: number;
  requirementsMatch: number;
  languagesMatch?: number;
  previousWorkMatch?: number;
  reliabilityMatch?: number;
  reasons: string[];
  potentialGaps?: string[];
}

export interface MatchingWeightsConfig {
  skillsWeight: number; // 30
  experienceWeight: number; // 20
  availabilityWeight: number; // 15
  locationWeight: number; // 10
  certificationsWeight: number; // 10
  languagesWeight: number; // 5
  previousWorkWeight: number; // 5
  reliabilityWeight: number; // 5
}

export interface SemanticSkillMatch {
  jobRequiredTerm: string;
  candidateProfileTerm: string;
  similarityScore: number; // 0.0 - 1.0
  explanation: string;
}

export interface CandidateMatchResult {
  worker: WorkerProfile;
  matchScore: number; // 0 - 100
  breakdown: MatchBreakdown;
  strengths: string[];
  potentialGaps: string[];
  matchingSkills: string[];
  semanticSkills: SemanticSkillMatch[];
  missingRequirements: string[];
  hardRequirementsSatisfied: boolean;
  distanceKm: number;
  reliabilityScore: number; // 0 - 100
  similarAssignmentsCount: number;
  experienceYearsEstimate: number;
}

export interface CandidateMatchAuditLog {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  matchScore: number;
  matchingFactors: {
    skills: number;
    experience: number;
    availability: number;
    distance: number;
    certifications: number;
  };
  aiModelVersion: string;
  employerAction: 'VIEWED' | 'SHORTLISTED' | 'OFFER_SENT' | 'IGNORED' | 'HIRED';
  timestamp: string;
}

export interface MatchingAnalyticsData {
  totalMatchesEvaluated: number;
  averageMatchScore: number;
  recommendationPlacementRate: number; // e.g. 78%
  successfulPlacementsCount: number;
  ignoredRecommendationsCount: number;
  topRequestedSkills: { skill: string; count: number }[];
  detectedSkillGaps: { gap: string; frequency: number }[];
  aiProviderStatus: {
    isConnected: boolean;
    providerName: string;
    engineMode: string;
    statusNotice: string;
  };
}

export interface JobApplication {
  id: string;
  jobId: string;
  workerId: string;
  workerName: string;
  workerPhoto?: string;
  status: 'PENDING' | 'SHORTLISTED' | 'OFFERED' | 'REJECTED' | 'WITHDRAWN';
  coverNote?: string;
  createdAt: string;
}

export interface JobOffer {
  id: string;
  jobId: string;
  companyId: string;
  workerId: string;
  hourlyRate: number;
  status: 'OFFERED' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
  createdAt: string;
}

export type AssignmentStatus =
  | 'DRAFT'
  | 'OFFERED'
  | 'CONTRACT_PENDING'
  | 'CONTRACT_ACCEPTED'
  | 'READY_TO_START'
  | 'ACTIVE'
  | 'HOURS_SUBMITTED'
  | 'HOURS_APPROVED'
  | 'PAYMENT_PROCESSING'
  | 'PAID'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED';

export interface Assignment {
  id: string;
  jobId: string;
  contractId: string;
  workerId: string;
  companyId: string;
  jobTitle: string;
  companyName: string;
  workerName: string;
  startDate: string;
  endDate: string;
  hourlyRate: number;
  status: AssignmentStatus;
  permanentEmploymentOffered: boolean;
  totalApprovedHours?: number;
  totalGrossAmount?: number;
  createdAt: string;
}

export interface ContractVersion {
  id: string;
  contractId: string;
  versionNumber: number; // e.g. 1.0, 2.0
  companyName: string;
  orgNumber: string;
  workerName: string;
  jobTitle: string;
  jobDescription: string;
  workLocation: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  expectedHours: number;
  breakMinutes: number;
  hourlyRate: number;
  expectedGrossAmount: number;
  paymentMethod: string;
  cancellationTerms: string;
  workTerms: string;
  isActive: boolean;
  createdAt: string;
  workerAcceptedAt?: string;
  employerAcceptedAt?: string;
}

export interface Contract {
  id: string;
  contractNumber: string; // e.g. AL-2026-000123
  jobId: string;
  companyId: string;
  workerId: string;
  currentVersion: ContractVersion;
  versionsHistory: ContractVersion[];
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED';
  createdAt: string;
}

export interface WorkHoursSubmission {
  id: string;
  assignmentId: string;
  workerId: string;
  date: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  totalHours: number;
  workerNotes?: string;
  status: 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  employerRejectionReason?: string;
  approvedAt?: string;
  submittedAt: string;
}

export interface Review {
  id: string;
  assignmentId: string;
  fromName: string;
  toName: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'OFFER' | 'CONTRACT' | 'HOURS' | 'PAYMENT' | 'MESSAGE' | 'PERMANENT_OFFER' | 'SYSTEM';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface MessageItem {
  id: string;
  senderId: string;
  recipientId: string;
  senderName: string;
  jobId?: string;
  assignmentId?: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  assignmentId: string;
  workerId: string;
  companyId: string;
  grossAmount: number;
  platformFee: number;
  netAmount: number;
  currency: string;
  status: 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED' | 'REFUNDED';
  payrollStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
}

export interface Dispute {
  id: string;
  assignmentId: string;
  raisedBy: string;
  raisedAgainst: string;
  reason: string;
  description: string;
  status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED';
  resolution?: string;
  resolvedAt?: string;
  createdAt: string;
}

export type DisputeItem = Dispute;

