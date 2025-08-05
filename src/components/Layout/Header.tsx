import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, User, Globe, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { LANGUAGES } from '../../utils/constants';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { currentLanguage, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navigation = [
    { name: t('nav.dashboard'), href: '/dashboard' },
    { name: t('nav.scholarships'), href: '/scholarships' },
    { name: t('nav.applications'), href: '/applications' },
    { name: t('nav.profile'), href: '/profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg border-b-4 border-orange-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Government Badge */}
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="tn-emblem">
                <Award className="w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-secondary-900">
                  Scholarship Finder
                </span>
                <span className="text-xs text-orange-600 font-medium">
                  Government of Tamil Nadu
                </span>
              </div>
            </Link>
            <div className="govt-badge hidden sm:block">
              Official Portal
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-orange-500 to-red-600 shadow-lg'
                    : 'text-secondary-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-2 text-secondary-600 hover:text-orange-600 p-2 rounded-xl hover:bg-orange-50 transition-all duration-200"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium tamil-text">
                  {currentLanguage.nativeName}
                </span>
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 z-50 border border-orange-100">
                  <div className="py-2">
                    {Object.values(LANGUAGES).map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang);
                          setIsLanguageMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-3 text-sm hover:bg-orange-50 transition-colors ${
                          currentLanguage.code === lang.code
                            ? 'text-orange-600 bg-orange-50 font-semibold'
                            : 'text-secondary-700'
                        }`}
                      >
                        <span className="tamil-text">{lang.nativeName}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="relative p-3 text-secondary-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full pulse-orange"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-3 p-2 text-secondary-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden md:block text-sm font-medium">{user?.name}</span>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 z-50 border border-orange-100">
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-orange-100">
                      <p className="text-sm font-semibold text-secondary-900">{user?.name}</p>
                      <p className="text-xs text-secondary-600">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm text-secondary-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.profile')}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-secondary-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-orange-100 py-4">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-white bg-gradient-to-r from-orange-500 to-red-600 shadow-lg'
                      : 'text-secondary-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}