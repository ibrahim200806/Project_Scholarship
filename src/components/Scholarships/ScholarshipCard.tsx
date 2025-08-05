import React from 'react';
import { Calendar, DollarSign, Award, ExternalLink } from 'lucide-react';
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
    <Card className="hover:shadow-md transition-shadow duration-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-secondary-900 mb-1">
              {scholarship.name}
            </h3>
            <p className="text-sm text-secondary-600">{scholarship.provider}</p>
          </div>
          {match && confidenceLevel && (
            <Badge 
              variant={confidenceLevel.level === 'high' ? 'success' : confidenceLevel.level === 'medium' ? 'warning' : 'danger'}
              className="ml-2"
            >
              {match.confidenceScore}% {t('scholarships.matchScore')}
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-secondary-700 text-sm line-clamp-2">
          {scholarship.description}
        </p>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-secondary-900">
              {formatCurrency(scholarship.amount)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className={`w-4 h-4 ${isNearDeadline ? 'text-red-600' : 'text-secondary-500'}`} />
            <span className={`text-sm ${isNearDeadline ? 'text-red-600 font-medium' : 'text-secondary-700'}`}>
              {formatDate(scholarship.applicationDeadline)}
            </span>
          </div>
        </div>

        {/* Category */}
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-primary-600" />
          <Badge variant="info">
            {scholarship.category.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>

        {/* Matching Criteria (if available) */}
        {match && match.matchingCriteria.length > 0 && (
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-xs font-medium text-green-800 mb-1">Matching Criteria:</p>
            <div className="flex flex-wrap gap-1">
              {match.matchingCriteria.slice(0, 3).map((criteria, index) => (
                <Badge key={index} variant="success" size="sm">
                  {criteria}
                </Badge>
              ))}
              {match.matchingCriteria.length > 3 && (
                <Badge variant="success" size="sm">
                  +{match.matchingCriteria.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3 pt-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={() => onApply?.(scholarship.id)}
          >
            {t('scholarships.applyNow')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(scholarship.id)}
            rightIcon={<ExternalLink className="w-3 h-3" />}
          >
            {t('scholarships.viewDetails')}
          </Button>
        </div>

        {/* Deadline Warning */}
        {isNearDeadline && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-800 text-xs font-medium">
              ⚠️ Deadline approaching! Apply soon to avoid missing out.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}