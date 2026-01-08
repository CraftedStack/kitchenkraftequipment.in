'use client';

import React, { useState } from 'react';

interface TouchFeedbackProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  as?: 'button' | 'div' | 'a';
  haptic?: boolean;
}

export function TouchFeedback({ 
  children, 
  className = '', 
  disabled = false, 
  onClick,
  href,
  as = 'div',
  haptic = true
}: TouchFeedbackProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleTouchStart = () => {
    if (disabled) return;
    setIsPressed(true);
    
    // Add haptic feedback on supported devices
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(10); // Very light vibration
    }
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    onClick?.(e);
  };

  const baseClasses = `
    ${className}
    ${!disabled ? 'cursor-pointer select-none' : 'cursor-not-allowed opacity-50'}
    ${!disabled && isPressed ? 'transform scale-95' : ''}
    transition-transform duration-150 ease-out
    ${!disabled ? 'active:scale-95' : ''}
  `.trim();

  const commonProps = {
    className: baseClasses,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleTouchStart,
    onMouseUp: handleTouchEnd,
    onMouseLeave: handleTouchEnd,
    onClick: handleClick,
  };

  if (as === 'button') {
    return (
      <button
        {...commonProps}
        disabled={disabled}
        type="button"
      >
        {children}
      </button>
    );
  }

  if (as === 'a' && href) {
    return (
      <a
        {...commonProps}
        href={href}
      >
        {children}
      </a>
    );
  }

  return (
    <div {...commonProps}>
      {children}
    </div>
  );
}

// Specialized components for common use cases
export function TouchButton({ 
  children, 
  className = '', 
  ...props 
}: Omit<TouchFeedbackProps, 'as'>) {
  return (
    <TouchFeedback 
      as="button" 
      className={`
        inline-flex items-center justify-center
        min-h-[44px] min-w-[44px]
        px-4 py-2 rounded-lg
        font-medium text-center
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {children}
    </TouchFeedback>
  );
}

export function TouchCard({ 
  children, 
  className = '', 
  ...props 
}: Omit<TouchFeedbackProps, 'as'>) {
  return (
    <TouchFeedback 
      className={`
        bg-white rounded-lg shadow-md
        hover:shadow-lg transition-shadow duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </TouchFeedback>
  );
}