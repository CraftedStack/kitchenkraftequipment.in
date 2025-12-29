'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaChevronDown, FaChevronRight, FaSearch, FaPhone, FaWhatsapp } from 'react-icons/fa';

interface NavigationItem {
  name: string;
  href: string;
  dropdown?: NavigationItem[];
}

interface MobileNavigationProps {
  navigationItems: NavigationItem[];
  className?: string;
}

export default function MobileNavigation({ navigationItems, className = '' }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setExpandedItems(new Set());
  }, [pathname]);

  // Prevent body scroll when menu is open
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

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  const isActiveLink = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors ${className}`}
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`
        fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white">
          <div className="flex items-center space-x-3">
            <img
              src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/logo1-removebg-preview+(1).png"
              alt="Kitchen Kraft"
              className="h-8 w-auto"
            />
            <div>
              <h2 className="font-bold text-sm">Kitchen Kraft</h2>
              <p className="text-xs opacity-90">Commercial Kitchen Solutions</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Close menu"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600"
              aria-label="Search"
            >
              <FaSearch size={16} />
            </button>
          </form>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="py-2">
            {navigationItems.map((item) => (
              <li key={item.name}>
                {item.dropdown ? (
                  <>
                    {/* Expandable Item */}
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors
                        ${isActiveLink(item.href) ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'}
                      `}
                    >
                      <span className="font-medium">{item.name}</span>
                      <FaChevronDown 
                        className={`transform transition-transform ${
                          expandedItems.has(item.name) ? 'rotate-180' : ''
                        }`}
                        size={14}
                      />
                    </button>
                    
                    {/* Dropdown Items */}
                    {expandedItems.has(item.name) && (
                      <ul className="bg-gray-50">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className={`
                                flex items-center px-8 py-3 text-sm hover:bg-gray-100 transition-colors
                                ${isActiveLink(subItem.href) ? 'text-blue-600 font-medium' : 'text-gray-600'}
                              `}
                              onClick={() => setIsOpen(false)}
                            >
                              <FaChevronRight size={12} className="mr-2 opacity-50" />
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  /* Regular Item */
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-4 py-3 hover:bg-gray-50 transition-colors
                      ${isActiveLink(item.href) ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600 font-medium' : 'text-gray-700'}
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Actions */}
        <div className="border-t border-gray-200 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Contact</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:+918830696290"
              className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <FaPhone className="mr-2" size={14} />
              Call Now
            </a>
            
            <a
              href="https://wa.me/918830696290?text=Hi, I am interested in your commercial kitchen equipment. Please provide more information."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <FaWhatsapp className="mr-2" size={14} />
              WhatsApp
            </a>
          </div>

          <Link
            href="/contact"
            className="block w-full text-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            Get Quote
          </Link>
        </div>

        {/* Footer Info */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="text-xs text-gray-600 space-y-1">
            <p className="font-medium">Kitchen Kraft Equipments</p>
            <p>Commercial Kitchen Solutions</p>
            <p>📞 +91 8830696290</p>
            <p>📧 indiakitchenkraft@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
}

// Mobile-optimized breadcrumb component
export function MobileBreadcrumbs({ 
  items 
}: { 
  items: Array<{ name: string; href?: string }> 
}) {
  if (items.length <= 1) return null;

  return (
    <nav className="lg:hidden px-4 py-2 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center space-x-2 text-sm overflow-x-auto">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <FaChevronRight className="text-gray-400 flex-shrink-0" size={10} />
            )}
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-blue-600 hover:text-blue-800 whitespace-nowrap"
              >
                {item.name}
              </Link>
            ) : (
              <span className={`whitespace-nowrap ${
                index === items.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-600'
              }`}>
                {item.name}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}