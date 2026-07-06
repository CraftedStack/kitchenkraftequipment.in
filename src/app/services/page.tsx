import Link from 'next/link';
import { seoManager } from '@/lib/seo';
import { api } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = seoManager.generatePageMetadata({
  title: 'Professional Commercial Kitchen Services',
  description: 'Comprehensive commercial kitchen services including design, manufacturing, installation, and maintenance. Expert solutions for restaurants, hotels, and food businesses in Pune.',
  keywords: [
    'commercial kitchen services',
    'kitchen design services',
    'equipment manufacturing',
    'kitchen installation',
    'maintenance services',
    'pune commercial kitchen'
  ],
  path: '/services'
});

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' }
];

const COLOR_GRADIENTS: Record<string, string> = {
  blue: 'from-blue-600 to-blue-800',
  green: 'from-green-600 to-green-800',
  purple: 'from-purple-600 to-purple-800',
  gray: 'from-gray-600 to-gray-800',
  red: 'from-red-600 to-red-800',
  orange: 'from-orange-500 to-orange-700',
};

export default async function ServicesPage() {
  let services: Awaited<ReturnType<typeof api.getServices>> = [];
  try {
    services = await api.getServices();
  } catch (error) {
    console.error('Failed to load services:', error);
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Kitchen Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Complete commercial kitchen solutions from design to maintenance.
              We handle every aspect of your kitchen project with expertise and precision.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Commercial Kitchen Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From initial consultation and custom design to manufacturing, installation, and ongoing maintenance,
              we provide end-to-end commercial kitchen solutions tailored to your business needs.
              Serving restaurants, hotels, catering businesses, and food service establishments across Pune and Maharashtra.
            </p>
          </div>

          {services.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => {
                const gradient = COLOR_GRADIENTS[service.color_theme] || COLOR_GRADIENTS.blue;
                const firstFeatures = service.features?.slice(0, 5) || [];
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className={`relative h-48 bg-gradient-to-r ${gradient} flex items-end`}>
                      {service.image_url && (
                        <div className="absolute inset-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={service.image_url}
                            alt={`${service.title} - Commercial Kitchen Services in Pune`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40" />
                        </div>
                      )}
                      <div className="relative z-10 p-4">
                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                        {service.subtitle && (
                          <p className="text-sm text-white/80 mt-1">{service.subtitle}</p>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      {service.description && (
                        <p className="text-gray-600 mb-4">{service.description}</p>
                      )}

                      {firstFeatures.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Services Include:</h4>
                          <ul className="text-sm text-gray-600 space-y-2">
                            {firstFeatures.map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {feature.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Learn More About {service.title}
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">Services coming soon.</p>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Kitchen Kraft?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              With years of experience and a commitment to excellence, we deliver
              commercial kitchen solutions that exceed expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                High-quality materials and precision manufacturing ensure long-lasting equipment.
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
                Quick turnaround times without compromising on quality or attention to detail.
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
                Professional consultation and ongoing support throughout your project lifecycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Kitchen?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and discover how we can help
            create the perfect commercial kitchen for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Quote
            </Link>
            <Link
              href="/contact?type=consultation"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
