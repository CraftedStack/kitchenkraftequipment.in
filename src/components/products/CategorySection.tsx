import { notFound } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import ProductGrid from '@/components/products/ProductGrid';
import CategoryHeader from '@/components/products/CategoryHeader';
import { sectionForGenre, type ProductSection } from '@/lib/productSections';

interface Props {
  categorySlug: string;
  section: ProductSection;
}

/**
 * Category listing, shared by both catalogue sections:
 *   /manufacturing/[category]  (custom-made)
 *   /products/[category]       (resell)
 *
 * The section decides the breadcrumb trail, the child product URLs and the
 * closing call to action. A genre reached through the wrong section 404s so a
 * category never answers on two different URLs.
 */
export default async function CategorySection({ categorySlug, section }: Props) {
  let category;
  let products = [];
  let error = null;

  // Resolve the category first. notFound() throws a control-flow signal that a
  // surrounding try/catch would swallow, so the lookup and the 404 decision are
  // kept outside the data-fetch try below.
  try {
    category = await api.getGenreBySlug(categorySlug);
  } catch (err) {
    console.error('Failed to fetch category:', err);
  }

  if (!category) {
    notFound();
  }

  // A genre must be reached through the section its type belongs to, so the
  // same category never answers on two URLs.
  if (sectionForGenre(category).basePath !== section.basePath) {
    notFound();
  }

  try {
    products = await api.getProductsByGenre(category.id);
  } catch (err) {
    console.error('Failed to fetch category products:', err);
    error = err;
  }

  const isManufacturing = section.type === 'manufacture';

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: section.label, href: section.basePath },
    { name: category.name, href: `${section.basePath}/${category.slug}` }
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Category Header */}
      <CategoryHeader category={category} productCount={products.length} />

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error ? (
            <div className="text-center py-12">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Unable to Load Products
              </h3>
              <p className="text-gray-600 mb-6">
                We're having trouble loading the products for this category. Please try again later.
              </p>
              <Link
                href={section.basePath}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to {section.label}
              </Link>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {category.name} Products
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {products.length} product{products.length !== 1 ? 's' : ''} available
                  </p>
                </div>
                
                {/* Filter/Sort Options - Future Enhancement */}
                <div className="flex items-center space-x-4">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="name">Sort by Name</option>
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>

              <ProductGrid 
                products={products} 
                categorySlug={category.slug}
                basePath={section.basePath}
                className="mb-12"
              />

              {/* Category CTA */}
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {isManufacturing ? `Need Custom ${category.name}?` : `Looking for more ${category.name}?`}
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  {isManufacturing
                    ? `Can't find exactly what you're looking for? We build ${category.name.toLowerCase()} to your specific requirements.`
                    : `Tell us what you need and we'll help you find the right ${category.name.toLowerCase()} for your kitchen.`}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={`/contact?category=${encodeURIComponent(category.name)}`}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {isManufacturing ? 'Request Custom Quote' : 'Enquire About This Range'}
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-6m-10 0h6m0 0v5m0-5h6m-6 0v-5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Products Available
              </h3>
              <p className="text-gray-600 mb-6">
                There are currently no products available in the {category.name} category.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/contact?category=${encodeURIComponent(category.name)}`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {isManufacturing ? 'Request Custom Products' : 'Enquire About This Range'}
                </Link>
                <Link
                  href={section.basePath}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Browse Other Categories
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      {category && (
        <RelatedCategories currentCategory={category} section={section} />
      )}
    </>
  );
}

// Related Categories Component
async function RelatedCategories({ currentCategory, section }: { currentCategory: any; section: ProductSection }) {
  let relatedCategories = [];
  
  try {
    const allCategories = await api.getGenresByType(currentCategory.type);
    relatedCategories = allCategories
      .filter(cat => cat.id !== currentCategory.id)
      .slice(0, 3);
  } catch (error) {
    console.error('Failed to fetch related categories:', error);
  }

  if (relatedCategories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Related Categories
          </h2>
          <p className="text-lg text-gray-600">
            Explore other {section.label.toLowerCase()} categories
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {relatedCategories.map((category) => (
            <Link
              key={category.id}
              href={`${section.basePath}/${category.slug}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-48 bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-white font-semibold group-hover:text-blue-200 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3">
                  {category.description || `Professional ${category.name.toLowerCase()} for commercial kitchens.`}
                </p>
                <div className="flex items-center text-blue-600 font-medium text-sm">
                  <span>View Products</span>
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}