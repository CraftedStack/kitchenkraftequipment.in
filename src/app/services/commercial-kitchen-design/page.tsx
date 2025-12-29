import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { seoManager } from '@/lib/seo';
import { SERVICES } from '@/lib/constants';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ServiceSchema } from '@/components/seo/StructuredData';
import ServiceInquiryForm from '@/components/forms/ServiceInquiryForm';

// Generate metadata for commercial kitchen design page
export const metadata: Metadata = seoManager.generatePageMetadata({
  title: 'Commercial Kitchen Design Services - Custom Layout & Planning',
  description: 'Professional commercial kitchen design services in Pune. Custom 3D layouts, space optimization, and workflow analysis for restaurants, hotels, and food businesses.',
  keywords: [
    'commercial kitchen design',
    'kitchen layout design',
    '3d kitchen planning',
    'restaurant kitchen design',
    'hotel kitchen design',
    'pune kitchen design services'
  ],
  path: '/services/commercial-kitchen-design'
});

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Kitchen Design', href: '/services/commercial-kitchen-design' }
];

const serviceInfo = SERVICES['commercial-kitchen-design'];

export default function CommercialKitchenDesignPage() {
  return (
    <>
      <ServiceSchema 
        serviceName="Commercial Kitchen Design"
        serviceDescription="Professional commercial kitchen design services in Pune. Custom 3D layouts, space optimization, and workflow analysis for restaurants, hotels, and food businesses."
        serviceUrl="https://kitchenkraftequipments.com/services/commercial-kitchen-design"
      />
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Commercial Kitchen Design
              </h1>
              <p className="text-xl mb-8">
                Transform your space into an efficient, profitable commercial kitchen 
                with our expert design services. We create custom layouts that maximize 
                productivity while ensuring safety and compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact?service=kitchen-design"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Get Design Quote
                </Link>
                <Link
                  href="/contact?type=consultation"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
                >
                  Free Consultation
                </Link>
              </div>
            </div>
            <div className="relative h-96">
              <Image
                src="/imgs/services/kitchen-design-hero.jpg"
                alt="Commercial Kitchen Design"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Professional Kitchen Design Services
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {serviceInfo.description}
              </p>
              <p className="text-gray-600 mb-8">
                Our experienced design team works closely with you to understand your 
                specific requirements, operational workflow, and budget constraints. 
                We create detailed 3D layouts that help you visualize your kitchen 
                before construction begins.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Design Process</h3>
                  <p className="text-sm text-gray-600">
                    Comprehensive consultation, site survey, 3D modeling, and detailed planning.
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Compliance</h3>
                  <p className="text-sm text-gray-600">
                    All designs meet local safety standards and health department requirements.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative h-96">
              <Image
                src="/imgs/services/kitchen-design-process.jpg"
                alt="Kitchen Design Process"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Design Features & Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive design service includes everything you need to create 
              an efficient and profitable commercial kitchen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceInfo.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature}
                </h3>
                <p className="text-gray-600 text-sm">
                  Professional implementation of {feature.toLowerCase()} to ensure optimal kitchen performance.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Benefits of Professional Kitchen Design
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Investing in professional kitchen design delivers measurable returns 
              through improved efficiency and reduced operational costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceInfo.benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit}
                </h3>
                <p className="text-gray-600 text-sm">
                  Achieve {benefit.toLowerCase()} through strategic design and optimal equipment placement.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Design Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a systematic approach to ensure your kitchen design meets 
              all your operational requirements and budget constraints.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'Initial meeting to understand your requirements, budget, and timeline.'
              },
              {
                step: '02',
                title: 'Site Survey',
                description: 'Detailed measurement and assessment of your space and infrastructure.'
              },
              {
                step: '03',
                title: '3D Design',
                description: 'Creation of detailed 3D layouts with equipment placement and workflow.'
              },
              {
                step: '04',
                title: 'Final Plans',
                description: 'Delivery of complete design documentation and implementation support.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Design Your Perfect Kitchen?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and let our experts create 
            a custom kitchen design that maximizes your space and efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?service=kitchen-design"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Design Quote
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Service Inquiry Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceInquiryForm 
            serviceName="Commercial Kitchen Design"
            serviceSlug="commercial-kitchen-design"
          />
        </div>
      </section>
    </>
  );
}