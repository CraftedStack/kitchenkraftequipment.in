import Link from 'next/link';
import { TouchButton, TouchCard } from "@/components/ui/TouchFeedback";

/**
 * Homepage "Services Overview" block. Rendered only when the Services section
 * is enabled — see app/page.tsx. Kept as a component so the homepage does not
 * carry a large block of markup that is usually switched off.
 */
export default function HomeServicesSection() {
  return (
    <>
      {/* Services Overview Section - Mobile Optimized */}
      <section className="py-6 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
              Professional Commercial Kitchen Services
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto px-2 md:px-4 leading-relaxed">
              Complete solutions for your commercial kitchen needs - from custom design and manufacturing 
              to installation and ongoing maintenance. Serving restaurants, hotels, and food businesses across Pune.
            </p>
          </div>
          
          {/* Mobile-optimized grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                title: 'Kitchen Design',
                description: 'Custom commercial kitchen layouts optimized for efficiency and workflow',
                icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
                href: '/services/commercial-kitchen-design'
              },
              {
                title: 'Equipment Manufacturing',
                description: 'Custom stainless steel kitchen equipment built to your specifications',
                icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
                href: '/services/equipment-manufacturing'
              },
              {
                title: 'Installation & Setup',
                description: 'Professional installation and commissioning of kitchen equipment',
                icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
                href: '/services/installation-maintenance'
              },
              {
                title: 'Consultation',
                description: 'Expert advice on kitchen planning, equipment selection, and optimization',
                icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                href: '/services/consultation'
              }
            ].map((service, index) => (
              <TouchCard key={index} className="bg-white p-3 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-4 mx-auto sm:mx-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d={service.icon} clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 text-center sm:text-left leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 text-center sm:text-left leading-relaxed">
                  {service.description}
                </p>
                <Link 
                  href={service.href}
                  className="text-blue-600 hover:text-blue-800 font-medium text-xs md:text-sm inline-flex items-center justify-center sm:justify-start w-full sm:w-auto transition-colors"
                >
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </TouchCard>
            ))}
          </div>
          
          <div className="text-center mt-6 md:mt-12">
            <TouchButton className="bg-blue-600 text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              <Link href="/services" className="block w-full h-full">
                View All Services
              </Link>
            </TouchButton>
          </div>
        </div>
      </section>
    </>
  );
}
