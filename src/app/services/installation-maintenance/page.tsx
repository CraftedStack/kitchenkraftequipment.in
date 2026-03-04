import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { seoManager } from '@/lib/seo';
import { SERVICES } from '@/lib/constants';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

// Generate metadata for installation maintenance page
export const metadata: Metadata = seoManager.generatePageMetadata({
  title: 'Kitchen Equipment Installation & Maintenance Services - Professional Support',
  description: 'Professional installation and maintenance services for commercial kitchen equipment in Pune. Expert technicians, 24/7 support, and preventive maintenance programs.',
  keywords: [
    'kitchen equipment installation',
    'equipment maintenance services',
    'commercial kitchen maintenance',
    'equipment repair pune',
    'kitchen equipment support',
    'preventive maintenance'
  ],
  path: '/services/installation-maintenance'
});

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Installation & Maintenance', href: '/services/installation-maintenance' }
];

const serviceInfo = SERVICES['installation-maintenance'];

export default function InstallationMaintenancePage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Installation & Maintenance
              </h1>
              <p className="text-xl mb-8">
                Professional installation and comprehensive maintenance services 
                to keep your commercial kitchen equipment running at peak performance. 
                Expert technicians, quality service, and reliable support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact?service=installation"
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Schedule Service
                </Link>
                <Link
                  href="/contact?type=emergency"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors text-center"
                >
                  Emergency Support
                </Link>
              </div>
            </div>
            <div className="relative h-96">
              <Image
                src="/imgs/services/installation-hero.jpg"
                alt="Installation & Maintenance"
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
                Complete Installation & Maintenance Solutions
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {serviceInfo.description}
              </p>
              <p className="text-gray-600 mb-8">
                Our certified technicians have extensive experience with all types 
                of commercial kitchen equipment. We provide comprehensive installation 
                services and ongoing maintenance programs to ensure your equipment 
                operates efficiently and safely throughout its lifecycle.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Installation</h3>
                  <p className="text-sm text-gray-600">
                    Professional setup, testing, and commissioning of all equipment.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Maintenance</h3>
                  <p className="text-sm text-gray-600">
                    Preventive maintenance programs and emergency repair services.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative h-96">
              <Image
                src="/imgs/services/maintenance-process.jpg"
                alt="Maintenance Process"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Service Offerings
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive installation and maintenance services to keep your 
              commercial kitchen operating smoothly and efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceInfo.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature}
                </h3>
                <p className="text-gray-600 text-sm">
                  Expert {feature.toLowerCase()} services with professional technicians and quality assurance.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Installation Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our systematic installation process ensures proper setup and optimal 
              performance of your commercial kitchen equipment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Site Preparation',
                description: 'Assessment of installation site and preparation of utilities and connections.',
                icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
              },
              {
                step: '02',
                title: 'Equipment Setup',
                description: 'Careful positioning and connection of equipment according to specifications.',
                icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
              },
              {
                step: '03',
                title: 'Testing & Commissioning',
                description: 'Comprehensive testing of all functions and safety systems.',
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              },
              {
                step: '04',
                title: 'Training & Handover',
                description: 'Staff training on operation and basic maintenance procedures.',
                icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
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

      {/* Maintenance Programs */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Maintenance Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our flexible maintenance programs designed to keep your 
              equipment running efficiently and extend its operational life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic Plan',
                price: 'Starting from ₹5,000/month',
                features: [
                  'Quarterly inspections',
                  'Basic cleaning & lubrication',
                  'Performance checks',
                  'Basic repairs included',
                  'Phone support'
                ],
                popular: false
              },
              {
                name: 'Professional Plan',
                price: 'Starting from ₹8,000/month',
                features: [
                  'Monthly inspections',
                  'Comprehensive maintenance',
                  'Priority repair service',
                  'Spare parts included',
                  '24/7 phone support',
                  'Performance reports'
                ],
                popular: true
              },
              {
                name: 'Premium Plan',
                price: 'Starting from ₹12,000/month',
                features: [
                  'Bi-weekly inspections',
                  'Complete maintenance coverage',
                  'Emergency on-site service',
                  'All parts & labor included',
                  '24/7 dedicated support',
                  'Equipment replacement guarantee'
                ],
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-lg p-6 ${plan.popular ? 'ring-2 ring-blue-600' : ''}`}>
                {plan.popular && (
                  <div className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?service=maintenance&plan=${plan.name.toLowerCase()}`}
                  className={`block text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Choose Plan
                </Link>
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
              Benefits of Professional Service
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceInfo.benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit}
                </h3>
                <p className="text-gray-600 text-sm">
                  Achieve {benefit.toLowerCase()} through our professional installation and maintenance services.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              24/7 Emergency Support
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Equipment breakdown? Our emergency support team is available 24/7 
              to get your kitchen back up and running quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:+918830696290"
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Call Emergency: +91 88306 96290
              </Link>
              <Link
                href="/contact?type=emergency"
                className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors"
              >
                Request Emergency Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Installation or Maintenance Service?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to schedule professional installation or maintenance 
            services for your commercial kitchen equipment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?service=installation"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Schedule Service
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
    </>
  );
}