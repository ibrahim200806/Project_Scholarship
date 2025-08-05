import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import Card from '../../components/UI/Card';
import Badge from '../../components/UI/Badge';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalScholarships: 1247,
    activeScholarships: 892,
    totalUsers: 15420,
    activeUsers: 8934,
    pendingApplications: 234,
    captchaErrors: 12,
    successfulScrapes: 98.5,
    totalAmount: 50000000
  });

  const recentActivity = [
    {
      id: 1,
      type: 'scholarship_added',
      message: 'New scholarship "Tamil Nadu Merit Award" added',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'captcha_error',
      message: 'CAPTCHA error on tnscholarship.gov.in',
      timestamp: '15 minutes ago',
      status: 'error'
    },
    {
      id: 3,
      type: 'user_registered',
      message: '5 new users registered',
      timestamp: '1 hour ago',
      status: 'info'
    },
    {
      id: 4,
      type: 'scraping_completed',
      message: 'Scraping completed for 15 websites',
      timestamp: '2 hours ago',
      status: 'success'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'scholarship_added':
        return <Award className="w-4 h-4 text-green-600" />;
      case 'captcha_error':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'user_registered':
        return <Users className="w-4 h-4 text-blue-600" />;
      case 'scraping_completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="success">Success</Badge>;
      case 'error':
        return <Badge variant="danger">Error</Badge>;
      case 'info':
        return <Badge variant="info">Info</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Monitor and manage the scholarship platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-violet-500 to-violet-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-violet-100 text-sm">Total Scholarships</p>
              <p className="text-3xl font-bold">{stats.totalScholarships.toLocaleString()}</p>
              <p className="text-violet-100 text-xs mt-1">
                {stats.activeScholarships} active
              </p>
            </div>
            <Award className="w-12 h-12 text-violet-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-black to-gray-800 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Total Users</p>
              <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-gray-300 text-xs mt-1">
                {stats.activeUsers} active
              </p>
            </div>
            <Users className="w-12 h-12 text-gray-400" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Success Rate</p>
              <p className="text-3xl font-bold">{stats.successfulScrapes}%</p>
              <p className="text-green-100 text-xs mt-1">
                Scraping success
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">CAPTCHA Errors</p>
              <p className="text-3xl font-bold">{stats.captchaErrors}</p>
              <p className="text-red-100 text-xs mt-1">
                Need attention
              </p>
            </div>
            <AlertTriangle className="w-12 h-12 text-red-200" />
          </div>
        </Card>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <Badge variant="info">{recentActivity.length} items</Badge>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.timestamp}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {getActivityBadge(activity.status)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg hover:from-violet-100 hover:to-violet-200 transition-colors group">
              <Award className="w-8 h-8 text-violet-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-violet-900">Add Scholarship</p>
            </button>
            
            <button className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-gray-100 hover:to-gray-200 transition-colors group">
              <Users className="w-8 h-8 text-gray-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-gray-900">Manage Users</p>
            </button>
            
            <button className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg hover:from-red-100 hover:to-red-200 transition-colors group">
              <AlertTriangle className="w-8 h-8 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-red-900">Fix CAPTCHA</p>
            </button>
            
            <button className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-colors group">
              <TrendingUp className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-green-900">View Analytics</p>
            </button>
          </div>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">System Status</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900">Web Scraping</h3>
            <p className="text-sm text-gray-600 mt-1">All systems operational</p>
            <Badge variant="success" className="mt-2">Online</Badge>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-medium text-gray-900">Database</h3>
            <p className="text-sm text-gray-600 mt-1">Minor delays detected</p>
            <Badge variant="warning" className="mt-2">Slow</Badge>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-medium text-gray-900">CAPTCHA Solver</h3>
            <p className="text-sm text-gray-600 mt-1">12 sites need attention</p>
            <Badge variant="danger" className="mt-2">Issues</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}