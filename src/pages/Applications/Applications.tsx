import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Application, Scholarship } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatDate, formatCurrency } from '../../utils/helpers';
import Card from '../../components/UI/Card';
import Badge from '../../components/UI/Badge';
import Button from '../../components/UI/Button';

// Mock data
const mockApplications: (Application & { scholarship: Scholarship })[] = [
  {
    id: '1',
    userId: '1',
    scholarshipId: '1',
    status: 'approved',
    appliedAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    notes: 'Congratulations! Your application has been approved.',
    scholarship: {
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
    }
  },
  {
    id: '2',
    userId: '1',
    scholarshipId: '2',
    status: 'pending',
    appliedAt: '2024-01-18T09:15:00Z',
    updatedAt: '2024-01-18T09:15:00Z',
    scholarship: {
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
    }
  },
  {
    id: '3',
    userId: '1',
    scholarshipId: '3',
    status: 'rejected',
    appliedAt: '2024-01-05T16:20:00Z',
    updatedAt: '2024-01-12T11:45:00Z',
    notes: 'Application rejected due to incomplete documentation. Please reapply with all required documents.',
    scholarship: {
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
  }
];

export default function Applications() {
  const { t } = useLanguage();
  const [applications, setApplications] = useState<(Application & { scholarship: Scholarship })[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'expired'>('all');

  useEffect(() => {
    setApplications(mockApplications);
  }, []);

  const filteredApplications = applications.filter(app => 
    filter === 'all' || app.status === filter
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'expired':
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">{t('applications.approved')}</Badge>;
      case 'rejected':
        return <Badge variant="danger">{t('applications.rejected')}</Badge>;
      case 'expired':
        return <Badge variant="default">{t('applications.expired')}</Badge>;
      default:
        return <Badge variant="warning">{t('applications.pending')}</Badge>;
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">
          {t('applications.title')}
        </h1>
        <p className="mt-1 text-secondary-600">
          Track the status of your scholarship applications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary-900">{stats.total}</p>
            <p className="text-sm text-secondary-600">Total Applications</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-secondary-600">Pending</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            <p className="text-sm text-secondary-600">Approved</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-sm text-secondary-600">Rejected</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'approved', 'rejected', 'expired'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(status as any)}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => (
            <Card key={application.id}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(application.status)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                        {application.scholarship.name}
                      </h3>
                      <p className="text-sm text-secondary-600 mb-2">
                        {application.scholarship.provider}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Applied: {formatDate(application.appliedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Updated: {formatDate(application.updatedAt)}</span>
                        </div>
                        <div className="font-medium text-secondary-900">
                          {formatCurrency(application.scholarship.amount)}
                        </div>
                      </div>
                      {application.notes && (
                        <div className={`mt-3 p-3 rounded-lg text-sm ${
                          application.status === 'approved' 
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : application.status === 'rejected'
                            ? 'bg-red-50 text-red-800 border border-red-200'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}>
                          {application.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {getStatusBadge(application.status)}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(application.scholarship.applicationUrl, '_blank')}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center py-12">
            <div className="text-secondary-400 mb-4">
              <Calendar className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">
              No applications found
            </h3>
            <p className="text-secondary-600 mb-4">
              {filter === 'all' 
                ? "You haven't applied for any scholarships yet"
                : `No ${filter} applications found`
              }
            </p>
            <Button variant="primary">
              Browse Scholarships
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}