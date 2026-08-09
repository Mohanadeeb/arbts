import { CandidateMatchResult, Job } from '../types';
import { CandidateSearchService } from './candidateSearchService';

export class CandidateRankingService {
  /**
   * Returns top N recommended candidates for a job.
   */
  static getTopRecommendations(job: Job, limit: number = 6): CandidateMatchResult[] {
    const results = CandidateSearchService.searchCandidatesForJob(job);
    return results.slice(0, limit);
  }

  /**
   * Prepares comparative data between selected candidates for side-by-side comparison modal.
   */
  static compareCandidates(candidates: CandidateMatchResult[]): {
    bestMatch: CandidateMatchResult;
    closestDistance: CandidateMatchResult;
    highestExperience: CandidateMatchResult;
  } {
    const bestMatch = [...candidates].sort((a, b) => b.matchScore - a.matchScore)[0] || candidates[0];
    const closestDistance = [...candidates].sort((a, b) => a.distanceKm - b.distanceKm)[0] || candidates[0];
    const highestExperience = [...candidates].sort((a, b) => (b.worker.totalHours || 0) - (a.worker.totalHours || 0))[0] || candidates[0];

    return {
      bestMatch,
      closestDistance,
      highestExperience,
    };
  }
}
