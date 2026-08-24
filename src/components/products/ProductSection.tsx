import { notFound } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { getPublicFlags } from '@/lib/publicFlags';
import { seoManager, structuredDataManager } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import ProductDetail from '@/components/products/ProductDetail';
import RelatedProducts from '@/components/products/RelatedProducts';
import InquiryForm from '@/components/forms/InquiryForm';
import ProductFaq from '@/components/products/ProductFaq';
import { sectionForGenre, type ProductSection } from '@/lib/productSections';

interface Props {
  category: string;
  slug: string;
  section: ProductSection;
}

/**
 * Product detail, shared by both catalogue sections:
 *   /manufacturing/[category]/[slug]  (custom-made)
 *   /products/[category]/[slug]       (resell)
 *
 * See CategorySection for the same pattern at category level.
 */
export default async function ProductSection({ category, slug, section }: Props) {
  const flags = await getPublicFlags();
  let product: any = null;
  let categoryData: any = null;
  let relatedProducts: any[] = [];
  let error: any = null;

  // Resolve the product and its category first. notFound() throws a
  // control-flow signal that a surrounding try/catch would swallow, so the
  // 404 decisions are kept outside the try below.
  try {
    [product, categoryData] = await Promise.all([
      api.getProductBySlug(category, slug),
      api.getGenreBySlug(category),
    ]);
  } catch (err) {
    console.error('Failed to fetch product data:', err);
  }

  if (!product || !categoryData) {
    notFound();
  }

  // A product must be reached through its category's own section, so the same
  // product never answers on two URLs.
  if (sectionForGenre(categoryData).basePath !== section.basePath) {
    notFound();
  }

  try {
    const categoryProducts = await api.getProductsByGenre(categoryData.id);
    relatedProducts = categoryProducts
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  } catch (err) {
    console.error('Failed to fetch related products:', err);
    error = err;
  }

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: section.label, href: section.basePath },
    { name: categoryData.name, href: `${section.basePath}/${categoryData.slug}` },
    { name: product.name, href: `${section.basePath}/${categoryData.slug}/${product.slug}` }
  ];

  // Generate structured data for the product
  const productSchema = structuredDataManager.generateProductSchema(product);

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema)
        }}
      />

      {error ? (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Unable to Load Product
              </h1>
              <p className="text-gray-600 mb-6">
                We're having trouble loading this product. Please try again later.
              </p>
              <Link
                href={section.basePath}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to All Products
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Product Detail Section */}
          <ProductDetail product={product} category={categoryData} />

          {/* Product Specifications */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Product Specifications
                  </h2>
                  
                  {product.specifications && Object.keys(product.specifications).length > 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <dl className="space-y-4">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                            <dt className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </dt>
                            <dd className="text-gray-600">{String(value)}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="text-center py-8">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Detailed Specifications Available
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Contact us for complete technical specifications and customization options.
                        </p>
                        <Link
                          href={`/contact?product=${encodeURIComponent(product.name)}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Request Specifications →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Key Features & Benefits
                  </h2>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="space-y-4">
                      {[
                        {
                          title: 'Premium Quality',
                          description: 'Made with high-grade stainless steel for durability and hygiene.',
                          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                        },
                        {
                          title: 'Commercial Grade',
                          description: 'Designed for heavy-duty commercial kitchen operations.',
                          icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
                        },
                        {
                          title: 'Easy Maintenance',
                          description: 'Simple cleaning and maintenance for busy kitchen environments.',
                          icon: 'M13 10V3L4 14h7v7l9-11h-7z'
                        },
                        {
                          title: 'Warranty Included',
                          description: 'Comprehensive warranty coverage and after-sales support.',
                          icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                        }
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-blue-100 p-2 rounded-lg mr-4 flex-shrink-0">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ. Placed before the enquiry form on purpose: answer what the
              buyer is wondering, then ask them to get in touch. */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductFaq faqs={product.faq} />
          </div>

          {/* Inquiry Form Section */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Interested in This Product?
                </h2>
                <p className="text-lg text-gray-600">
                  Get a personalized quote and expert consultation for {product.name}.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <InquiryForm product={product as any} />
              </div>
            </div>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <RelatedProducts 
              products={relatedProducts} 
              categoryName={categoryData.name}
              categorySlug={categoryData.slug}
              basePath={section.basePath}
            />
          )}

          {/* Additional Services CTA — only when services are offered */}
          {flags.services && (
          <section className="py-16 bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    Complete Kitchen Solutions
                  </h2>
                  <p className="text-xl mb-6">
                    Beyond equipment, we provide comprehensive services including 
                    kitchen design, installation, and ongoing maintenance support.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/services/commercial-kitchen-design"
                      className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                    >
                      Kitchen Design
                    </Link>
                    <Link
                      href="/services/installation-maintenance"
                      className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
                    >
                      Installation & Support
                    </Link>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white bg-opacity-10 rounded-lg p-8">
                    <h3 className="text-2xl font-bold mb-4">Need Expert Advice?</h3>
                    <p className="mb-6">
                      Our kitchen consultants can help you choose the right equipment 
                      and design the perfect kitchen layout.
                    </p>
                    <Link
                      href="/services/consultation"
                      className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                    >
                      Book Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )}
        </>
      )}
    </>
  );
}