import { WorkerProfile, Job, CandidateMatchResult } from '../types';
import { SAMPLE_WORKERS_DATABASE } from './sampleDataService';
import { CandidateMatchingService } from './candidateMatchingService';

export class CandidateSearchService {
  /**
   * Retrieves all registered workers in the Arbetslyft database.
   */
  static getAllWorkers(): WorkerProfile[] {
    return SAMPLE_WORKERS_DATABASE;
  }

  /**
   * Hybrid Candidate Discovery Pipeline:
   * 1. Evaluates all candidates across semantic similarity, hard requirements, and weighted dimensions.
   * 2. Ranks candidates descending by match score.
   */
  static searchCandidatesForJob(job: Job): CandidateMatchResult[] {
    const allWorkers = this.getAllWorkers();

    const evaluated = allWorkers.map(worker =>
      CandidateMatchingService.evaluateCandidate(worker, job)
    );

    // Rank candidates by matchScore descending (prioritizing hard-requirement satisfied candidates)
    return evaluated.sort((a, b) => {
      if (a.hardRequirementsSatisfied && !b.hardRequirementsSatisfied) return -1;
      if (!a.hardRequirementsSatisfied && b.hardRequirementsSatisfied) return 1;
      return b.matchScore - a.matchScore;
    });
  }
}
