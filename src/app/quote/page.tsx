import { Metadata } from 'next';
import { api } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import ProductQuoteForm from '@/components/forms/ProductQuoteForm';

export const metadata: Metadata = {
  title: 'Get a Free Product Quote | Kitchen Kraft Equipments',
  description:
    'Request a free quote for commercial kitchen equipment. Select one or more products and our team will send you detailed pricing within 2 hours.',
  keywords: [
    'kitchen equipment quote',
    'commercial kitchen quote',
    'free quote kitchen kraft',
    'kitchen equipment pricing pune',
  ],
};

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Get Quote', href: '/quote' },
];

interface QuotePageProps {
  searchParams: Promise<{ product?: string }>;
}

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const { product } = await searchParams;

  // Fetch all products server-side so the form is pre-populated
  let allProducts = [];
  try {
    allProducts = await api.getAllProducts();
  } catch {
    // If API is down the form still renders — just with an empty product list
    allProducts = [];
  }

  const preselectedProduct = product ? decodeURIComponent(product) : undefined;

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">Get a Free Quote</h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto">
            Select the products you need. We&apos;ll send you competitive pricing within 2 hours.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-8 sm:py-12 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductQuoteForm
            allProducts={allProducts}
            preselectedProduct={preselectedProduct}
          />
        </div>
      </section>
    </>
  );
}
