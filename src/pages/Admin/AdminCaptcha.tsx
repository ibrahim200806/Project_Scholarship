import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  RefreshCw, 
  CheckCircle, 
  ExternalLink, 
  Clock,
  XCircle,
  Eye,
  Settings
} from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';

interface CaptchaError {
  id: string;
  website: string;
  url: string;
  errorType: 'captcha' | 'cloudflare' | 'rate_limit' | 'blocked';
  errorMessage: string;
  firstOccurred: string;
  lastAttempt: string;
  attemptCount: number;
  status: 'pending' | 'resolved' | 'ignored';
  priority: 'high' | 'medium' | 'low';
  scholarshipCount: number;
  screenshot?: string;
}

export default function AdminCaptcha() {
  const [captchaErrors, setCaptchaErrors] = useState<CaptchaError[]>([]);
  const [selectedError, setSelectedError] = useState<CaptchaError | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved' | 'ignored'>('all');

  // Mock data
  const mockCaptchaErrors: CaptchaError[] = [
    {
      id: '1',
      website: 'tnscholarship.gov.in',
      url: 'https://tnscholarship.gov.in/scholarships',
      errorType: 'captcha',
      errorMessage: 'reCAPTCHA verification required',
      firstOccurred: '2024-01-20T08:30:00Z',
      lastAttempt: '2024-01-20T14:15:00Z',
      attemptCount: 15,
      status: 'pending',
      priority: 'high',
      scholarshipCount: 25,
      screenshot: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      website: 'minorities.tn.gov.in',
      url: 'https://minorities.tn.gov.in/scholarship-list',
      errorType: 'cloudflare',
      errorMessage: 'Cloudflare protection detected',
      firstOccurred: '2024-01-19T16:20:00Z',
      lastAttempt: '2024-01-20T10:45:00Z',
      attemptCount: 8,
      status: 'pending',
      priority: 'medium',
      scholarshipCount: 12,
      screenshot: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      website: 'tnscience.gov.in',
      url: 'https://tnscience.gov.in/scholarships',
      errorType: 'rate_limit',
      errorMessage: 'Too many requests - rate limited',
      firstOccurred: '2024-01-18T12:00:00Z',
      lastAttempt: '2024-01-20T09:30:00Z',
      attemptCount: 22,
      status: 'resolved',
      priority: 'low',
      scholarshipCount: 8
    },
    {
      id: '4',
      website: 'bcwelfare.tn.gov.in',
      url: 'https://bcwelfare.tn.gov.in/schemes',
      errorType: 'blocked',
      errorMessage: 'IP address blocked by server',
      firstOccurred: '2024-01-17T14:30:00Z',
      lastAttempt: '2024-01-20T11:20:00Z',
      attemptCount: 35,
      status: 'pending',
      priority: 'high',
      scholarshipCount: 18
    }
  ];

  useEffect(() => {
    setCaptchaErrors(mockCaptchaErrors);
  }, []);

  const filteredErrors = captchaErrors.filter(error => 
    filter === 'all' || error.status === filter
  );

  const getErrorTypeIcon = (type: string) => {
    switch (type) {
      case 'captcha':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'cloudflare':
        return <XCircle className="w-5 h-5 text-orange-600" />;
      case 'rate_limit':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'blocked':
        return <XCircle className="w-5 h-5 text-red-800" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getErrorTypeBadge = (type: string) => {
    switch (type) {
      case 'captcha':
        return <Badge variant="danger">CAPTCHA</Badge>;
      case 'cloudflare':
        return <Badge variant="warning">Cloudflare</Badge>;
      case 'rate_limit':
        return <Badge variant="info">Rate Limit</Badge>;
      case 'blocked':
        return <Badge variant="danger">Blocked</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="danger">High</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium</Badge>;
      case 'low':
        return <Badge variant="info">Low</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolved</Badge>;
      case 'ignored':
        return <Badge variant="default">Ignored</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const handleRetry = (errorId: string) => {
    setCaptchaErrors(prev => prev.map(error => 
      error.id === errorId 
        ? { 
            ...error, 
            lastAttempt: new Date().toISOString(),
            attemptCount: error.attemptCount + 1
          }
        : error
    ));
  };

  const handleStatusChange = (errorId: string, newStatus: 'pending' | 'resolved' | 'ignored') => {
    setCaptchaErrors(prev => prev.map(error => 
      error.id === errorId ? { ...error, status: newStatus } : error
    ));
  };

  const stats = {
    total: captchaErrors.length,
    pending: captchaErrors.filter(e => e.status === 'pending').length,
    resolved: captchaErrors.filter(e => e.status === 'resolved').length,
    high: captchaErrors.filter(e => e.priority === 'high').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">CAPTCHA & Scraping Issues</h1>
        <p className="mt-1 text-gray-600">
          Monitor and resolve web scraping challenges
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Issues</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
            <p className="text-sm text-gray-600">Resolved</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{stats.high}</p>
            <p className="text-sm text-gray-600">High Priority</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            {['all', 'pending', 'resolved', 'ignored'].map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter(status as any)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Settings className="w-4 h-4" />}
          >
            Configure
          </Button>
        </div>
      </Card>

      {/* Errors List */}
      <div className="space-y-4">
        {filteredErrors.map((error) => (
          <Card key={error.id}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="flex-shrink-0 mt-1">
                  {getErrorTypeIcon(error.errorType)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {error.website}
                    </h3>
                    {getErrorTypeBadge(error.errorType)}
                    {getPriorityBadge(error.priority)}
                    {getStatusBadge(error.status)}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {error.errorMessage}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                    <div>
                      <span className="font-medium">First Occurred:</span>
                      <br />
                      {formatDate(error.firstOccurred)}
                    </div>
                    <div>
                      <span className="font-medium">Last Attempt:</span>
                      <br />
                      {formatDate(error.lastAttempt)}
                    </div>
                    <div>
                      <span className="font-medium">Attempts:</span>
                      <br />
                      {error.attemptCount}
                    </div>
                    <div>
                      <span className="font-medium">Affected Scholarships:</span>
                      <br />
                      {error.scholarshipCount}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedError(error)}
                  leftIcon={<Eye className="w-4 h-4" />}
                >
                  Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(error.url, '_blank')}
                  leftIcon={<ExternalLink className="w-4 h-4" />}
                >
                  Visit
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleRetry(error.id)}
                  leftIcon={<RefreshCw className="w-4 h-4" />}
                  className="bg-gradient-to-r from-violet-600 to-black hover:from-violet-700 hover:to-gray-900"
                >
                  Retry
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Error Details Modal */}
      {selectedError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Error Details - {selectedError.website}
              </h2>
              <button
                onClick={() => setSelectedError(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Error Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Error Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Website</label>
                      <p className="text-sm text-gray-900">{selectedError.website}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">URL</label>
                      <p className="text-sm text-gray-900 break-all">{selectedError.url}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Error Type</label>
                      {getErrorTypeBadge(selectedError.errorType)}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Priority</label>
                      {getPriorityBadge(selectedError.priority)}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      {getStatusBadge(selectedError.status)}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Error Message</label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                        {selectedError.errorMessage}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">Attempt Count</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedError.attemptCount}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">Affected Scholarships</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedError.scholarshipCount}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screenshot */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Screenshot</h3>
                {selectedError.screenshot ? (
                  <img
                    src={selectedError.screenshot}
                    alt="Error screenshot"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-100 rounded-lg border flex items-center justify-center">
                    <p className="text-gray-500">No screenshot available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-6 border-t mt-6">
              <div className="flex space-x-2">
                <Button
                  variant={selectedError.status === 'resolved' ? 'outline' : 'primary'}
                  size="sm"
                  onClick={() => {
                    const newStatus = selectedError.status === 'resolved' ? 'pending' : 'resolved';
                    handleStatusChange(selectedError.id, newStatus);
                    setSelectedError({ ...selectedError, status: newStatus });
                  }}
                  leftIcon={<CheckCircle className="w-4 h-4" />}
                >
                  {selectedError.status === 'resolved' ? 'Mark as Pending' : 'Mark as Resolved'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleStatusChange(selectedError.id, 'ignored');
                    setSelectedError({ ...selectedError, status: 'ignored' });
                  }}
                >
                  Ignore
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedError(null)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleRetry(selectedError.id)}
                  leftIcon={<RefreshCw className="w-4 h-4" />}
                  className="bg-gradient-to-r from-violet-600 to-black hover:from-violet-700 hover:to-gray-900"
                >
                  Retry Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}