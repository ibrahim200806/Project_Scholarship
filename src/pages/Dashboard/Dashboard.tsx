import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Users, Award, Bell, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Scholarship, ScholarshipMatch, Notification } from '../../types';
import { formatCurrency, formatDate, isDeadlineNear } from '../../utils/helpers';
import Card from '../../components/UI/Card';
import Badge from '../../components/UI/Badge';
import Button from '../../components/UI/Button';
import ScholarshipCard from '../../components/Scholarships/ScholarshipCard';

// Mock data
const mockScholarships: Scholarship[] = [
  {
    id: '1',
    name: 'Tamil Nadu SC/ST Merit Scholarship',
    provider: 'Government of Tamil Nadu',
    description: 'Merit-based scholarship for SC/ST students pursuing higher education in Tamil Nadu.',
    amount: 50000,
    eligibility: {
      caste: ['SC', 'ST'],
      minAcademicScore: 75,
      maxFamilyIncome: 200000,
      state: ['Tamil Nadu']
    },
    applicationDeadline: '2024-03-15',
    applicationUrl: 'https://tnscholarship.gov.in',
    category: 'caste_based',
    isActive: true,
    scrapedFrom: 'tnscholarship.gov.in',
    lastUpdated: '2024-01-15',
    requirements: ['Income Certificate', 'Caste Certificate', 'Academic Transcripts']
  },
  {
    id: '2',
    name: 'Dr. A.P.J. Abdul Kalam Scholarship',
    provider: 'Tamil Nadu Government',
    description: 'Scholarship for meritorious students from economically weaker sections.',
    amount: 75000,
    eligibility: {
      maxFamilyIncome: 150000,
      minAcademicScore: 80,
      state: ['Tamil Nadu']
    },
    applicationDeadline: '2024-02-28',
    applicationUrl: 'https://tnscholarship.gov.in/kalam',
    category: 'merit_based',
    isActive: true,
    scrapedFrom: 'tnscholarship.gov.in',
    lastUpdated: '2024-01-10',
    requirements: ['Income Certificate', 'Academic Transcripts', 'Bank Details']
  },
  {
    id: '3',
    name: 'Minority Community Education Scholarship',
    provider: 'Minority Welfare Department, TN',
    description: 'Financial assistance for minority community students in professional courses.',
    amount: 60000,
    eligibility: {
      religion: ['Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain'],
      maxFamilyIncome: 250000,
      requiredStream: ['Engineering', 'Medicine', 'Law']
    },
    applicationDeadline: '2024-04-10',
    applicationUrl: 'https://minorities.tn.gov.in/scholarship',
    category: 'income_based',
    isActive: true,
    scrapedFrom: 'minorities.tn.gov.in',
    lastUpdated: '2024-01-12',
    requirements: ['Community Certificate', 'Income Certificate', 'Admission Proof']
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'deadline_reminder',
    title: 'Application Deadline Approaching',
    message: 'Dr. A.P.J. Abdul Kalam Scholarship deadline is in 3 days',
    isRead: false,
    createdAt: '2024-01-20T10:00:00Z',
    scholarshipId: '2'
  },
  {
    id: '2',
    userId: '1',
    type: 'new_scholarship',
    title: 'New Scholarship Available',
    message: 'A new scholarship matching your profile has been added',
    isRead: false,
    createdAt: '2024-01-19T15:30:00Z',
    scholarshipId: '3'
  }
];

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [scholarships, setScholarships] = useState<ScholarshipMatch[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [stats, setStats] = useState({
    totalScholarships: 0,
    appliedScholarships: 0,
    approvedApplications: 0,
    totalAmount: 0
  });

  useEffect(() => {
    // Simulate API call to get personalized scholarships
    const loadScholarships = async () => {
      // Mock matching logic
      const matches: ScholarshipMatch[] = mockScholarships.map(scholarship => ({
        scholarship,
        confidenceScore: Math.floor(Math.random() * 40) + 60, // 60-100%
        matchingCriteria: ['Academic Performance', 'Location', 'Category'],
        missingCriteria: []
      }));
      
      setScholarships(matches);
      setStats({
        totalScholarships: mockScholarships.length,
        appliedScholarships: 2,
        approvedApplications: 1,
        totalAmount: mockScholarships.reduce((sum, s) => sum + s.amount, 0)
      });
    };

    loadScholarships();
  }, []);

  const handleApplyScholarship = (scholarshipId: string) => {
    // Check if profile is complete
    if (!user?.isProfileComplete) {
      alert('Please complete your profile before applying for scholarships.');
      return;
    }
    
    // Redirect to application or open external link
    const scholarship = scholarships.find(s => s.scholarship.id === scholarshipId);
    if (scholarship) {
      window.open(scholarship.scholarship.applicationUrl, '_blank');
    }
  };

  const handleViewDetails = (scholarshipId: string) => {
    // Navigate to scholarship details page
    console.log('View details for scholarship:', scholarshipId);
  };

  const upcomingDeadlines = scholarships.filter(s => 
    isDeadlineNear(s.scholarship.applicationDeadline)
  );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">
            {t('dashboard.welcome')}, {user?.name}!
          </h1>
          <p className="mt-1 text-secondary-600">
            Discover scholarships tailored for you
          </p>
        </div>
        
        {!user?.isProfileComplete && (
          <div className="mt-4 sm:mt-0">
            <Button variant="primary" size="sm">
              Complete Profile
            </Button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Award className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Available Scholarships</p>
              <p className="text-2xl font-bold text-secondary-900">{stats.totalScholarships}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Applications Submitted</p>
              <p className="text-2xl font-bold text-secondary-900">{stats.appliedScholarships}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Approved Applications</p>
              <p className="text-2xl font-bold text-secondary-900">{stats.approvedApplications}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Total Scholarship Value</p>
              <p className="text-2xl font-bold text-secondary-900">{formatCurrency(stats.totalAmount)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Notifications */}
      {notifications.filter(n => !n.isRead).length > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-primary-600" />
              Recent Notifications
            </h2>
            <Badge variant="info">
              {notifications.filter(n => !n.isRead).length} new
            </Badge>
          </div>
          <div className="space-y-3">
            {notifications.filter(n => !n.isRead).slice(0, 3).map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-secondary-900">{notification.title}</p>
                  <p className="text-sm text-secondary-600">{notification.message}</p>
                  <p className="text-xs text-secondary-500 mt-1">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Upcoming Deadlines */}
      {upcomingDeadlines.length > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900">
              {t('dashboard.upcomingDeadlines')}
            </h2>
            <Badge variant="warning">
              {upcomingDeadlines.length} urgent
            </Badge>
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((match) => (
              <div key={match.scholarship.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <p className="font-medium text-secondary-900">{match.scholarship.name}</p>
                  <p className="text-sm text-secondary-600">
                    Deadline: {formatDate(match.scholarship.applicationDeadline)}
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleApplyScholarship(match.scholarship.id)}
                  rightIcon={<ExternalLink className="w-3 h-3" />}
                >
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recommended Scholarships */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-secondary-900">
            {t('dashboard.recommendedScholarships')}
          </h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.slice(0, 6).map((match) => (
            <ScholarshipCard
              key={match.scholarship.id}
              scholarship={match.scholarship}
              match={match}
              onApply={handleApplyScholarship}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
}