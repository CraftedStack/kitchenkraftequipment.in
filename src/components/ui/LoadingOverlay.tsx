/**
 * Loading Overlay Component
 * Simple, reusable loading overlay for navigation and other async operations
 */

'use client';

import React from 'react';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  className?: string;
}

export function LoadingOverlay({ 
  isVisible, 
  message = 'Loading...', 
  className = '' 
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-white/80 backdrop-blur-sm z-[100000] flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-8 h-8 border-4 border-blue-200 rounded-full"></div>
        </div>
        
        {/* Message */}
        <p className="text-sm text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}

// Alternative compact spinner for inline use
export function LoadingSpinner({ 
  size = 'md', 
  className = '' 
}: { 
  size?: 'sm' | 'md' | 'lg'; 
  className?: string; 
}) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-3',
    lg: 'w-8 h-8 border-4'
  };

  return (
    <div className={`${sizeClasses[size]} border-blue-600 border-t-transparent rounded-full animate-spin ${className}`}></div>
  );
}

// Page loading component
export function PageLoader({ message = 'Loading page...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600 font-medium">{message}</p>
        <p className="text-sm text-gray-500 mt-2">Please wait a moment</p>
      </div>
    </div>
  );
}