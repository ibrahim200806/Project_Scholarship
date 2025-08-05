import React from 'react';
import { cn } from '../../utils/helpers';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'gradient';
  hover?: boolean;
}

export default function Card({ 
  children, 
  className, 
  padding = 'md', 
  variant = 'default',
  hover = true 
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const variantClasses = {
    default: 'bg-white rounded-2xl shadow-lg border border-orange-100',
    elevated: 'bg-white rounded-2xl shadow-xl border border-orange-100 transform',
    gradient: 'bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg border border-orange-200'
  };

  const hoverClasses = hover ? {
    default: 'hover:shadow-xl transition-shadow duration-300',
    elevated: 'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300',
    gradient: 'hover:shadow-xl hover:from-white hover:to-orange-100 transition-all duration-300'
  } : {
    default: '',
    elevated: '',
    gradient: ''
  };

  return (
    <div className={cn(
      variantClasses[variant],
      paddingClasses[padding],
      hoverClasses[variant],
      className
    )}>
      {children}
    </div>
  );
}