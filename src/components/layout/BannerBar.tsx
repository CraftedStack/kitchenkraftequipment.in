'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Banner {
  active: boolean;
  message: string;
  link_url: string;
  link_text: string;
  bg_color: string;
  text_color: string;
  style?: 'solid' | 'gradient' | 'image';
  gradient_from?: string;
  gradient_to?: string;
  gradient_direction?: string;
  image_url?: string;
  overlay?: boolean;
  size?: 'slim' | 'normal' | 'tall';
}

// Vertical padding + text size per banner size. Kept to tested values so a
// bigger banner just pushes page content down without breaking anything.
const SIZE_CLASSES: Record<string, string> = {
  slim: 'py-1.5 text-xs',
  normal: 'py-2.5 text-sm',
  tall: 'py-4 text-base',
};

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// Bump this suffix if the banner's meaning changes enough that a prior dismissal
// shouldn't carry over. Dismissal is keyed by message so a NEW message re-shows.
const DISMISS_PREFIX = 'kk_banner_dismissed:';

/**
 * Site-wide announcement / sale bar. Reads the live banner config (which already
 * computes `active` from the enabled flag + schedule), shows a dismissible bar,
 * and remembers dismissal per-message for the session so editing the message
 * re-shows it. Renders nothing when inactive or dismissed.
 */
export default function BannerBar() {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [dismissed, setDismissed] = useState(true); // assume hidden until we know

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API}/api/settings/banner`, { cache: 'no-cache' });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled || !data?.success || !data.banner?.active) return;
        const b: Banner = data.banner;
        setBanner(b);
        // Show unless this exact message was already dismissed this session.
        const key = DISMISS_PREFIX + b.message;
        setDismissed(sessionStorage.getItem(key) === '1');
      } catch {
        /* never block the site on the banner */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!banner || !banner.active || dismissed) return null;

  const handleDismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_PREFIX + banner.message, '1');
    } catch {
      /* ignore storage errors */
    }
    setDismissed(true);
  };

  const hasLink = Boolean(banner.link_url && banner.link_text);

  // Build the background based on the chosen style.
  const style = banner.style || 'solid';
  const isImage = style === 'image' && Boolean(banner.image_url);
  const bgStyle: React.CSSProperties = { color: banner.text_color };
  if (style === 'gradient') {
    const dir = banner.gradient_direction || 'to right';
    bgStyle.backgroundImage = `linear-gradient(${dir}, ${banner.gradient_from || banner.bg_color}, ${banner.gradient_to || banner.bg_color})`;
  } else if (isImage) {
    bgStyle.backgroundImage = `url(${banner.image_url})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  } else {
    bgStyle.backgroundColor = banner.bg_color;
  }
  // Dark scrim over images so text stays legible (opt-out via overlay=false).
  const showOverlay = isImage && banner.overlay !== false;
  const sizeClass = SIZE_CLASSES[banner.size || 'normal'] || SIZE_CLASSES.normal;

  return (
    <div
      className="w-full relative"
      style={bgStyle}
      role="region"
      aria-label="Site announcement"
    >
      {showOverlay && (
        <div className="absolute inset-0 bg-black/40 pointer-events-none" aria-hidden="true" />
      )}
      <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-3 font-medium text-center ${sizeClass}`}>
        <span>{banner.message}</span>
        {hasLink &&
          (banner.link_url.startsWith('/') ? (
            <Link
              href={banner.link_url}
              className="underline underline-offset-2 font-semibold hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              {banner.link_text} →
            </Link>
          ) : (
            <a
              href={banner.link_url}
              className="underline underline-offset-2 font-semibold hover:opacity-80 transition-opacity whitespace-nowrap"
              target="_blank"
              rel="noopener noreferrer"
            >
              {banner.link_text} →
            </a>
          ))}
      </div>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded hover:bg-black/10 transition-colors"
        style={{ color: banner.text_color }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
