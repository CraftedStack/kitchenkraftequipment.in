import { Metadata } from 'next';
import Link from 'next/link';
import { seoManager } from '@/lib/seo';
import { api } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import ProductGrid from '@/components/products/ProductGrid';

// Generate metadata for products page
export const metadata: Metadata = seoManager.generatePageMetadata({
  title: 'Commercial Kitchen Equipment Products - Browse Our Range',
  description: 'Browse our complete range of commercial kitchen equipment. Manufacturing and reseller products for restaurants, hotels, and food businesses in Pune.',
  keywords: [
    'commercial kitchen products',
    'kitchen equipment catalog',
    'restaurant equipment',
    'hotel kitchen equipment',
    'pune kitchen equipment',
    'kitchen equipment manufacturers'
  ],
  path: '/products'
});

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' }
];

export default async function ProductsPage() {
  // Fetch categories for display
  let manufacturingCategories = [];
  let resellerCategories = [];
  
  try {
    const allCategories = await api.getGenres();
    manufacturingCategories = allCategories.filter(cat => cat.type === 'manufacture');
    resellerCategories = allCategories.filter(cat => cat.type === 'resell');
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Commercial Kitchen Equipment
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover our comprehensive range of commercial kitchen equipment. 
              From custom manufacturing to premium reseller products, we have 
              everything you need for your commercial kitchen.
            </p>
          </div>
        </div>
      </section>

      {/* Manufacturing Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Manufacturing Products
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Custom-manufactured commercial kitchen equipment designed and built 
              to your exact specifications using premium stainless steel.
            </p>
          </div>

          {manufacturingCategories.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {manufacturingCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products/${category.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-48 bg-gray-200">
                    {/* Placeholder for category image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg group-hover:text-blue-200 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description || `Professional ${category.name.toLowerCase()} for commercial kitchens.`}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium">
                      <span>View Products</span>
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading manufacturing categories...</p>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/services/equipment-manufacturing"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Learn About Our Manufacturing
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Reseller Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Best Selling Products
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Curated selection of top-quality commercial kitchen equipment from 
              trusted brands and manufacturers. Ready for immediate delivery.
            </p>
          </div>

          {resellerCategories.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resellerCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products/${category.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-48 bg-gray-200">
                    {/* Placeholder for category image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg group-hover:text-blue-200 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description || `Quality ${category.name.toLowerCase()} from trusted manufacturers.`}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium">
                      <span>View Products</span>
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading reseller categories...</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Products?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Quality, durability, and performance you can trust for your commercial kitchen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                High-grade stainless steel construction ensures durability and hygiene compliance.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick manufacturing and delivery times to get your kitchen operational faster.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Professional consultation, installation, and ongoing maintenance support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Choosing the Right Equipment?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our experts are here to help you select the perfect equipment for your 
            commercial kitchen needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Expert Consultation
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}