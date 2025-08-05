import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';
import { LANGUAGES } from '../utils/constants';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation keys
const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.scholarships': 'Scholarships',
    'nav.profile': 'Profile',
    'nav.applications': 'Applications',
    'nav.logout': 'Logout',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.apply': 'Apply',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.next': 'Next',
    'common.previous': 'Previous',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.phone': 'Phone Number',
    'auth.confirmPassword': 'Confirm Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.dontHaveAccount': "Don't have an account?",
    'auth.alreadyHaveAccount': 'Already have an account?',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.recommendedScholarships': 'Recommended Scholarships',
    'dashboard.upcomingDeadlines': 'Upcoming Deadlines',
    'dashboard.applicationStatus': 'Application Status',
    'dashboard.recentActivity': 'Recent Activity',
    
    // Scholarships
    'scholarships.title': 'Available Scholarships',
    'scholarships.amount': 'Amount',
    'scholarships.deadline': 'Deadline',
    'scholarships.eligibility': 'Eligibility',
    'scholarships.provider': 'Provider',
    'scholarships.category': 'Category',
    'scholarships.matchScore': 'Match Score',
    'scholarships.viewDetails': 'View Details',
    'scholarships.applyNow': 'Apply Now',
    
    // Profile
    'profile.title': 'My Profile',
    'profile.personalInfo': 'Personal Information',
    'profile.academicInfo': 'Academic Information',
    'profile.socioeconomicInfo': 'Socioeconomic Information',
    'profile.documents': 'Documents',
    'profile.age': 'Age',
    'profile.gender': 'Gender',
    'profile.institution': 'Institution',
    'profile.stream': 'Stream',
    'profile.academicScore': 'Academic Score',
    'profile.currentYear': 'Current Year',
    'profile.caste': 'Caste',
    'profile.religion': 'Religion',
    'profile.familyIncome': 'Family Income',
    'profile.hasDisability': 'Has Disability',
    'profile.district': 'District',
    'profile.uploadDocument': 'Upload Document',
    
    // Applications
    'applications.title': 'My Applications',
    'applications.status': 'Status',
    'applications.appliedOn': 'Applied On',
    'applications.lastUpdated': 'Last Updated',
    'applications.pending': 'Pending',
    'applications.approved': 'Approved',
    'applications.rejected': 'Rejected',
    'applications.expired': 'Expired',
  },
  ta: {
    // Navigation
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.scholarships': 'உதவித்தொகைகள்',
    'nav.profile': 'சுயவிவரம்',
    'nav.applications': 'விண்ணப்பங்கள்',
    'nav.logout': 'வெளியேறு',
    
    // Common
    'common.loading': 'ஏற்றுகிறது...',
    'common.save': 'சேமி',
    'common.cancel': 'ரத்து செய்',
    'common.edit': 'திருத்து',
    'common.delete': 'நீக்கு',
    'common.view': 'பார்',
    'common.apply': 'விண்ணப்பி',
    'common.search': 'தேடு',
    'common.filter': 'வடிகட்டு',
    'common.sort': 'வரிசைப்படுத்து',
    'common.next': 'அடுத்து',
    'common.previous': 'முந்தைய',
    
    // Auth
    'auth.login': 'உள்நுழை',
    'auth.register': 'பதிவு செய்',
    'auth.email': 'மின்னஞ்சல்',
    'auth.password': 'கடவுச்சொல்',
    'auth.name': 'முழு பெயர்',
    'auth.phone': 'தொலைபேசி எண்',
    'auth.confirmPassword': 'கடவுச்சொல்லை உறுதிப்படுத்து',
    'auth.forgotPassword': 'கடவுச்சொல் மறந்துவிட்டதா?',
    'auth.dontHaveAccount': 'கணக்கு இல்லையா?',
    'auth.alreadyHaveAccount': 'ஏற்கனவே கணக்கு உள்ளதா?',
    
    // Dashboard
    'dashboard.welcome': 'மீண்டும் வரவேற்கிறோம்',
    'dashboard.recommendedScholarships': 'பரிந்துரைக்கப்பட்ட உதவித்தொகைகள்',
    'dashboard.upcomingDeadlines': 'வரவிருக்கும் கடைசி தேதிகள்',
    'dashboard.applicationStatus': 'விண்ணப்ப நிலை',
    'dashboard.recentActivity': 'சமீபத்திய செயல்பாடு',
    
    // Scholarships
    'scholarships.title': 'கிடைக்கும் உதவித்தொகைகள்',
    'scholarships.amount': 'தொகை',
    'scholarships.deadline': 'கடைசி தேதி',
    'scholarships.eligibility': 'தகுதி',
    'scholarships.provider': 'வழங்குபவர்',
    'scholarships.category': 'வகை',
    'scholarships.matchScore': 'பொருத்த மதிப்பெண்',
    'scholarships.viewDetails': 'விவரங்களைப் பார்',
    'scholarships.applyNow': 'இப்போது விண்ணப்பி',
    
    // Profile
    'profile.title': 'என் சுயவிவரம்',
    'profile.personalInfo': 'தனிப்பட்ட தகவல்',
    'profile.academicInfo': 'கல்வித் தகவல்',
    'profile.socioeconomicInfo': 'சமூக பொருளாதார தகவல்',
    'profile.documents': 'ஆவணங்கள்',
    'profile.age': 'வயது',
    'profile.gender': 'பாலினம்',
    'profile.institution': 'நிறுவனம்',
    'profile.stream': 'பிரிவு',
    'profile.academicScore': 'கல்வி மதிப்பெண்',
    'profile.currentYear': 'தற்போதைய ஆண்டு',
    'profile.caste': 'சாதி',
    'profile.religion': 'மதம்',
    'profile.familyIncome': 'குடும்ப வருமானம்',
    'profile.hasDisability': 'மாற்றுத்திறன் உள்ளதா',
    'profile.district': 'மாவட்டம்',
    'profile.uploadDocument': 'ஆவணம் பதிவேற்று',
    
    // Applications
    'applications.title': 'என் விண்ணப்பங்கள்',
    'applications.status': 'நிலை',
    'applications.appliedOn': 'விண்ணப்பித்த தேதி',
    'applications.lastUpdated': 'கடைசியாக புதுப்பிக்கப்பட்டது',
    'applications.pending': 'நிலுவையில்',
    'applications.approved': 'அங்கீகரிக்கப்பட்டது',
    'applications.rejected': 'நிராகரிக்கப்பட்டது',
    'applications.expired': 'காலாவதியானது',
  }
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES.en);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'ta')) {
      setCurrentLanguage(LANGUAGES[storedLanguage]);
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language.code);
  };

  const t = (key: string): string => {
    const translation = translations[currentLanguage.code as keyof typeof translations];
    return translation[key as keyof typeof translation] || key;
  };

  const value = {
    currentLanguage,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}