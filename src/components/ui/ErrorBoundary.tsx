/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */

'use client';

import React from 'react';
import { ErrorBoundaryState, BaseComponentProps } from '@/lib/types';

interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
  hasError: boolean;
}

// Default error fallback component
const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  resetError 
}) => (
  <div className="min-h-[400px] flex items-center justify-center p-8">
    <div className="text-center max-w-md">
      <div className="mb-4">
        <svg
          className="mx-auto h-12 w-12 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Something went wrong
      </h2>
      
      <p className="text-gray-600 mb-4">
        We encountered an error while loading this content. Please try again.
      </p>
      
      {process.env.NODE_ENV === 'development' && (
        <details className="text-left mb-4 p-3 bg-gray-100 rounded text-sm">
          <summary className="cursor-pointer font-medium">Error Details</summary>
          <pre className="mt-2 whitespace-pre-wrap text-red-600">
            {error.message}
          </pre>
        </details>
      )}
      
      <button
        onClick={resetError}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

// Product-specific error fallback
export const ProductErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  resetError 
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
    <div className="mb-4">
      <svg
        className="mx-auto h-8 w-8 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    </div>
    
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      Failed to load product
    </h3>
    
    <p className="text-gray-600 mb-4">
      Unable to display this product. Please try refreshing the page.
    </p>
    
    <button
      onClick={resetError}
      className="text-blue-600 hover:text-blue-800 font-medium"
    >
      Retry
    </button>
  </div>
);

// API error fallback
export const APIErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  resetError 
}) => (
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <svg
          className="h-5 w-5 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-yellow-800">
          Connection Error
        </h3>
        <div className="mt-2 text-sm text-yellow-700">
          <p>Unable to connect to our servers. Please check your internet connection.</p>
        </div>
        <div className="mt-4">
          <button
            onClick={resetError}
            className="bg-yellow-100 px-3 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  </div>
);

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Update state with error info
    this.setState({
      hasError: true,
      error,
      errorInfo
    });

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Integrate with error reporting service (e.g., Sentry)
      console.error('Production error:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      });
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      
      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
          hasError={this.state.hasError}
        />
      );
    }

    return this.props.children;
  }
}

// Hook for functional components to handle errors
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const handleError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { handleError, resetError };
};

// Higher-order component for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<ErrorFallbackProps>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

export default ErrorBoundary;