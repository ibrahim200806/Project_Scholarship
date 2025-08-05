import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  ExternalLink, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Scholarship } from '../../types';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';

interface AdminScholarship extends Scholarship {
  scrapingStatus: 'success' | 'error' | 'pending';
  lastScrapedAt: string;
  errorMessage?: string;
}

export default function AdminScholarships() {
  const [scholarships, setScholarships] = useState<AdminScholarship[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<AdminScholarship[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'error'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState<AdminScholarship | null>(null);

  // Mock data
  const mockScholarships: AdminScholarship[] = [
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
      requirements: ['Income Certificate', 'Caste Certificate', 'Academic Transcripts'],
      scrapingStatus: 'success',
      lastScrapedAt: '2024-01-15T10:30:00Z'
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
      requirements: ['Income Certificate', 'Academic Transcripts', 'Bank Details'],
      scrapingStatus: 'error',
      lastScrapedAt: '2024-01-20T08:15:00Z',
      errorMessage: 'CAPTCHA verification required'
    },
    {
      id: '3',
      name: 'Women in STEM Scholarship',
      provider: 'Tamil Nadu Science Foundation',
      description: 'Encouraging women to pursue careers in Science, Technology, Engineering, and Mathematics.',
      amount: 40000,
      eligibility: {
        gender: ['female'],
        requiredStream: ['Science', 'Engineering'],
        minAcademicScore: 70
      },
      applicationDeadline: '2024-05-20',
      applicationUrl: 'https://tnscience.gov.in/women-stem',
      category: 'merit_based',
      isActive: false,
      scrapedFrom: 'tnscience.gov.in',
      lastUpdated: '2024-01-18',
      requirements: ['Academic Transcripts', 'Gender Certificate', 'Course Enrollment Proof'],
      scrapingStatus: 'pending',
      lastScrapedAt: '2024-01-18T14:20:00Z'
    }
  ];

  useEffect(() => {
    setScholarships(mockScholarships);
    setFilteredScholarships(mockScholarships);
  }, []);

  useEffect(() => {
    let filtered = scholarships.filter(scholarship =>
      scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (statusFilter !== 'all') {
      if (statusFilter === 'active') {
        filtered = filtered.filter(s => s.isActive);
      } else if (statusFilter === 'inactive') {
        filtered = filtered.filter(s => !s.isActive);
      } else if (statusFilter === 'error') {
        filtered = filtered.filter(s => s.scrapingStatus === 'error');
      }
    }

    setFilteredScholarships(filtered);
  }, [scholarships, searchTerm, statusFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="success">Success</Badge>;
      case 'error':
        return <Badge variant="danger">Error</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const handleRescrape = (scholarshipId: string) => {
    // Simulate re-scraping
    setScholarships(prev => prev.map(s => 
      s.id === scholarshipId 
        ? { ...s, scrapingStatus: 'pending' as const, lastScrapedAt: new Date().toISOString() }
        : s
    ));
    
    // Simulate completion after 2 seconds
    setTimeout(() => {
      setScholarships(prev => prev.map(s => 
        s.id === scholarshipId 
          ? { ...s, scrapingStatus: 'success' as const, errorMessage: undefined }
          : s
      ));
    }, 2000);
  };

  const handleToggleActive = (scholarshipId: string) => {
    setScholarships(prev => prev.map(s => 
      s.id === scholarshipId ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const handleDelete = (scholarshipId: string) => {
    if (confirm('Are you sure you want to delete this scholarship?')) {
      setScholarships(prev => prev.filter(s => s.id !== scholarshipId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scholarship Management</h1>
          <p className="mt-1 text-gray-600">
            Manage and monitor all scholarships in the system
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowAddModal(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-violet-600 to-black hover:from-violet-700 hover:to-gray-900"
        >
          Add Scholarship
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{scholarships.length}</p>
            <p className="text-sm text-gray-600">Total Scholarships</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {scholarships.filter(s => s.isActive).length}
            </p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {scholarships.filter(s => s.scrapingStatus === 'error').length}
            </p>
            <p className="text-sm text-gray-600">Errors</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-violet-600">
              {formatCurrency(scholarships.reduce((sum, s) => sum + s.amount, 0))}
            </p>
            <p className="text-sm text-gray-600">Total Value</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="error">Errors</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Scholarships Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scholarship
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scraping
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredScholarships.map((scholarship) => (
                <tr key={scholarship.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {scholarship.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {scholarship.provider}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Source: {scholarship.scrapedFrom}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(scholarship.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(scholarship.applicationDeadline)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={scholarship.isActive ? 'success' : 'default'}>
                      {scholarship.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(scholarship.scrapingStatus)}
                      {getStatusBadge(scholarship.scrapingStatus)}
                    </div>
                    {scholarship.errorMessage && (
                      <div className="text-xs text-red-600 mt-1">
                        {scholarship.errorMessage}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      Last: {formatDate(scholarship.lastScrapedAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => window.open(scholarship.applicationUrl, '_blank')}
                        className="text-violet-600 hover:text-violet-900"
                        title="View Original"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRescrape(scholarship.id)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Re-scrape"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingScholarship(scholarship)}
                        className="text-gray-600 hover:text-gray-900"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleActive(scholarship.id)}
                        className={`${scholarship.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                        title={scholarship.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {scholarship.isActive ? '⏸️' : '▶️'}
                      </button>
                      <button
                        onClick={() => handleDelete(scholarship.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Manual Add Scholarship Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Scholarship</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Scholarship Name
                  </label>
                  <input type="text" className="input-field" placeholder="Enter scholarship name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Provider
                  </label>
                  <input type="text" className="input-field" placeholder="Enter provider name" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea className="input-field" rows={3} placeholder="Enter description"></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (₹)
                  </label>
                  <input type="number" className="input-field" placeholder="Enter amount" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Application Deadline
                  </label>
                  <input type="date" className="input-field" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application URL
                </label>
                <input type="url" className="input-field" placeholder="Enter application URL" />
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="bg-gradient-to-r from-violet-600 to-black hover:from-violet-700 hover:to-gray-900"
                >
                  Add Scholarship
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}