import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, isAfter, isBefore, addDays } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, formatStr: string = 'MMM dd, yyyy'): string {
  return format(new Date(date), formatStr);
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function isDeadlineNear(deadline: string | Date, days: number = 7): boolean {
  const deadlineDate = new Date(deadline);
  const warningDate = addDays(new Date(), days);
  return isAfter(deadlineDate, new Date()) && isBefore(deadlineDate, warningDate);
}

export function isDeadlinePassed(deadline: string | Date): boolean {
  return isBefore(new Date(deadline), new Date());
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateMatchScore(
  userProfile: any,
  eligibility: any
): { score: number; matchingCriteria: string[]; missingCriteria: string[] } {
  let score = 0;
  const matchingCriteria: string[] = [];
  const missingCriteria: string[] = [];

  // Caste matching (high weight)
  if (eligibility.caste && eligibility.caste.includes(userProfile.caste)) {
    score += 25;
    matchingCriteria.push('Caste eligibility');
  } else if (eligibility.caste && !eligibility.caste.includes(userProfile.caste)) {
    missingCriteria.push('Caste requirement not met');
  }

  // Income matching (high weight)
  if (eligibility.maxFamilyIncome && userProfile.familyIncome <= eligibility.maxFamilyIncome) {
    score += 25;
    matchingCriteria.push('Income eligibility');
  } else if (eligibility.maxFamilyIncome && userProfile.familyIncome > eligibility.maxFamilyIncome) {
    missingCriteria.push('Income exceeds limit');
  }

  // Academic score matching (medium weight)
  if (eligibility.minAcademicScore && userProfile.academicScore >= eligibility.minAcademicScore) {
    score += 20;
    matchingCriteria.push('Academic performance');
  } else if (eligibility.minAcademicScore && userProfile.academicScore < eligibility.minAcademicScore) {
    missingCriteria.push('Academic score below requirement');
  }

  // Stream matching (medium weight)
  if (eligibility.requiredStream && eligibility.requiredStream.includes(userProfile.stream)) {
    score += 15;
    matchingCriteria.push('Stream/Course eligibility');
  } else if (eligibility.requiredStream && !eligibility.requiredStream.includes(userProfile.stream)) {
    missingCriteria.push('Stream/Course not eligible');
  }

  // Age matching (low weight)
  if (eligibility.minAge && eligibility.maxAge) {
    if (userProfile.age >= eligibility.minAge && userProfile.age <= eligibility.maxAge) {
      score += 10;
      matchingCriteria.push('Age eligibility');
    } else {
      missingCriteria.push('Age not within range');
    }
  }

  // Disability matching (if applicable)
  if (eligibility.disabilityRequired && userProfile.hasDisability) {
    score += 15;
    matchingCriteria.push('Disability eligibility');
  } else if (eligibility.disabilityRequired && !userProfile.hasDisability) {
    missingCriteria.push('Disability requirement not met');
  }

  // Gender matching (if applicable)
  if (eligibility.gender && eligibility.gender.includes(userProfile.gender)) {
    score += 5;
    matchingCriteria.push('Gender eligibility');
  } else if (eligibility.gender && !eligibility.gender.includes(userProfile.gender)) {
    missingCriteria.push('Gender requirement not met');
  }

  return {
    score: Math.min(score, 100), // Cap at 100%
    matchingCriteria,
    missingCriteria
  };
}

export function getConfidenceLevel(score: number): {
  level: 'high' | 'medium' | 'low';
  color: string;
  text: string;
} {
  if (score >= 80) {
    return { level: 'high', color: 'text-green-600', text: 'High Match' };
  } else if (score >= 60) {
    return { level: 'medium', color: 'text-yellow-600', text: 'Good Match' };
  } else {
    return { level: 'low', color: 'text-red-600', text: 'Low Match' };
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}