/**
 * Simple Header Component
 * Clean navigation without dropdowns, with loading states
 */

'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { COMPANY_INFO } from '@/lib/constants';
import { MobileMenu } from './MobileMenu';

// Simple navigation structure without dropdowns
const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle navigation with proper transition state
  const handleNavigation = (href: string, e: React.MouseEvent) => {
    // Don't show loading for same page or external links
    if (href === pathname || href.startsWith('http')) {
      return;
    }

    e.preventDefault();
    
    // Use React 18 transition for proper loading state management
    startTransition(() => {
      router.push(href);
    });
  };

  const isActiveLink = (href: string) => {
    if (!isMounted) return false;
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Static button class to prevent hydration mismatch
  const buttonClass = "bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md";

  return (
    <>
      {/* Loading Overlay */}
      {isPending && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100000] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-3 z-10"
              onClick={(e) => handleNavigation('/', e)}
            >
              <Image
                src="/imgs/logo.png"
                alt={COMPANY_INFO.name}
                width={32}
                height={32}
                className="w-7 h-7 lg:w-8 lg:h-8"
                priority
              />
              <div className="hidden sm:block">
                <h1 className="text-base lg:text-lg font-bold text-gray-900">
                  Kitchen Kraft
                </h1>
                <p className="text-xs text-gray-600 -mt-0.5">
                  Equipments
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {isMounted ? NAVIGATION.map((item) => {
                const isActive = isActiveLink(item.href);
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavigation(item.href, e)}
                    className={
                      isActive
                        ? 'px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg relative group text-blue-600 bg-blue-50'
                        : 'px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg relative group text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }
                  >
                    {item.name}
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                    )}
                  </Link>
                );
              }) : (
                // Server-side fallback - render without active states
                NAVIGATION.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg relative group text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))
              )}
            </nav>

            {/* Contact Info & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {COMPANY_INFO.contact.phone}
                </div>
                <div className="text-xs text-gray-600">
                  Call for Quote
                </div>
              </div>
              <Link
                href="/contact"
                onClick={(e) => handleNavigation('/contact', e)}
                className={buttonClass}
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              aria-label="Open mobile menu"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
        isMounted={isMounted}
        navigation={NAVIGATION}
      />

      {/* Header Spacer */}
      <div className="h-14 lg:h-16" />
    </>
  );
}