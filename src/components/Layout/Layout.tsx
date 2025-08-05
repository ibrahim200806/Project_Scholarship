import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 tamil-pattern">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      
      {/* Footer with Tamil Nadu Government branding */}
      <footer className="bg-gradient-to-r from-orange-600 to-red-700 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">TN</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Government of Tamil Nadu</h3>
                <p className="text-sm opacity-90">Scholarship Portal</p>
              </div>
            </div>
            <p className="text-sm opacity-80">
              Empowering Tamil Nadu students through technology-driven scholarship discovery
            </p>
            <p className="text-xs opacity-70 mt-2">
              © 2024 Government of Tamil Nadu. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}