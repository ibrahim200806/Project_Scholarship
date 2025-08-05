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
  // Personal Information
  age: number;
  gender: 'male' | 'female' | 'other';
  
  // Academic Information
  institution: string;
  stream: string;
  academicScore: number;
  currentYear: number;
  
  // Socioeconomic Information
  caste: 'SC' | 'ST' | 'OBC' | 'General';
  religion: string;
  familyIncome: number;
  hasDisability: boolean;
  disabilityType?: string;
  
  // Location
  district: string;
  state: string;
  
  // Documents
  documents: Document[];
  
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  type: 'income_certificate' | 'caste_certificate' | 'disability_certificate' | 'academic_transcript' | 'other';
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  verified: boolean;
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
  maxFamilyIncome?: number;
  minAcademicScore?: number;
  requiredStream?: string[];
  disabilityRequired?: boolean;
  gender?: string[];
  state?: string[];
  district?: string[];
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

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
}

export interface ScrapingJob {
  id: string;
  url: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  lastRun: string;
  nextRun: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  errorMessage?: string;
  scholarshipsFound: number;
}

export interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalScholarships: number;
  totalApplications: number;
  successfulApplications: number;
  popularScholarships: Scholarship[];
  userGrowth: { date: string; count: number }[];
  applicationTrends: { date: string; count: number }[];
}

export interface Language {
  code: 'en' | 'ta';
  name: string;
  nativeName: string;
}