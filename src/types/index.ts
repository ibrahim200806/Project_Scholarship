export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  isProfileComplete: boolean;
  createdAt: string;
  profile?: StudentProfile;
}

export interface StudentProfile {
  id: string;
  userId: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  institution: string;
  stream: string;
  academicScore: number;
  currentYear: number;
  caste: 'SC' | 'ST' | 'OBC' | 'General';
  religion: string;
  familyIncome: number;
  hasDisability: boolean;
  disabilityType?: string;
  district: string;
  state: string;
  documents: Document[];
  createdAt: string;
  updatedAt: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  description: string;
  amount: number;
  eligibility: EligibilityCriteria;
  applicationDeadline: string;
  applicationUrl: string;
  category: 'merit_based' | 'income_based' | 'caste_based' | 'disability_based' | 'general';
  isActive: boolean;
  scrapedFrom: string;
  lastUpdated: string;
  requirements: string[];
}

export interface EligibilityCriteria {
  minAge?: number;
  maxAge?: number;
  caste?: string[];
  religion?: string[];
  gender?: string[];
  minAcademicScore?: number;
  maxFamilyIncome?: number;
  requiredStream?: string[];
  state?: string[];
  district?: string[];
  disabilityRequired?: boolean;
}

export interface ScholarshipMatch {
  scholarship: Scholarship;
  confidenceScore: number;
  matchingCriteria: string[];
  missingCriteria: string[];
}

export interface Application {
  id: string;
  userId: string;
  scholarshipId: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  appliedAt: string;
  updatedAt: string;
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'deadline_reminder' | 'application_update' | 'new_scholarship' | 'document_required';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  scholarshipId?: string;
}

export interface Document {
  id: string;
  userId: string;
  type: string;
  fileName: string;
  fileUrl: string;
  isVerified: boolean;
  uploadedAt: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}