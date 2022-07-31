import maxBy from 'lodash/maxBy';
import { Candidate } from '../hooks/useCandidates';

type QuestionPropName = 'expertise' | 'religiousParty' | 'politicalSide';
export type VoterAnswers = Pick<Candidate, QuestionPropName>;

export function findMostSuitableCandidate(candidates: Candidate[], voterAnswers: VoterAnswers): Candidate | null {
  const candidatesScore: { candidate: Candidate; score: number }[] = [];

  candidates.forEach(candidate => {
    let score = 0;
    if (isValuesDefinedAndEquals(candidate, voterAnswers, 'expertise')) score++;
    if (isValuesDefinedAndEquals(candidate, voterAnswers, 'religiousParty')) score++;
    if (isValuesDefinedAndEquals(candidate, voterAnswers, 'politicalSide')) score++;

    if (score > 0) {
      candidatesScore.push({ candidate, score });
    }
  });

  return maxBy(candidatesScore, c => c.score)?.candidate ?? null;
}

function isValuesDefinedAndEquals(
  candidate: Candidate,
  voterAnswers: VoterAnswers,
  propName: QuestionPropName
): boolean {
  return (
    Boolean(voterAnswers[propName]) && Boolean(candidate[propName]) && voterAnswers[propName] === candidate[propName]
  );
}
