import { SemanticSkillMatch } from '../types';

/**
 * Concept clusters and semantic equivalence map for Swedish labor market.
 * Maps job titles, skills, certifications and tasks to related terms and degrees of similarity (0.0 to 1.0).
 */
export const SEMANTIC_CONCEPT_CLUSTERS: Record<string, { synonyms: string[]; category: string; weight: number }> = {
  // Warehouse & Logistics Cluster
  'warehouse worker': {
    synonyms: [
      'lagerarbetare', 'logistikassistent', 'orderplockare', 'truckförare',
      'godsmottagning', 'paketering', 'förrådsman', 'materialhanterare',
      'terminalarbetare', 'distributionsassistent', 'plockpersonal'
    ],
    category: 'Lager & Logistik',
    weight: 0.95,
  },
  'lagerarbetare': {
    synonyms: [
      'logistikassistent', 'warehouse worker', 'orderplockare', 'truckförare',
      'godshanterare', 'plock och pack', 'distributionsmedarbetare', 'lagermedarbetare'
    ],
    category: 'Lager & Logistik',
    weight: 0.95,
  },
  'truckkort a1-a4': {
    synonyms: [
      'forklift license', 'truckkort', 'motviktstruck', 'skjutstativtruck',
      'ledstaplare', 'plocktruck', 'truckkörning', 'truckförare'
    ],
    category: 'Certifikat',
    weight: 1.0,
  },
  'orderplock': {
    synonyms: ['order picking', 'plockarbete', 'paketering', 'skanning', 'plock & pack', 'godshantering'],
    category: 'Lager & Logistik',
    weight: 0.90,
  },

  // Retail & Cashier Cluster
  'butikssäljare': {
    synonyms: [
      'store clerk', 'kassapersonal', 'butiksmedarbetare', 'kassabiträde',
      'varupåfyllning', 'kundtjänst', 'detaljhandel', 'butiksbiträde'
    ],
    category: 'Butik & Handel',
    weight: 0.92,
  },
  'kassa/butik': {
    synonyms: ['kassahantering', 'kassasystem', 'butiksarbete', 'kundmottagning', 'retail sales'],
    category: 'Butik & Handel',
    weight: 0.90,
  },

  // Events & Hospitality Cluster
  'eventvärd': {
    synonyms: [
      'event staff', 'mässvärd', 'konferensvärd', 'kundvärd',
      'publikvärd', 'värdskap', 'entrévärd', 'biljettkontrollant'
    ],
    category: 'Event & Mässa',
    weight: 0.92,
  },
  'hygienpass': {
    synonyms: ['food hygiene certificate', 'livsmedelshygien', 'egenkontroll livsmedel', 'haccp'],
    category: 'Certifikat',
    weight: 1.0,
  },

  // Construction & Craft Cluster
  'bygghantlangare': {
    synonyms: [
      'construction helper', 'grovarbetare', 'grovstädare', 'rivningsarbetare',
      'hantverkshjälp', 'byggstädare', 'materialbärare'
    ],
    category: 'Bygg & Hantverk',
    weight: 0.90,
  }
};

export class SemanticSearchService {
  /**
   * Status of external vector embedding engine (e.g. OpenAI ada-002, pgvector).
   */
  static getProviderStatus() {
    return {
      isConnected: false,
      providerName: 'Supabase pgvector / OpenAI Text-Embedding-3',
      engineMode: 'Hybrid Terminology Graph + Semantic Similarity Matrix (Active)',
      statusNotice: 'AI matchningsleverantör ej live-kopplad via API-nyckel. Plattformens inbyggda semantiska hybridmotor är aktiv.',
    };
  }

  /**
   * Calculates semantic similarity between a required term and a candidate's profile/skills.
   * Returns similarity score 0.0 - 1.0 + explanation.
   */
  static computeTermSimilarity(jobTerm: string, candidateTerm: string): { similarity: number; explanation: string } {
    const jClean = jobTerm.toLowerCase().trim();
    const cClean = candidateTerm.toLowerCase().trim();

    // Exact string match
    if (jClean === cClean) {
      return {
        similarity: 1.0,
        explanation: `Exakt matchning: "${candidateTerm}"`,
      };
    }

    // Substring inclusion
    if (jClean.includes(cClean) || cClean.includes(jClean)) {
      return {
        similarity: 0.85,
        explanation: `Direkt relaterad kompetens: "${candidateTerm}" matchar "${jobTerm}"`,
      };
    }

    // Semantic Concept Cluster Graph Lookup
    for (const [key, cluster] of Object.entries(SEMANTIC_CONCEPT_CLUSTERS)) {
      const isJobInCluster = key === jClean || cluster.synonyms.includes(jClean);
      const isCandidateInCluster = key === cClean || cluster.synonyms.includes(cClean);

      if (isJobInCluster && isCandidateInCluster) {
        return {
          similarity: cluster.weight,
          explanation: `Semantisk match: "${candidateTerm}" förstås som ekvivalent/relaterat till "${jobTerm}" (${cluster.category})`,
        };
      }
    }

    return {
      similarity: 0.0,
      explanation: 'Ingen semantisk koppling identifierad.',
    };
  }

  /**
   * Analyzes all skills and experiences of a candidate against a job requirement.
   */
  static findSemanticSkillMatches(jobRequirements: string[], candidateSkills: string[]): SemanticSkillMatch[] {
    const matches: SemanticSkillMatch[] = [];

    jobRequirements.forEach(req => {
      let highestSimilarity = 0;
      let bestCandidateSkill = '';
      let bestExplanation = '';

      candidateSkills.forEach(cSkill => {
        const { similarity, explanation } = this.computeTermSimilarity(req, cSkill);
        if (similarity > highestSimilarity) {
          highestSimilarity = similarity;
          bestCandidateSkill = cSkill;
          bestExplanation = explanation;
        }
      });

      if (highestSimilarity >= 0.70) {
        matches.push({
          jobRequiredTerm: req,
          candidateProfileTerm: bestCandidateSkill,
          similarityScore: highestSimilarity,
          explanation: bestExplanation,
        });
      }
    });

    return matches;
  }
}
