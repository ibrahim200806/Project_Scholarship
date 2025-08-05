import React, { useState, useEffect } from 'react';
import { Search, SortAsc, SortDesc } from 'lucide-react';
import { Scholarship, ScholarshipMatch } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { calculateMatchScore } from '../../utils/helpers';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import ScholarshipCard from '../../components/Scholarships/ScholarshipCard';
import ScholarshipFilters from '../../components/Scholarships/ScholarshipFilters';

// Mock data (same as Dashboard)
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
  },
  {
    id: '4',
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
    isActive: true,
    scrapedFrom: 'tnscience.gov.in',
    lastUpdated: '2024-01-18',
    requirements: ['Academic Transcripts', 'Gender Certificate', 'Course Enrollment Proof']
  },
  {
    id: '5',
    name: 'Disability Support Scholarship',
    provider: 'Department of Differently Abled Welfare, TN',
    description: 'Financial assistance for students with disabilities pursuing higher education.',
    amount: 55000,
    eligibility: {
      disabilityRequired: true,
      maxFamilyIncome: 300000
    },
    applicationDeadline: '2024-06-15',
    applicationUrl: 'https://cms.tn.gov.in/disability-scholarship',
    category: 'disability_based',
    isActive: true,
    scrapedFrom: 'cms.tn.gov.in',
    lastUpdated: '2024-01-20',
    requirements: ['Disability Certificate', 'Income Certificate', 'Medical Reports']
  },
  {
    id: '6',
    name: 'Rural Development Scholarship',
    provider: 'Rural Development Department, TN',
    description: 'Supporting students from rural areas to access quality higher education.',
    amount: 35000,
    eligibility: {
      maxFamilyIncome: 180000,
      district: ['Dharmapuri', 'Krishnagiri', 'Salem', 'Namakkal']
    },
    applicationDeadline: '2024-07-30',
    applicationUrl: 'https://rural.tn.gov.in/scholarship',
    category: 'income_based',
    isActive: true,
    scrapedFrom: 'rural.tn.gov.in',
    lastUpdated: '2024-01-22',
    requirements: ['Income Certificate', 'Residence Proof', 'Academic Records']
  }
];

interface FilterOptions {
  category: string[];
  caste: string[];
  district: string[];
  minAmount: number;
  maxAmount: number;
  deadlineRange: string;
}

export default function ScholarshipsList() {
  const { t } = useLanguage();
  const [scholarships, setScholarships] = useState<ScholarshipMatch[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<ScholarshipMatch[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'amount' | 'deadline'>('relevance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState<FilterOptions>({
    category: [],
    caste: [],
    district: [],
    minAmount: 0,
    maxAmount: 0,
    deadlineRange: ''
  });

  // Mock user profile for matching
  const mockUserProfile = {
    caste: 'SC',
    familyIncome: 180000,
    academicScore: 85,
    stream: 'Engineering',
    age: 20,
    gender: 'male',
    hasDisability: false,
    district: 'Chennai'
  };

  useEffect(() => {
    // Calculate matches for all scholarships
    const matches: ScholarshipMatch[] = mockScholarships.map(scholarship => {
      const matchResult = calculateMatchScore(mockUserProfile, scholarship.eligibility);
      return {
        scholarship,
        confidenceScore: matchResult.score,
        matchingCriteria: matchResult.matchingCriteria,
        missingCriteria: matchResult.missingCriteria
      };
    });

    setScholarships(matches);
    setFilteredScholarships(matches);
  }, []);

  useEffect(() => {
    let filtered = [...scholarships];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(match =>
        match.scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(match =>
        filters.category.includes(match.scholarship.category)
      );
    }

    // Apply caste filter
    if (filters.caste.length > 0) {
      filtered = filtered.filter(match =>
        !match.scholarship.eligibility.caste ||
        match.scholarship.eligibility.caste.some(caste => filters.caste.includes(caste))
      );
    }

    // Apply district filter
    if (filters.district.length > 0) {
      filtered = filtered.filter(match =>
        !match.scholarship.eligibility.district ||
        match.scholarship.eligibility.district.some(district => filters.district.includes(district))
      );
    }

    // Apply amount filter
    if (filters.minAmount > 0) {
      filtered = filtered.filter(match => match.scholarship.amount >= filters.minAmount);
    }
    if (filters.maxAmount > 0) {
      filtered = filtered.filter(match => match.scholarship.amount <= filters.maxAmount);
    }

    // Apply deadline filter
    if (filters.deadlineRange) {
      const days = parseInt(filters.deadlineRange);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() + days);
      
      filtered = filtered.filter(match =>
        new Date(match.scholarship.applicationDeadline) <= cutoffDate
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'relevance':
          comparison = b.confidenceScore - a.confidenceScore;
          break;
        case 'amount':
          comparison = b.scholarship.amount - a.scholarship.amount;
          break;
        case 'deadline':
          comparison = new Date(a.scholarship.applicationDeadline).getTime() - 
                      new Date(b.scholarship.applicationDeadline).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? -comparison : comparison;
    });

    setFilteredScholarships(filtered);
  }, [scholarships, searchTerm, filters, sortBy, sortOrder]);

  const handleApplyScholarship = (scholarshipId: string) => {
    const scholarship = scholarships.find(s => s.scholarship.id === scholarshipId);
    if (scholarship) {
      window.open(scholarship.scholarship.applicationUrl, '_blank');
    }
  };

  const handleViewDetails = (scholarshipId: string) => {
    console.log('View details for scholarship:', scholarshipId);
  };

  const handleClearFilters = () => {
    setFilters({
      category: [],
      caste: [],
      district: [],
      minAmount: 0,
      maxAmount: 0,
      deadlineRange: ''
    });
    setSearchTerm('');
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">
          {t('scholarships.title')}
        </h1>
        <p className="mt-1 text-secondary-600">
          Discover scholarships that match your profile
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-secondary-400" />
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

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <ScholarshipFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
            />

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="input-field text-sm"
              >
                <option value="relevance">Relevance</option>
                <option value="amount">Amount</option>
                <option value="deadline">Deadline</option>
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleSort}
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-secondary-600">
          Showing {filteredScholarships.length} of {scholarships.length} scholarships
        </p>
        {(searchTerm || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f > 0)) && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            Clear all filters
          </Button>
        )}
      </div>

      {/* Scholarships Grid */}
      {filteredScholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((match) => (
            <ScholarshipCard
              key={match.scholarship.id}
              scholarship={match.scholarship}
              match={match}
              onApply={handleApplyScholarship}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <div className="text-secondary-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-secondary-900 mb-2">
            No scholarships found
          </h3>
          <p className="text-secondary-600 mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear filters
          </Button>
        </Card>
      )}
    </div>
  );
}