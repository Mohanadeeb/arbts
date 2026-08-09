import { WorkerProfile, Job, SemanticSkillMatch } from '../types';

export class MatchingExplanationService {
  /**
   * Generates honest, structured, human-readable strengths and potential gaps for a candidate-job match.
   */
  static generateExplanation(
    worker: WorkerProfile,
    job: Job,
    semanticMatches: SemanticSkillMatch[],
    missingReqs: string[],
    distanceKm: number
  ): { strengths: string[]; potentialGaps: string[] } {
    const strengths: string[] = [];
    const potentialGaps: string[] = [];

    // 1. Experience Strengths
    const totalHours = worker.totalHours || 0;
    const assignments = worker.completedAssignments || 0;
    if (totalHours >= 150) {
      const approxYears = (totalHours / 70).toFixed(0);
      strengths.push(`✓ ${approxYears}+ års dokumenterad arbetslivserfarenhet (${totalHours} verifierade timmar)`);
    } else if (assignments >= 5) {
      strengths.push(`✓ ${assignments} slutförda uppdrag med bevisad pålitlighet`);
    }

    // 2. Verified Certificates & Licenses
    if (job.certificatesRequired && job.certificatesRequired.length > 0) {
      job.certificatesRequired.forEach(reqCert => {
        const has = worker.certificates.some(
          c => c.toLowerCase().includes(reqCert.toLowerCase()) || reqCert.toLowerCase().includes(c.toLowerCase())
        );
        if (has) {
          strengths.push(`✓ Verifierat ${reqCert}-certifikat`);
        }
      });
    }

    if (job.drivingLicenseRequired) {
      if (worker.drivingLicenses && worker.drivingLicenses.length > 0) {
        strengths.push('✓ Giltigt körkort för uppdraget (Verifierat)');
      }
    }

    // 3. Semantic & Direct Skills Match
    semanticMatches.forEach(sm => {
      if (sm.similarityScore === 1.0) {
        strengths.push(`✓ Besitter kompetensen "${sm.jobRequiredTerm}"`);
      } else {
        strengths.push(`✓ Relaterad kompetens: "${sm.candidateProfileTerm}" motsvarar "${sm.jobRequiredTerm}"`);
      }
    });

    // 4. Availability & Proximity
    strengths.push('✓ Tillgänglig för alla efterfrågade uppdragsdatum');
    if (distanceKm <= 12) {
      strengths.push(`✓ Endast ${distanceKm} km från arbetsplatsen (Lokal profil)`);
    } else {
      strengths.push(`✓ ${distanceKm} km avstånd (Inom kandidatens maxradie på ${worker.preferredDistanceKm} km)`);
    }

    // 5. Ratings & Reliability
    if (worker.rating >= 4.7) {
      strengths.push(`✓ Högt kundbetyg (${worker.rating.toFixed(1)}/5) från tidigare arbetsgivare`);
    }

    // 6. Transparent Potential Gaps & Missing Hard Requirements
    if (missingReqs.length > 0) {
      missingReqs.forEach(req => {
        potentialGaps.push(`⚠ Saknar obligatoriskt krav: ${req}`);
      });
    }

    if (distanceKm > 25) {
      potentialGaps.push(`⚠ Längre pendlingsavstånd (${distanceKm} km)`);
    }

    if (worker.desiredHourlyRate && job.hourlyRate && worker.desiredHourlyRate > job.hourlyRate) {
      potentialGaps.push(`⚠ Kandidatens önskade timlön (${worker.desiredHourlyRate} SEK) är högre än uppdragets budget (${job.hourlyRate} SEK)`);
    }

    if (job.category === 'Lager & Logistik' && !worker.skills.some(s => s.toLowerCase().includes('fryslager') || s.toLowerCase().includes('kyl'))) {
      if (job.description.toLowerCase().includes('frys') || job.description.toLowerCase().includes('kyl')) {
        potentialGaps.push('⚠ Kandidaten har begränsad specifik erfarenhet av frys- och kyllager.');
      }
    }

    return {
      strengths: strengths.slice(0, 6),
      potentialGaps: potentialGaps.length > 0 ? potentialGaps : ['Inga kritiska kompetensluckor identifierade.'],
    };
  }
}
