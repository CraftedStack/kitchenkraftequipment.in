'use client';

import React, { useState, useEffect } from 'react';

// Hook to detect mobile devices
export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on mount
    checkIsMobile();

    // Add event listener
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}

// Hook to detect device type
export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  return deviceType;
}

// Component for responsive containers
interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  mobileClassName?: string;
  tabletClassName?: string;
  desktopClassName?: string;
}

export function ResponsiveContainer({
  children,
  className = '',
  mobileClassName = '',
  tabletClassName = '',
  desktopClassName = ''
}: ResponsiveContainerProps) {
  const deviceType = useDeviceType();

  const getDeviceClassName = () => {
    switch (deviceType) {
      case 'mobile':
        return mobileClassName;
      case 'tablet':
        return tabletClassName;
      case 'desktop':
        return desktopClassName;
      default:
        return '';
    }
  };

  return (
    <div className={`${className} ${getDeviceClassName()}`}>
      {children}
    </div>
  );
}

// Component for mobile-only content
export function MobileOnly({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  return isMobile ? <>{children}</> : null;
}

// Component for desktop-only content
export function DesktopOnly({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  return !isMobile ? <>{children}</> : null;
}

// Component for responsive text sizing
interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  mobileSize?: string;
  tabletSize?: string;
  desktopSize?: string;
}

export function ResponsiveText({
  children,
  className = '',
  mobileSize = 'text-sm',
  tabletSize = 'text-base',
  desktopSize = 'text-lg'
}: ResponsiveTextProps) {
  return (
    <span className={`${className} ${mobileSize} md:${tabletSize} lg:${desktopSize}`}>
      {children}
    </span>
  );
}

// Component for responsive spacing
interface ResponsiveSpacingProps {
  children: React.ReactNode;
  className?: string;
  mobilePadding?: string;
  tabletPadding?: string;
  desktopPadding?: string;
  mobileMargin?: string;
  tabletMargin?: string;
  desktopMargin?: string;
}

export function ResponsiveSpacing({
  children,
  className = '',
  mobilePadding = 'p-4',
  tabletPadding = 'p-6',
  desktopPadding = 'p-8',
  mobileMargin = 'm-2',
  tabletMargin = 'm-4',
  desktopMargin = 'm-6'
}: ResponsiveSpacingProps) {
  return (
    <div className={`
      ${className} 
      ${mobilePadding} md:${tabletPadding} lg:${desktopPadding}
      ${mobileMargin} md:${tabletMargin} lg:${desktopMargin}
    `}>
      {children}
    </div>
  );
}

// Component for responsive grid layouts
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  mobileColumns?: number;
  tabletColumns?: number;
  desktopColumns?: number;
  gap?: string;
}

export function ResponsiveGrid({
  children,
  className = '',
  mobileColumns = 1,
  tabletColumns = 2,
  desktopColumns = 3,
  gap = 'gap-4'
}: ResponsiveGridProps) {
  const getGridClassName = () => {
    const mobileClass = `grid-cols-${mobileColumns}`;
    const tabletClass = `md:grid-cols-${tabletColumns}`;
    const desktopClass = `lg:grid-cols-${desktopColumns}`;
    
    return `grid ${mobileClass} ${tabletClass} ${desktopClass} ${gap}`;
  };

  return (
    <div className={`${getGridClassName()} ${className}`}>
      {children}
    </div>
  );
}

// Utility function to get responsive classes
export function getResponsiveClasses({
  mobile = '',
  tablet = '',
  desktop = '',
  base = ''
}: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  base?: string;
}) {
  return `${base} ${mobile} md:${tablet} lg:${desktop}`.trim();
}

// Hook for responsive breakpoints
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setBreakpoint('sm');
      } else if (width < 768) {
        setBreakpoint('md');
      } else if (width < 1024) {
        setBreakpoint('lg');
      } else if (width < 1280) {
        setBreakpoint('xl');
      } else {
        setBreakpoint('2xl');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
}

// Component for responsive images
interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  mobileHeight?: string;
  tabletHeight?: string;
  desktopHeight?: string;
}

export function ResponsiveImageContainer({
  src,
  alt,
  className = '',
  mobileHeight = 'h-48',
  tabletHeight = 'h-64',
  desktopHeight = 'h-80'
}: ResponsiveImageProps) {
  return (
    <div className={`
      ${className} 
      ${mobileHeight} md:${tabletHeight} lg:${desktopHeight}
      relative overflow-hidden rounded-lg bg-gray-200
    `}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

// Mobile-optimized button component
interface MobileButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function MobileButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}: MobileButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-3 text-base min-h-[44px]',
    lg: 'px-6 py-4 text-lg min-h-[52px]'
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}

export default {
  useIsMobile,
  useDeviceType,
  useBreakpoint,
  ResponsiveContainer,
  MobileOnly,
  DesktopOnly,
  ResponsiveText,
  ResponsiveSpacing,
  ResponsiveGrid,
  ResponsiveImageContainer,
  MobileButton,
  getResponsiveClasses
};