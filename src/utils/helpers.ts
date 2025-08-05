import { StudentProfile, EligibilityCriteria } from '../types';

export function calculateMatchScore(
  userProfile: StudentProfile,
  eligibility: EligibilityCriteria
): { score: number; matchingCriteria: string[]; missingCriteria: string[] } {
  const matchingCriteria: string[] = [];
  const missingCriteria: string[] = [];
  let score = 0;
  const totalCriteria = Object.keys(eligibility).length;

  // Age check
  if (eligibility.minAge && eligibility.maxAge) {
    if (userProfile.age >= eligibility.minAge && userProfile.age <= eligibility.maxAge) {
      matchingCriteria.push('age');
      score++;
    } else {
      missingCriteria.push('age');
    }
  }

  // Caste check
  if (eligibility.caste && eligibility.caste.includes(userProfile.caste)) {
    matchingCriteria.push('caste');
    score++;
  } else if (eligibility.caste) {
    missingCriteria.push('caste');
  }

  // Income check
  if (eligibility.maxFamilyIncome && userProfile.familyIncome <= eligibility.maxFamilyIncome) {
    matchingCriteria.push('family income');
    score++;
  } else if (eligibility.maxFamilyIncome) {
    missingCriteria.push('family income');
  }

  // Academic score check
  if (eligibility.minAcademicScore && userProfile.academicScore >= eligibility.minAcademicScore) {
    matchingCriteria.push('academic score');
    score++;
  } else if (eligibility.minAcademicScore) {
    missingCriteria.push('academic score');
  }

  // Stream check
  if (eligibility.requiredStream && eligibility.requiredStream.includes(userProfile.stream)) {
    matchingCriteria.push('stream');
    score++;
  } else if (eligibility.requiredStream) {
    missingCriteria.push('stream');
  }

  return {
    score: (score / totalCriteria) * 100,
    matchingCriteria,
    missingCriteria
  };
}