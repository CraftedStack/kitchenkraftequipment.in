'use client';

import React from 'react';
import { trackPhoneCall, trackWhatsAppClick, trackEmailClick } from '@/components/seo/Analytics';

type ContactType = 'phone' | 'whatsapp' | 'email';

interface TrackedContactLinkProps {
  /** Which contact channel this link uses — determines the GA event fired */
  type: ContactType;
  /** The href (tel:, https://wa.me/…, or mailto:) */
  href: string;
  /** Value passed to the tracking helper (phone number or email); ignored for whatsapp */
  trackValue?: string;
  className?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

/**
 * A drop-in <a> that fires the matching GA event on click. Lets server
 * components (which can't attach onClick to gtag helpers) track contact clicks.
 */
export default function TrackedContactLink({
  type,
  href,
  trackValue = '',
  className,
  target,
  rel,
  children,
}: TrackedContactLinkProps) {
  const handleClick = () => {
    if (type === 'phone') trackPhoneCall(trackValue);
    else if (type === 'whatsapp') trackWhatsAppClick();
    else if (type === 'email') trackEmailClick(trackValue);
  };

  return (
    <a href={href} onClick={handleClick} className={className} target={target} rel={rel}>
      {children}
    </a>
  );
}
