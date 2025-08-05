import React, { useState } from 'react';
import { User, GraduationCap, Home, FileText, Save, Upload } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { DISTRICTS_TN, STREAMS, CASTES, RELIGIONS, DOCUMENT_TYPES } from '../../utils/constants';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';

interface ProfileFormData {
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
  disabilityType: string;
  
  // Location
  district: string;
}

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    age: 20,
    gender: 'male',
    institution: '',
    stream: '',
    academicScore: 0,
    currentYear: 1,
    caste: 'General',
    religion: '',
    familyIncome: 0,
    hasDisability: false,
    disabilityType: '',
    district: ''
  });

  const [documents, setDocuments] = useState([
    { type: 'income_certificate', fileName: 'income_cert.pdf', verified: true },
    { type: 'academic_transcript', fileName: 'transcript.pdf', verified: false }
  ]);

  const tabs = [
    { id: 'personal', name: t('profile.personalInfo'), icon: User },
    { id: 'academic', name: t('profile.academicInfo'), icon: GraduationCap },
    { id: 'socioeconomic', name: t('profile.socioeconomicInfo'), icon: Home },
    { id: 'documents', name: t('profile.documents'), icon: FileText }
  ];

  const handleInputChange = (field: keyof ProfileFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user profile completion status
      updateUser({ isProfileComplete: true });
      
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (documentType: string, file: File) => {
    // Simulate file upload
    const newDocument = {
      type: documentType,
      fileName: file.name,
      verified: false
    };
    
    setDocuments(prev => [...prev, newDocument]);
  };

  const calculateProfileCompletion = () => {
    const requiredFields = [
      'age', 'gender', 'institution', 'stream', 'academicScore', 
      'currentYear', 'caste', 'religion', 'familyIncome', 'district'
    ];
    
    const completedFields = requiredFields.filter(field => {
      const value = formData[field as keyof ProfileFormData];
      return value !== '' && value !== 0;
    });
    
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const completionPercentage = calculateProfileCompletion();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">
            {t('profile.title')}
          </h1>
          <p className="mt-1 text-secondary-600">
            Complete your profile to get personalized scholarship recommendations
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-secondary-600">Profile Completion</p>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-secondary-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-secondary-900">
                {completionPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card padding="none">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                        : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            {/* Personal Information */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-secondary-900">
                  {t('profile.personalInfo')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {t('profile.age')}
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                      className="input-field"
                      min="16"
                      max="35"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {t('profile.gender')}
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="input-field"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {t('profile.district')}
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select District</option>
                      {DISTRICTS_TN.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Academic Information */}
            {activeTab === 'academic' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-secondary-900">
                  {t('profile.academicInfo')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {t('profile.institution')}
                    </label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => handleInputChange('institution', e.target.value)}
                      className="input-field"
                      placeholder="Enter your institution name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {t('profile.stream')}
                    </label>
                    <select
                      value={formData.stream}
                      onChange={(e) => handleInputChange('stream', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select Stream</option>
                      {STREAMS.map(stream => (
                        <option key={stream} value={stream}>{stream}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {t('profile.currentYear')}
                    </label>
                    <select
                      value={formData.currentYear}
                      onChange={(e) => handleInputChange('currentYear', parseInt(e.target.value))}
                      className="input-field"
                    >
                      <option value={1}>1st Year</option>
                      <option value={2}>2nd Year</option>
                      <option value={3}>3rd Year</option>
                      <option value={4}>4th Year</option>
                      <option value={5}>5th Year</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {t('profile.academicScore')} (Percentage/CGPA)
                    </label>
                    <input
                      type="number"
                      value={formData.academicScore}
                      onChange={(e) => handleInputChange('academicScore', parseFloat(e.target.value))}
                      className="input-field"
                      min="0"
                      max="100"
                      step="0.1"
                      placeholder="Enter your academic score"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Socioeconomic Information */}
            {activeTab === 'socioeconomic' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-secondary-900">
                  {t('profile.socioeconomicInfo')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {t('profile.caste')}
                    </label>
                    <select
                      value={formData.caste}
                      onChange={(e) => handleInputChange('caste', e.target.value)}
                      className="input-field"
                    >
                      {CASTES.map(caste => (
                        <option key={caste} value={caste}>{caste}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {t('profile.religion')}
                    </label>
                    <select
                      value={formData.religion}
                      onChange={(e) => handleInputChange('religion', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select Religion</option>
                      {RELIGIONS.map(religion => (
                        <option key={religion} value={religion}>{religion}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {t('profile.familyIncome')} (Annual in ₹)
                    </label>
                    <input
                      type="number"
                      value={formData.familyIncome}
                      onChange={(e) => handleInputChange('familyIncome', parseInt(e.target.value))}
                      className="input-field"
                      min="0"
                      placeholder="Enter annual family income"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="hasDisability"
                        checked={formData.hasDisability}
                        onChange={(e) => handleInputChange('hasDisability', e.target.checked)}
                        className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="hasDisability" className="text-sm font-medium text-secondary-700">
                        {t('profile.hasDisability')}
                      </label>
                    </div>
                    
                    {formData.hasDisability && (
                      <div className="mt-3">
                        <input
                          type="text"
                          value={formData.disabilityType}
                          onChange={(e) => handleInputChange('disabilityType', e.target.value)}
                          className="input-field"
                          placeholder="Specify disability type"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Documents */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-secondary-900">
                  {t('profile.documents')}
                </h3>
                
                {/* Uploaded Documents */}
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-secondary-400" />
                        <div>
                          <p className="text-sm font-medium text-secondary-900">
                            {DOCUMENT_TYPES[doc.type as keyof typeof DOCUMENT_TYPES]}
                          </p>
                          <p className="text-xs text-secondary-600">{doc.fileName}</p>
                        </div>
                      </div>
                      <Badge variant={doc.verified ? 'success' : 'warning'}>
                        {doc.verified ? 'Verified' : 'Pending'}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                {/* Upload New Document */}
                <div className="border-2 border-dashed border-secondary-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-secondary-400 mx-auto mb-2" />
                  <p className="text-sm text-secondary-600 mb-4">
                    Upload additional documents to support your scholarship applications
                  </p>
                  <input
                    type="file"
                    id="document-upload"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload('other', file);
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('document-upload')?.click()}
                  >
                    {t('profile.uploadDocument')}
                  </Button>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-secondary-200">
              <Button
                variant="primary"
                onClick={handleSave}
                isLoading={isLoading}
                leftIcon={<Save className="w-4 h-4" />}
              >
                {t('common.save')} Profile
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}