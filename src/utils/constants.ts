export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English'
  },
  ta: {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்'
  }
} as const;

export const DISTRICTS_TN = [
  'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri',
  'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur',
  'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal',
  'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet',
  'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi',
  'Tiruchirappalli', 'Tirunelveli', 'Tirupattur', 'Tiruppur', 'Tiruvallur',
  'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'
];

export const STREAMS = [
  'Science', 'Commerce', 'Arts', 'Engineering', 'Medicine', 'Law',
  'Agriculture', 'Veterinary', 'Pharmacy', 'Nursing', 'Education',
  'Fine Arts', 'Music', 'Dance', 'Literature'
];

export const CASTES = ['SC', 'ST', 'OBC', 'General'] as const;

export const RELIGIONS = [
  'Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'
];

export const DOCUMENT_TYPES = {
  income_certificate: 'Income Certificate',
  caste_certificate: 'Caste Certificate',
  disability_certificate: 'Disability Certificate',
  academic_transcript: 'Academic Transcript',
  other: 'Other'
} as const;

export const SCHOLARSHIP_CATEGORIES = {
  merit_based: 'Merit Based',
  income_based: 'Income Based',
  caste_based: 'Caste Based',
  disability_based: 'Disability Based',
  general: 'General'
} as const;

export const APPLICATION_STATUS = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  expired: 'Expired'
} as const;

export const NOTIFICATION_TYPES = {
  deadline_reminder: 'Deadline Reminder',
  application_update: 'Application Update',
  new_scholarship: 'New Scholarship',
  document_required: 'Document Required'
} as const;