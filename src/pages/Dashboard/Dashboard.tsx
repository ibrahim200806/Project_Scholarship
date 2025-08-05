import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Users, Award, Bell, ExternalLink, Star, Clock, MapPin } from 'lucide-react';
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
      {/* Hero Welcome Section */}
      <Card variant="gradient" className="hero-gradient text-white border-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center float-animation">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  {t('dashboard.welcome')}, {user?.name}!
                </h1>
                <p className="text-lg opacity-90 tamil-text">
                  வணக்கம்! உங்கள் கல்வி கனவுகளை நனவாக்க உதவித்தொகைகளை கண்டறியுங்கள்
                </p>
              </div>
            </div>
            <p className="text-white opacity-90 text-lg">
              Discover scholarships tailored specifically for Tamil Nadu students
            </p>
          </div>
          
          {!user?.isProfileComplete && (
            <div className="mt-6 lg:mt-0">
              <Button variant="secondary" size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                <User className="w-5 h-5 mr-2" />
                Complete Profile
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="elevated" className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <Award className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-secondary-900 mb-2">{stats.totalScholarships}</p>
          <p className="text-sm font-medium text-secondary-600">Available Scholarships</p>
          <div className="mt-2">
            <Badge variant="info" className="text-xs">Updated Today</Badge>
          </div>
        </Card>

        <Card variant="elevated" className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-secondary-900 mb-2">{stats.appliedScholarships}</p>
          <p className="text-sm font-medium text-secondary-600">Applications Submitted</p>
          <div className="mt-2">
            <Badge variant="warning" className="text-xs">2 Pending</Badge>
          </div>
        </Card>

        <Card variant="elevated" className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-secondary-900 mb-2">{stats.approvedApplications}</p>
          <p className="text-sm font-medium text-secondary-600">Approved Applications</p>
          <div className="mt-2">
            <Badge variant="success" className="text-xs">1 Approved</Badge>
          </div>
        </Card>

        <Card variant="elevated" className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Calendar className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold text-secondary-900 mb-2">{formatCurrency(stats.totalAmount)}</p>
          <p className="text-sm font-medium text-secondary-600">Total Scholarship Value</p>
          <div className="mt-2">
            <Badge variant="info" className="text-xs">Available</Badge>
          </div>
        </Card>
      </div>

      {/* Enhanced Notifications */}
      {notifications.filter(n => !n.isRead).length > 0 && (
        <Card variant="elevated" className="border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-secondary-900 flex items-center">
              <Bell className="w-6 h-6 mr-3 text-orange-600" />
              Recent Notifications
            </h2>
            <Badge variant="danger" className="pulse-orange">
              {notifications.filter(n => !n.isRead).length} new
            </Badge>
          </div>
          <div className="space-y-4">
            {notifications.filter(n => !n.isRead).slice(0, 3).map((notification) => (
              <div key={notification.id} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 pulse-orange"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-secondary-900">{notification.title}</p>
                  <p className="text-sm text-secondary-700 mt-1">{notification.message}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <p className="text-xs text-secondary-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDate(notification.createdAt)}
                    </p>
                    <Button variant="ghost" size="sm" className="text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Enhanced Upcoming Deadlines */}
      {upcomingDeadlines.length > 0 && (
        <Card variant="elevated" className="border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-secondary-900 flex items-center">
              <Clock className="w-6 h-6 mr-3 text-red-600" />
              {t('dashboard.upcomingDeadlines')}
            </h2>
            <Badge variant="danger" className="animate-pulse">
              {upcomingDeadlines.length} urgent
            </Badge>
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map((match) => (
              <div key={match.scholarship.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary-900">{match.scholarship.name}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm text-secondary-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Deadline: {formatDate(match.scholarship.applicationDeadline)}
                      </p>
                      <p className="text-sm font-semibold text-green-600">
                        {formatCurrency(match.scholarship.amount)}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleApplyScholarship(match.scholarship.id)}
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                  className="pulse-orange"
                >
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Enhanced Recommended Scholarships */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-secondary-900 flex items-center">
              <Star className="w-7 h-7 mr-3 text-orange-600" />
              {t('dashboard.recommendedScholarships')}
            </h2>
            <p className="text-secondary-600 mt-1">Scholarships matched to your profile</p>
          </div>
          <Button variant="outline" size="md">
            View All Scholarships
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Quick Actions */}
      <Card variant="gradient" className="text-center">
        <h3 className="text-xl font-bold text-secondary-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="primary" size="lg" fullWidth>
            <Award className="w-5 h-5 mr-2" />
            Browse All Scholarships
          </Button>
          <Button variant="secondary" size="lg" fullWidth>
            <User className="w-5 h-5 mr-2" />
            Update Profile
          </Button>
          <Button variant="outline" size="lg" fullWidth>
            <Bell className="w-5 h-5 mr-2" />
            View Applications
          </Button>
        </div>
      </Card>
    </div>
  );
}