'use client';

import React, { useState, useEffect } from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope, FaTimes, FaComments } from 'react-icons/fa';
import { trackPhoneCall, trackWhatsAppClick, trackEmailClick } from '@/components/seo/Analytics';

interface FloatingContactProps {
  className?: string;
}

export default function FloatingContact({ className = '' }: FloatingContactProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show widget after page loads and user scrolls a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled);
    };

    // Show after 3 seconds or on scroll
    const timer = setTimeout(() => setIsVisible(true), 3000);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const contactOptions = [
    {
      name: 'Call Us',
      icon: FaPhone,
      href: 'tel:+918830696290',
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Speak with our experts',
      onClick: () => trackPhoneCall('+918830696290')
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      href: 'https://wa.me/918830696290?text=Hi, I am interested in your commercial kitchen equipment. Please provide more information.',
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Quick chat support',
      external: true,
      onClick: () => trackWhatsAppClick()
    },
    {
      name: 'Email Us',
      icon: FaEnvelope,
      href: 'mailto:info@kitchenkraftequipments.com?subject=Commercial Kitchen Equipment Inquiry',
      color: 'bg-red-600 hover:bg-red-700',
      description: 'Send detailed inquiry',
      onClick: () => trackEmailClick('info@kitchenkraftequipments.com')
    }
  ];

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Contact Options */}
      {isOpen && (
        <div className="mb-4 space-y-3">
          {contactOptions.map((option, index) => (
            <div
              key={option.name}
              className="flex items-center justify-end animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-lg shadow-lg px-3 py-2 mr-3 max-w-xs">
                <p className="text-sm font-semibold text-gray-900">{option.name}</p>
                <p className="text-xs text-gray-600">{option.description}</p>
              </div>
              <a
                href={option.href}
                target={option.external ? '_blank' : '_self'}
                rel={option.external ? 'noopener noreferrer' : undefined}
                onClick={option.onClick}
                className={`${option.color} text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl`}
                aria-label={option.name}
              >
                <option.icon className="w-5 h-5" />
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen 
            ? 'bg-gray-600 hover:bg-gray-700' 
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl`}
        aria-label={isOpen ? 'Close contact options' : 'Open contact options'}
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6" />
        ) : (
          <FaComments className="w-6 h-6" />
        )}
      </button>

      {/* Pulse animation when closed */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// Quick Contact Bar Component for desktop
export function QuickContactBar() {
  return (
    <div className="hidden lg:block fixed top-1/2 right-0 transform -translate-y-1/2 z-40">
      <div className="bg-white shadow-lg rounded-l-lg overflow-hidden">
        <div className="bg-blue-600 text-white px-4 py-2">
          <p className="text-sm font-semibold">Quick Contact</p>
        </div>
        <div className="p-2 space-y-2">
          <a
            href="tel:+918830696290"
            onClick={() => trackPhoneCall('+918830696290')}
            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded transition-colors"
          >
            <FaPhone className="w-4 h-4 mr-2 text-blue-600" />
            Call Now
          </a>
          <a
            href="https://wa.me/918830696290"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick()}
            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-green-50 rounded transition-colors"
          >
            <FaWhatsapp className="w-4 h-4 mr-2 text-green-600" />
            WhatsApp
          </a>
          <a
            href="mailto:info@kitchenkraftequipments.com"
            onClick={() => trackEmailClick('info@kitchenkraftequipments.com')}
            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-red-50 rounded transition-colors"
          >
            <FaEnvelope className="w-4 h-4 mr-2 text-red-600" />
            Email
          </a>
        </div>
      </div>
    </div>
  );
}