import { EligibilityCriteria } from '../types';

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function isDeadlineNear(deadline: string, days: number = 7): boolean {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= days && diffDays >= 0;
}

export function getConfidenceLevel(score: number): { level: 'high' | 'medium' | 'low'; color: string } {
  if (score >= 80) return { level: 'high', color: 'green' };
  if (score >= 60) return { level: 'medium', color: 'yellow' };
  return { level: 'low', color: 'red' };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

export function calculateMatchScore(
  userProfile: any,
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
    score: Math.round((score / totalCriteria) * 100),
    matchingCriteria,
    missingCriteria
  };
}