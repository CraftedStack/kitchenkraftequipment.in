/**
 * Loading Spinner and Loading State Components
 * Provides consistent loading indicators across the application
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { BaseComponentProps } from '@/lib/types';

// Basic spinner component
interface SpinnerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  className 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    gray: 'text-gray-400'
  };

  return (
    <svg
      className={cn(
        'animate-spin',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

// Loading button component
interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  spinnerSize?: 'sm' | 'md';
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText = 'Loading...',
  spinnerSize = 'sm',
  children,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors',
        'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {loading && (
        <Spinner
          size={spinnerSize}
          color="white"
          className="mr-2"
        />
      )}
      {loading ? loadingText : children}
    </button>
  );
};

// Full page loading component
interface PageLoadingProps extends BaseComponentProps {
  message?: string;
}

export const PageLoading: React.FC<PageLoadingProps> = ({ 
  message = 'Loading...',
  className 
}) => {
  return (
    <div className={cn(
      'min-h-screen flex items-center justify-center bg-gray-50',
      className
    )}>
      <div className="text-center">
        <Spinner size="xl" className="mb-4" />
        <p className="text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );
};

// Section loading component
interface SectionLoadingProps extends BaseComponentProps {
  message?: string;
  height?: string;
}

export const SectionLoading: React.FC<SectionLoadingProps> = ({ 
  message = 'Loading...',
  height = 'h-64',
  className 
}) => {
  return (
    <div className={cn(
      'flex items-center justify-center',
      height,
      className
    )}>
      <div className="text-center">
        <Spinner size="lg" className="mb-3" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

// Skeleton loading components
interface SkeletonProps extends BaseComponentProps {
  width?: string;
  height?: string;
  rounded?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = 'w-full',
  height = 'h-4',
  rounded = false,
  className
}) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-300',
        width,
        height,
        rounded ? 'rounded-full' : 'rounded',
        className
      )}
    />
  );
};

// Product card skeleton
export const ProductCardSkeleton: React.FC<BaseComponentProps> = ({ className }) => {
  return (
    <div className={cn('bg-white border border-gray-200 rounded-lg p-4', className)}>
      <Skeleton height="h-48" className="mb-4" />
      <Skeleton height="h-6" width="w-3/4" className="mb-2" />
      <Skeleton height="h-4" width="w-1/2" className="mb-3" />
      <Skeleton height="h-10" width="w-full" />
    </div>
  );
};

// Product grid skeleton
interface ProductGridSkeletonProps extends BaseComponentProps {
  count?: number;
}

export const ProductGridSkeleton: React.FC<ProductGridSkeletonProps> = ({ 
  count = 6,
  className 
}) => {
  return (
    <div className={cn(
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      className
    )}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Text skeleton for content
export const TextSkeleton: React.FC<BaseComponentProps> = ({ className }) => {
  return (
    <div className={cn('space-y-3', className)}>
      <Skeleton height="h-4" width="w-full" />
      <Skeleton height="h-4" width="w-5/6" />
      <Skeleton height="h-4" width="w-4/5" />
      <Skeleton height="h-4" width="w-3/4" />
    </div>
  );
};

// Category card skeleton
export const CategoryCardSkeleton: React.FC<BaseComponentProps> = ({ className }) => {
  return (
    <div className={cn('bg-white rounded-lg shadow-md overflow-hidden', className)}>
      <Skeleton height="h-32" />
      <div className="p-4">
        <Skeleton height="h-5" width="w-3/4" className="mb-2" />
        <Skeleton height="h-4" width="w-full" className="mb-1" />
        <Skeleton height="h-4" width="w-2/3" />
      </div>
    </div>
  );
};

// Hero section skeleton
export const HeroSkeleton: React.FC<BaseComponentProps> = ({ className }) => {
  return (
    <div className={cn('bg-gray-100', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <Skeleton height="h-12" width="w-3/4" className="mx-auto mb-6" />
          <Skeleton height="h-6" width="w-2/3" className="mx-auto mb-4" />
          <Skeleton height="h-6" width="w-1/2" className="mx-auto mb-8" />
          <div className="flex justify-center space-x-4">
            <Skeleton height="h-12" width="w-32" />
            <Skeleton height="h-12" width="w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading overlay for forms and modals
interface LoadingOverlayProps extends BaseComponentProps {
  visible: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message = 'Loading...',
  className,
  children
}) => {
  return (
    <div className={cn('relative', className)}>
      {children}
      {visible && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="text-center">
            <Spinner size="lg" className="mb-3" />
            <p className="text-gray-600">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline loading component for small sections
interface InlineLoadingProps extends BaseComponentProps {
  size?: 'sm' | 'md';
  message?: string;
}

export const InlineLoading: React.FC<InlineLoadingProps> = ({
  size = 'sm',
  message,
  className
}) => {
  return (
    <div className={cn('flex items-center', className)}>
      <Spinner size={size} className="mr-2" />
      {message && <span className="text-gray-600 text-sm">{message}</span>}
    </div>
  );
};

// Loading state hook
export const useLoading = (initialState: boolean = false) => {
  const [loading, setLoading] = React.useState(initialState);

  const startLoading = React.useCallback(() => setLoading(true), []);
  const stopLoading = React.useCallback(() => setLoading(false), []);
  const toggleLoading = React.useCallback(() => setLoading(prev => !prev), []);

  return {
    loading,
    startLoading,
    stopLoading,
    toggleLoading,
    setLoading
  };
};