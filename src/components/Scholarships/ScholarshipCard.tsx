import React from 'react';
import { Calendar, DollarSign, Award, ExternalLink, MapPin, Users, Star } from 'lucide-react';
import { Scholarship, ScholarshipMatch } from '../../types';
import { formatCurrency, formatDate, isDeadlineNear, getConfidenceLevel } from '../../utils/helpers';
import { useLanguage } from '../../contexts/LanguageContext';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  match?: ScholarshipMatch;
  onApply?: (scholarshipId: string) => void;
  onViewDetails?: (scholarshipId: string) => void;
}

export default function ScholarshipCard({ 
  scholarship, 
  match, 
  onApply, 
  onViewDetails 
}: ScholarshipCardProps) {
  const { t } = useLanguage();
  const isNearDeadline = isDeadlineNear(scholarship.applicationDeadline);
  const confidenceLevel = match ? getConfidenceLevel(match.confidenceScore) : null;

  return (
    <Card variant="elevated" className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-orange-500">
      <div className="space-y-6">
        {/* Header with Provider Badge */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className="govt-badge text-xs">
                Official
              </div>
            </div>
            <h3 className="text-lg font-bold text-secondary-900 mb-2 leading-tight">
              {scholarship.name}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-secondary-500" />
              <p className="text-sm text-secondary-600 font-medium">{scholarship.provider}</p>
            </div>
          </div>
          {match && confidenceLevel && (
            <div className="ml-3">
              <Badge 
                variant={confidenceLevel.level === 'high' ? 'success' : confidenceLevel.level === 'medium' ? 'warning' : 'danger'}
                className="text-xs font-bold"
              >
                <Star className="w-3 h-3 mr-1" />
                {match.confidenceScore}%
              </Badge>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-secondary-700 text-sm leading-relaxed line-clamp-3">
          {scholarship.description}
        </p>

        {/* Key Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
            <DollarSign className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-xs text-green-600 font-medium">Amount</p>
              <p className="text-sm font-bold text-green-800">
                {formatCurrency(scholarship.amount)}
              </p>
            </div>
          </div>
          <div className={`flex items-center space-x-3 p-3 rounded-xl ${
            isNearDeadline ? 'bg-red-50' : 'bg-blue-50'
          }`}>
            <Calendar className={`w-5 h-5 ${isNearDeadline ? 'text-red-600' : 'text-blue-600'}`} />
            <div>
              <p className={`text-xs font-medium ${isNearDeadline ? 'text-red-600' : 'text-blue-600'}`}>
                Deadline
              </p>
              <p className={`text-sm font-bold ${isNearDeadline ? 'text-red-800' : 'text-blue-800'}`}>
                {formatDate(scholarship.applicationDeadline, 'MMM dd')}
              </p>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="flex items-center justify-center">
          <Badge variant="info" className="px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            {scholarship.category.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>

        {/* Matching Criteria (if available) */}
        {match && match.matchingCriteria.length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
            <p className="text-xs font-bold text-green-800 mb-2 flex items-center">
              <Star className="w-3 h-3 mr-1" />
              Why you match:
            </p>
            <div className="flex flex-wrap gap-2">
              {match.matchingCriteria.slice(0, 3).map((criteria, index) => (
                <Badge key={index} variant="success" size="sm" className="text-xs">
                  {criteria}
                </Badge>
              ))}
              {match.matchingCriteria.length > 3 && (
                <Badge variant="success" size="sm" className="text-xs">
                  +{match.matchingCriteria.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            onClick={() => onApply?.(scholarship.id)}
          >
            {t('scholarships.applyNow')}
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => onViewDetails?.(scholarship.id)}
            rightIcon={<ExternalLink className="w-4 h-4" />}
          >
            Details
          </Button>
        </div>

        {/* Deadline Warning */}
        {isNearDeadline && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-red-800 text-sm font-bold">
                  ⚠️ Deadline Approaching!
                </p>
                <p className="text-red-700 text-xs">
                  Apply soon to avoid missing out on this opportunity.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}