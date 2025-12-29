import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { seoManager } from '@/lib/seo';
import { SERVICES } from '@/lib/constants';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

// Generate metadata for equipment manufacturing page
export const metadata: Metadata = seoManager.generatePageMetadata({
  title: 'Commercial Kitchen Equipment Manufacturing - Custom Stainless Steel',
  description: 'Custom manufacturing of commercial kitchen equipment in Pune. High-quality stainless steel equipment for restaurants, hotels, and food businesses. Made to order solutions.',
  keywords: [
    'kitchen equipment manufacturing',
    'custom kitchen equipment',
    'stainless steel manufacturing',
    'commercial kitchen equipment pune',
    'restaurant equipment manufacturing',
    'hotel kitchen equipment'
  ],
  path: '/services/equipment-manufacturing'
});

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Manufacturing', href: '/services/equipment-manufacturing' }
];

const serviceInfo = SERVICES['equipment-manufacturing'];

export default function EquipmentManufacturingPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Equipment Manufacturing
              </h1>
              <p className="text-xl mb-8">
                Custom manufacturing of high-quality commercial kitchen equipment 
                using premium stainless steel. Built to your exact specifications 
                with precision engineering and superior craftsmanship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact?service=manufacturing"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Get Manufacturing Quote
                </Link>
                <Link
                  href="/products"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors text-center"
                >
                  View Products
                </Link>
              </div>
            </div>
            <div className="relative h-96">
              <Image
                src="/imgs/services/manufacturing-hero.jpg"
                alt="Equipment Manufacturing"
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
            <div className="relative h-96">
              <Image
                src="/imgs/services/manufacturing-process.jpg"
                alt="Manufacturing Process"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Custom Equipment Manufacturing
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {serviceInfo.description}
              </p>
              <p className="text-gray-600 mb-8">
                Our state-of-the-art manufacturing facility is equipped with modern 
                machinery and skilled craftsmen who ensure every piece of equipment 
                meets the highest standards of quality and durability. We use only 
                premium grade stainless steel and follow strict quality control processes.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Premium Materials</h3>
                    <p className="text-gray-600 text-sm">High-grade stainless steel (SS 304/316) for durability and hygiene.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Fast Turnaround</h3>
                    <p className="text-gray-600 text-sm">Efficient production processes ensure quick delivery without compromising quality.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Manufacturing Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive manufacturing services cover the complete range 
              of commercial kitchen equipment with precision and quality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceInfo.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature}
                </h3>
                <p className="text-gray-600 text-sm">
                  Professional {feature.toLowerCase()} services with attention to detail and quality assurance.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Equipment We Manufacture
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From cooking equipment to storage solutions, we manufacture a complete 
              range of commercial kitchen equipment to meet your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Cooking Equipment',
                items: ['Gas Stoves', 'Grills', 'Fryers', 'Ovens'],
                image: '/imgs/categories/cooking-equipment.jpg'
              },
              {
                name: 'Preparation Tables',
                items: ['Work Tables', 'Prep Sinks', 'Cutting Boards', 'Storage'],
                image: '/imgs/categories/prep-tables.jpg'
              },
              {
                name: 'Storage Solutions',
                items: ['Shelving', 'Cabinets', 'Racks', 'Trolleys'],
                image: '/imgs/categories/storage.jpg'
              },
              {
                name: 'Washing Equipment',
                items: ['Sinks', 'Dishwashers', 'Drain Boards', 'Accessories'],
                image: '/imgs/categories/washing.jpg'
              }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quality Assurance Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every piece of equipment undergoes rigorous quality checks to ensure 
              it meets our high standards and your expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Material Inspection',
                description: 'Quality check of all raw materials before production begins.'
              },
              {
                step: '02',
                title: 'Production Monitoring',
                description: 'Continuous monitoring during manufacturing process.'
              },
              {
                step: '03',
                title: 'Final Testing',
                description: 'Comprehensive testing of finished equipment functionality.'
              },
              {
                step: '04',
                title: 'Quality Certification',
                description: 'Final quality certification before delivery to customer.'
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

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Manufacturing?
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
                  Experience {benefit.toLowerCase()} with our professional manufacturing services.
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
            Need Custom Equipment Manufacturing?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your custom equipment requirements. 
            Our team will provide a detailed quote and timeline for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?service=manufacturing"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Manufacturing Quote
            </Link>
            <Link
              href="/products"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              View Our Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}