import maxBy from 'lodash/maxBy';
import { Candidate } from '../hooks/useCandidates';

export type CandidateAnswers = Pick<Candidate, 'expertise' | 'religiousParty' | 'politicalSide'>;

export function findMostSuitableCandidate(candidates: Candidate[], voterAnswers: CandidateAnswers): Candidate | null {
  const candidatesScore: { candidate: Candidate; score: number }[] = [];

  candidates.forEach(candidate => {
    let score = 0;
    if (voterAnswers.expertise && candidate.expertise && voterAnswers.expertise === candidate.expertise) {
      score++;
    }
    if (
      voterAnswers.religiousParty &&
      candidate.religiousParty &&
      voterAnswers.religiousParty === candidate.religiousParty
    ) {
      score++;
    }
    if (
      voterAnswers.politicalSide &&
      candidate.politicalSide &&
      voterAnswers.politicalSide === candidate.politicalSide
    ) {
      score++;
    }

    if (score > 0) {
      candidatesScore.push({ candidate, score });
    }
  });

  return maxBy(candidatesScore, c => c.score)?.candidate ?? null;
}
