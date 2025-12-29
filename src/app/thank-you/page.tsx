import { Metadata } from 'next';
import { Suspense } from 'react';
import { seoManager } from '@/lib/seo';
import { COMPANY_INFO } from '@/lib/constants';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import ThankYouContent from './ThankYouContent';

// Generate metadata for thank you page
export const metadata: Metadata = seoManager.generatePageMetadata({
  title: 'Thank You - Kitchen Kraft Equipments',
  description: 'Thank you for contacting Kitchen Kraft Equipments. We will get back to you soon with the information you requested.',
  keywords: [
    'thank you',
    'contact confirmation',
    'kitchen kraft',
    'commercial kitchen equipment'
  ],
  path: '/thank-you'
});

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Thank You', href: '/thank-you' }
];

export default function ThankYouPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      }>
        <ThankYouContent />
      </Suspense>
    </>
  );
}