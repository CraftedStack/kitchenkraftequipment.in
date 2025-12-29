import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { seoManager } from '@/lib/seo';
import { SERVICES, NAVIGATION } from '@/lib/constants';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

// Generate metadata for services page
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

export default function ServicesPage() {
  const servicesNav = NAVIGATION.main.find(item => item.name === 'Services');
  const servicesList = servicesNav?.children || [];

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

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Commercial Kitchen Design',
                description: 'Expert kitchen layout planning and design services optimized for workflow efficiency, food safety compliance, and operational excellence. Custom solutions for restaurants, hotels, and food service businesses.',
                features: [
                  'Space optimization and workflow planning',
                  'Equipment selection and placement',
                  '3D visualization and technical drawings',
                  'Compliance with food safety regulations',
                  'Cost-effective design solutions'
                ],
                href: '/services/commercial-kitchen-design',
                image: 'commercial-kitchen-design'
              },
              {
                name: 'Equipment Manufacturing',
                description: 'Custom manufacturing of high-quality stainless steel commercial kitchen equipment. Built to your exact specifications using premium SS 304/316 grade materials with precision engineering.',
                features: [
                  'Custom stainless steel fabrication',
                  'Precision engineering and manufacturing',
                  'Premium SS 304/316 grade materials',
                  'Quality testing and certification',
                  'Fast turnaround and delivery'
                ],
                href: '/services/equipment-manufacturing',
                image: 'equipment-manufacturing'
              },
              {
                name: 'Installation & Maintenance',
                description: 'Professional installation, commissioning, and ongoing maintenance services for commercial kitchen equipment. Ensuring optimal performance and longevity of your kitchen investments.',
                features: [
                  'Professional equipment installation',
                  'System commissioning and testing',
                  'Preventive maintenance programs',
                  'Emergency repair services',
                  '24/7 technical support'
                ],
                href: '/services/installation-maintenance',
                image: 'installation-maintenance'
              },
              {
                name: 'Expert Consultation',
                description: 'Professional consultation services for kitchen planning, equipment selection, operational optimization, and compliance. Expert guidance from concept to completion.',
                features: [
                  'Kitchen planning and optimization',
                  'Equipment selection guidance',
                  'Operational efficiency consulting',
                  'Compliance and safety advisory',
                  'Cost analysis and budgeting'
                ],
                href: '/services/consultation',
                image: 'consultation'
              }
            ].map((service, index) => (
              <div
                key={service.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={`/imgs/services/${service.image}.jpg`}
                    alt={`${service.name} - Commercial Kitchen Services in Pune`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{service.name}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Services Include:</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Learn More About {service.name}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
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