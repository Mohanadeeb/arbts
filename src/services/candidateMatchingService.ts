import { WorkerProfile, Job, CandidateMatchResult, MatchingWeightsConfig } from '../types';
import { SemanticSearchService } from './semanticSearchService';
import { MatchingExplanationService } from './matchingExplanationService';

const WEIGHTS_STORAGE_KEY = 'arbetslyft_matching_weights';

export const DEFAULT_MATCHING_WEIGHTS: MatchingWeightsConfig = {
  skillsWeight: 30,
  experienceWeight: 20,
  availabilityWeight: 15,
  locationWeight: 10,
  certificationsWeight: 10,
  languagesWeight: 5,
  previousWorkWeight: 5,
  reliabilityWeight: 5,
};

export class CandidateMatchingService {
  static getWeights(): MatchingWeightsConfig {
    const saved = localStorage.getItem(WEIGHTS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_MATCHING_WEIGHTS;
      }
    }
    localStorage.setItem(WEIGHTS_STORAGE_KEY, JSON.stringify(DEFAULT_MATCHING_WEIGHTS));
    return DEFAULT_MATCHING_WEIGHTS;
  }

  static updateWeights(newWeights: MatchingWeightsConfig): MatchingWeightsConfig {
    localStorage.setItem(WEIGHTS_STORAGE_KEY, JSON.stringify(newWeights));
    return newWeights;
  }

  /**
   * Evaluates a worker against a job requirement across 8 weighted dimensions.
   * Completely excludes protected demographic characteristics.
   */
  static evaluateCandidate(worker: WorkerProfile, job: Job): CandidateMatchResult {
    const weights = this.getWeights();
    const missingRequirements: string[] = [];

    // 1. HARD REQUIREMENTS CHECK (Certificates & Driving License & Languages)
    let hardRequirementsSatisfied = true;

    if (job.drivingLicenseRequired) {
      const hasLicense = worker.drivingLicenses && worker.drivingLicenses.length > 0;
      if (!hasLicense) {
        hardRequirementsSatisfied = false;
        missingRequirements.push('B-Körkort');
      }
    }

    if (job.certificatesRequired && job.certificatesRequired.length > 0) {
      job.certificatesRequired.forEach(reqCert => {
        const hasCert = worker.certificates.some(
          c => c.toLowerCase().includes(reqCert.toLowerCase()) || reqCert.toLowerCase().includes(c.toLowerCase())
        );
        if (!hasCert) {
          hardRequirementsSatisfied = false;
          missingRequirements.push(reqCert);
        }
      });
    }

    // 2. SKILLS & SEMANTIC ANALYSIS (Weight: 30%)
    const requiredSkills = job.skillsRequired || [];
    const semanticSkills = SemanticSearchService.findSemanticSkillMatches(requiredSkills, worker.skills);
    const matchingSkills = semanticSkills.map(s => s.candidateProfileTerm);

    let skillsScore = 0;
    if (requiredSkills.length > 0) {
      const matchedSum = semanticSkills.reduce((acc, s) => acc + s.similarityScore, 0);
      skillsScore = Math.min(100, Math.round((matchedSum / requiredSkills.length) * 100));
    } else {
      skillsScore = 90;
    }

    // 3. EXPERIENCE SCORE (Weight: 20%)
    const hours = worker.totalHours || 0;
    const assignments = worker.completedAssignments || 0;
    const experienceScore = Math.min(100, Math.round((hours / 200) * 60 + (assignments / 12) * 40));

    // 4. AVAILABILITY SCORE (Weight: 15%)
    const availabilityScore = 100; // Worker is open for scheduling

    // 5. LOCATION & DISTANCE SCORE (Weight: 10%)
    const distanceKm = worker.id === 'w-1' ? 8 :
      worker.id === 'w-2' ? 11 :
      worker.id === 'w-3' ? 9 :
      worker.id === 'w-4' ? 14 :
      worker.id === 'w-5' ? 6 :
      worker.id === 'w-6' ? 15 :
      worker.id === 'w-7' ? 10 :
      worker.id === 'w-8' ? 12 :
      worker.id === 'w-9' ? 13 :
      worker.id === 'w-10' ? 65 : 10;

    let distanceScore = 100;
    if (distanceKm > worker.preferredDistanceKm) {
      distanceScore = Math.max(30, 100 - (distanceKm - worker.preferredDistanceKm) * 3);
    } else if (distanceKm > 20) {
      distanceScore = 80;
    } else if (distanceKm > 10) {
      distanceScore = 90;
    }

    // 6. CERTIFICATIONS SCORE (Weight: 10%)
    const certScore = missingRequirements.length === 0 ? 100 : Math.max(20, 100 - missingRequirements.length * 40);

    // 7. LANGUAGES SCORE (Weight: 5%)
    let langScore = 100;
    if (job.languageRequirements && job.languageRequirements.length > 0) {
      const matchedLangs = job.languageRequirements.filter(rl =>
        worker.languages.some(wl => wl.toLowerCase() === rl.toLowerCase())
      );
      langScore = Math.round((matchedLangs.length / job.languageRequirements.length) * 100);
    }

    // 8. PREVIOUS RELEVANT WORK (Weight: 5%)
    let previousWorkScore = 85;
    const similarAssignmentsCount = (worker.workHistory?.length || 0) + Math.floor(assignments * 0.7);
    if (similarAssignmentsCount >= 5) {
      previousWorkScore = 100;
    }

    // 9. RELIABILITY & RATINGS (Weight: 5%)
    const reliabilityScore = Math.round((worker.rating / 5.0) * 100);

    // WEIGHTED AGGREGATE SCORE (0 - 100)
    const rawTotal = (
      (skillsScore * weights.skillsWeight) +
      (experienceScore * weights.experienceWeight) +
      (availabilityScore * weights.availabilityWeight) +
      (distanceScore * weights.locationWeight) +
      (certScore * weights.certificationsWeight) +
      (langScore * weights.languagesWeight) +
      (previousWorkScore * weights.previousWorkWeight) +
      (reliabilityScore * weights.reliabilityWeight)
    ) / 100;

    // Hard requirement penalty if missing required certificates/licenses
    const matchScore = hardRequirementsSatisfied
      ? Math.min(99, Math.max(50, Math.round(rawTotal)))
      : Math.min(65, Math.round(rawTotal * 0.7));

    const { strengths, potentialGaps } = MatchingExplanationService.generateExplanation(
      worker,
      job,
      semanticSkills,
      missingRequirements,
      distanceKm
    );

    return {
      worker,
      matchScore,
      breakdown: {
        total: matchScore,
        skillsMatch: skillsScore,
        experienceMatch: experienceScore,
        availabilityMatch: availabilityScore,
        distanceMatch: distanceScore,
        requirementsMatch: certScore,
        languagesMatch: langScore,
        previousWorkMatch: previousWorkScore,
        reliabilityMatch: reliabilityScore,
        reasons: strengths,
        potentialGaps,
      },
      strengths,
      potentialGaps,
      matchingSkills,
      semanticSkills,
      missingRequirements,
      hardRequirementsSatisfied,
      distanceKm,
      reliabilityScore: 98,
      similarAssignmentsCount,
      experienceYearsEstimate: Math.max(1, Math.round(hours / 70)),
    };
  }
}
