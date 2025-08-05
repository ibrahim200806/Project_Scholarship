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