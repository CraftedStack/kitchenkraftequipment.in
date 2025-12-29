/**
 * Mobile Menu Component
 * Responsive mobile navigation with slide-out menu
 */

'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { COMPANY_INFO } from '@/lib/constants';

interface NavigationItem {
  name: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  isMounted?: boolean;
  navigation: NavigationItem[];
}

export function MobileMenu({ 
  isOpen, 
  onClose, 
  pathname, 
  isMounted = true, 
  navigation
}: MobileMenuProps) {
  // Ensure navigation is always an array
  const safeNavigation = navigation || [];
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActiveLink = (href: string) => {
    if (!isMounted) return false;
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    onClose();
    // Simple navigation without loading state for mobile
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-50 transition-opacity lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-xl z-50 transform transition-transform lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link 
              href="/" 
              onClick={(e) => handleNavClick('/', e)} 
              className="flex items-center space-x-3"
            >
              <Image
                src="/imgs/logo.png"
                alt={COMPANY_INFO.name}
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Kitchen Kraft
                </h2>
                <p className="text-xs text-gray-600 -mt-1">
                  Equipments
                </p>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Close mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {safeNavigation.map((item) => (
              <div key={item.name} className="px-4 mb-2">
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={cn(
                    'flex items-center justify-between py-4 px-4 rounded-lg text-base font-medium transition-colors',
                    isActiveLink(item.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  )}
                >
                  <span>{item.name}</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="border-t border-gray-200 p-4 space-y-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {COMPANY_INFO.contact.phone}
              </div>
              <div className="text-sm text-gray-600">
                Call for Quote
              </div>
            </div>
            
            <Link
              href="/contact"
              onClick={(e) => handleNavClick('/contact', e)}
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Quote
            </Link>

            <div className="text-center text-xs text-gray-500">
              <div>{COMPANY_INFO.contact.hours.display}</div>
              <div className="mt-1">{COMPANY_INFO.contact.address.city}, {COMPANY_INFO.contact.address.state}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}