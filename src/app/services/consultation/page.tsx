import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { seoManager } from '@/lib/seo';
import { SERVICES } from '@/lib/constants';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

// Generate metadata for consultation page
export const metadata: Metadata = seoManager.generatePageMetadata({
  title: 'Kitchen Planning Consultation Services - Expert Guidance & Planning',
  description: 'Professional kitchen planning consultation services in Pune. Expert guidance for commercial kitchen setup, equipment selection, and project planning. Free initial consultation.',
  keywords: [
    'kitchen planning consultation',
    'commercial kitchen planning',
    'kitchen design consultation',
    'equipment selection guidance',
    'kitchen project planning',
    'pune kitchen consultant'
  ],
  path: '/services/consultation'
});

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Consultation', href: '/services/consultation' }
];

const serviceInfo = SERVICES['consultation'];

export default function ConsultationPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Kitchen Planning Consultation
              </h1>
              <p className="text-xl mb-8">
                Expert consultation services to help you plan and optimize your 
                commercial kitchen project. From initial concept to final implementation, 
                our consultants guide you through every step of the process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact?service=consultation"
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Book Free Consultation
                </Link>
                <Link
                  href="/contact?type=quote"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors text-center"
                >
                  Get Project Quote
                </Link>
              </div>
            </div>
            <div className="relative h-96">
              <Image
                src="/imgs/services/consultation-hero.jpg"
                alt="Kitchen Planning Consultation"
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
                Expert Kitchen Planning Guidance
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {serviceInfo.description}
              </p>
              <p className="text-gray-600 mb-8">
                Our experienced consultants bring years of industry knowledge to help 
                you make informed decisions about your commercial kitchen project. 
                We analyze your specific requirements, space constraints, and budget 
                to develop a comprehensive plan that maximizes efficiency and profitability.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Strategic Planning</h3>
                    <p className="text-gray-600 text-sm">Comprehensive analysis and strategic recommendations for optimal results.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Cost Optimization</h3>
                    <p className="text-gray-600 text-sm">Budget-friendly solutions that maximize value and return on investment.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-96">
              <Image
                src="/imgs/services/consultation-process.jpg"
                alt="Consultation Process"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Consultation Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive consultation services covering every aspect of your 
              commercial kitchen project from planning to implementation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceInfo.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature}
                </h3>
                <p className="text-gray-600 text-sm">
                  Professional {feature.toLowerCase()} services to ensure optimal project outcomes and success.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Consultation Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A structured approach to understanding your needs and delivering 
              actionable recommendations for your commercial kitchen project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
            {[
              {
                step: '01',
                title: 'Initial Meeting',
                description: 'Understanding your vision, requirements, and constraints.',
                duration: '1-2 hours'
              },
              {
                step: '02',
                title: 'Site Assessment',
                description: 'Detailed evaluation of your space and infrastructure.',
                duration: '2-3 hours'
              },
              {
                step: '03',
                title: 'Analysis',
                description: 'Comprehensive analysis of requirements and options.',
                duration: '2-3 days'
              },
              {
                step: '04',
                title: 'Recommendations',
                description: 'Detailed recommendations and strategic planning.',
                duration: '1-2 days'
              },
              {
                step: '05',
                title: 'Presentation',
                description: 'Presentation of findings and recommendations.',
                duration: '1-2 hours'
              },
              {
                step: '06',
                title: 'Implementation',
                description: 'Ongoing support during project implementation.',
                duration: 'As needed'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {item.description}
                </p>
                <p className="text-xs text-purple-600 font-medium">
                  {item.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Packages */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Consultation Packages
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the consultation package that best fits your project needs 
              and budget requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic Consultation',
                price: '₹5,000',
                duration: '2-3 hours',
                features: [
                  'Initial requirement analysis',
                  'Basic space assessment',
                  'Equipment recommendations',
                  'Budget estimation',
                  'Written summary report'
                ],
                popular: false
              },
              {
                name: 'Comprehensive Consultation',
                price: '₹15,000',
                duration: '1-2 days',
                features: [
                  'Detailed site survey',
                  'Complete requirement analysis',
                  'Equipment specifications',
                  'Layout recommendations',
                  'Budget & timeline planning',
                  'Detailed consultation report',
                  'Follow-up support'
                ],
                popular: true
              },
              {
                name: 'Project Management',
                price: '₹25,000+',
                duration: 'Full project',
                features: [
                  'Complete project oversight',
                  'Vendor coordination',
                  'Timeline management',
                  'Quality assurance',
                  'Budget monitoring',
                  'Regular progress reports',
                  'Implementation support'
                ],
                popular: false
              }
            ].map((pkg, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-lg p-6 ${pkg.popular ? 'ring-2 ring-purple-600' : ''}`}>
                {pkg.popular && (
                  <div className="bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="mb-4">
                  <p className="text-3xl font-bold text-purple-600">{pkg.price}</p>
                  <p className="text-sm text-gray-600">{pkg.duration}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?service=consultation&package=${pkg.name.toLowerCase().replace(' ', '-')}`}
                  className={`block text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                    pkg.popular 
                      ? 'bg-purple-600 text-white hover:bg-purple-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Choose Package
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
              Benefits of Professional Consultation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceInfo.benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit}
                </h3>
                <p className="text-gray-600 text-sm">
                  Achieve {benefit.toLowerCase()} through our professional consultation and expert guidance.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'What is included in a free initial consultation?',
                answer: 'Our free initial consultation includes a basic discussion of your requirements, preliminary space assessment, and general guidance on your project scope and budget range.'
              },
              {
                question: 'How long does a comprehensive consultation take?',
                answer: 'A comprehensive consultation typically takes 1-2 days, including site visit, analysis, and preparation of detailed recommendations and reports.'
              },
              {
                question: 'Do you provide consultation for existing kitchen renovations?',
                answer: 'Yes, we provide consultation services for both new kitchen setups and existing kitchen renovations, upgrades, and optimization projects.'
              },
              {
                question: 'Can you help with equipment selection and vendor coordination?',
                answer: 'Absolutely! We assist with equipment selection, vendor evaluation, and can coordinate with suppliers and contractors throughout your project.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
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
            Ready to Start Your Kitchen Project?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book a free consultation today and let our experts help you plan 
            and execute your commercial kitchen project successfully.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?service=consultation"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Book Free Consultation
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