import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, TrendingUp, Shield, Globe, BookOpen } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';

export default function LandingPage() {
  const { t, currentLanguage, setLanguage } = useLanguage();

  const features = [
    {
      icon: Award,
      title: 'AI-Powered Matching',
      description: 'Get personalized scholarship recommendations based on your profile and eligibility criteria.',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Users,
      title: 'Comprehensive Database',
      description: 'Access thousands of scholarships from government and private organizations across Tamil Nadu.',
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Updates',
      description: 'Stay updated with the latest scholarship opportunities and application deadlines.',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your personal information is encrypted and protected with industry-standard security.',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Scholarships' },
    { number: '50,000+', label: 'Students Helped' },
    { number: '₹500Cr+', label: 'Scholarships Awarded' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-violet-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-black rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">SF</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-black bg-clip-text text-transparent">
                Scholarship Finder
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(currentLanguage.code === 'en' ? { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' } : { code: 'en', name: 'English', nativeName: 'English' })}
                className="flex items-center space-x-1 text-violet-600 hover:text-violet-800 p-2 rounded-lg hover:bg-violet-50"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{currentLanguage.nativeName}</span>
              </button>
              
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-violet-600 to-black bg-clip-text text-transparent">
                    Unlock Your
                  </span>
                  <br />
                  <span className="text-black">
                    Educational Dreams
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Discover thousands of scholarships tailored for Tamil Nadu students. 
                  Our AI-powered platform matches you with the perfect opportunities 
                  to fund your education.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-black hover:from-violet-700 hover:to-gray-900"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Start Your Journey
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto border-violet-300 text-violet-700 hover:bg-violet-50"
                >
                  Learn More
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-violet-600">10K+</div>
                  <div className="text-sm text-gray-600">Scholarships</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-violet-600">50K+</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-violet-600">₹500Cr+</div>
                  <div className="text-sm text-gray-600">Awarded</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-black rounded-3xl transform rotate-3"></div>
              <img
                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Students studying"
                className="relative rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-black rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">95% Success Rate</div>
                    <div className="text-sm text-gray-600">Students get scholarships</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="bg-gradient-to-r from-violet-600 to-black bg-clip-text text-transparent">Scholarship Finder</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with comprehensive scholarship data 
              to give you the best chance of securing educational funding.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute -bottom-4 left-4 w-8 h-8 bg-gradient-to-r from-violet-600 to-black rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Thousands of Students
            </h2>
            <p className="text-xl text-violet-100">
              Join the community of successful scholarship recipients
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-violet-200 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-violet-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Ready to Find Your Perfect Scholarship?
              </h2>
              <p className="text-xl text-gray-600">
                Create your profile today and get matched with scholarships 
                that fit your unique background and goals.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-black hover:from-violet-700 hover:to-gray-900"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Create Free Account
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto border-violet-300 text-violet-700 hover:bg-violet-50"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-white rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">SF</span>
                </div>
                <span className="text-lg font-bold">Scholarship Finder</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering Tamil Nadu students through technology-driven scholarship discovery.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Find Scholarships</a></li>
                <li><a href="#" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Scholarship Finder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}