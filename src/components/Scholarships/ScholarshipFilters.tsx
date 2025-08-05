import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { SCHOLARSHIP_CATEGORIES, CASTES, DISTRICTS_TN } from '../../utils/constants';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../UI/Button';
import Card from '../UI/Card';

interface FilterOptions {
  category: string[];
  caste: string[];
  district: string[];
  minAmount: number;
  maxAmount: number;
  deadlineRange: string;
}

interface ScholarshipFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

export default function ScholarshipFilters({ 
  filters, 
  onFiltersChange, 
  onClearFilters 
}: ScholarshipFiltersProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleArrayFilterChange = (key: keyof FilterOptions, value: string, checked: boolean) => {
    const currentArray = filters[key] as string[];
    if (checked) {
      handleFilterChange(key, [...currentArray, value]);
    } else {
      handleFilterChange(key, currentArray.filter(item => item !== value));
    }
  };

  const activeFiltersCount = Object.values(filters).reduce((count, value) => {
    if (Array.isArray(value)) {
      return count + value.length;
    }
    if (typeof value === 'number' && value > 0) {
      return count + 1;
    }
    if (typeof value === 'string' && value) {
      return count + 1;
    }
    return count;
  }, 0);

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        leftIcon={<Filter className="w-4 h-4" />}
        rightIcon={activeFiltersCount > 0 && (
          <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      >
        {t('common.filter')}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 z-50">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-secondary-900">Filters</h3>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                >
                  Clear All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('scholarships.category')}
                </label>
                <div className="space-y-2">
                  {Object.entries(SCHOLARSHIP_CATEGORIES).map(([key, label]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(key)}
                        onChange={(e) => handleArrayFilterChange('category', key, e.target.checked)}
                        className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-secondary-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Caste Filter */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('profile.caste')}
                </label>
                <div className="space-y-2">
                  {CASTES.map((caste) => (
                    <label key={caste} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.caste.includes(caste)}
                        onChange={(e) => handleArrayFilterChange('caste', caste, e.target.checked)}
                        className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-secondary-700">{caste}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* District Filter */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('profile.district')}
                </label>
                <select
                  multiple
                  value={filters.district}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value);
                    handleFilterChange('district', values);
                  }}
                  className="input-field h-32"
                >
                  {DISTRICTS_TN.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Range */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('scholarships.amount')} Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min Amount"
                    value={filters.minAmount || ''}
                    onChange={(e) => handleFilterChange('minAmount', parseInt(e.target.value) || 0)}
                    className="input-field"
                  />
                  <input
                    type="number"
                    placeholder="Max Amount"
                    value={filters.maxAmount || ''}
                    onChange={(e) => handleFilterChange('maxAmount', parseInt(e.target.value) || 0)}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Deadline Range */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('scholarships.deadline')} Range
                </label>
                <select
                  value={filters.deadlineRange}
                  onChange={(e) => handleFilterChange('deadlineRange', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Deadlines</option>
                  <option value="7">Next 7 days</option>
                  <option value="30">Next 30 days</option>
                  <option value="90">Next 3 months</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}