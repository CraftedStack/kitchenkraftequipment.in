import { Metadata } from 'next';
import Link from 'next/link';
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import ProductContainer from "@/components/ProductContainer";
import ProductInfoBox from "@/components/ProductInfoBox";
import { seoManager } from "@/lib/seo";
import { TouchButton, TouchCard } from "@/components/ui/TouchFeedback";

// Generate metadata for homepage
export const metadata: Metadata = seoManager.generateHomepageMetadata();

export default function HomePage() {
  return (
    <>
      <Hero />
      
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

      {/* Featured Products Section - Mobile Optimized */}
      <section className="py-6 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
              Premium Commercial Kitchen Equipment
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto px-2 md:px-4 leading-relaxed">
              Discover our extensive range of high-quality commercial kitchen equipment. 
              From custom-manufactured solutions to trusted brand products - everything you need for your professional kitchen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-6 md:mb-12">
            {/* Manufacturing Products */}
            <TouchCard className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8 rounded-xl">
              <div className="flex items-center mb-3 md:mb-4">
                <div className="bg-blue-600 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900">Custom Manufacturing</h3>
              </div>
              <p className="text-gray-700 mb-4 md:mb-6 text-xs md:text-base leading-relaxed">
                Precision-engineered stainless steel equipment manufactured to your exact specifications. 
                Built for durability, efficiency, and compliance with food safety standards.
              </p>
              <div className="overflow-hidden mb-4 md:mb-6">
                <ProductContainer />
              </div>
              <div>
                <Link
                  href="/products?type=manufacture"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-xs md:text-base transition-colors"
                >
                  View All Manufacturing Products
                  <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </TouchCard>

            {/* Reseller Products */}
            <TouchCard className="bg-gradient-to-br from-green-50 to-green-100 p-4 md:p-8 rounded-xl">
              <div className="flex items-center mb-3 md:mb-4">
                <div className="bg-green-600 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900">Premium Brands</h3>
              </div>
              <p className="text-gray-700 mb-4 md:mb-6 text-xs md:text-base leading-relaxed">
                Curated selection of top-quality commercial kitchen equipment from trusted manufacturers. 
                Ready-to-ship solutions for immediate deployment in your kitchen.
              </p>
              <div className="overflow-hidden mb-4 md:mb-6">
                <ProductContainer isResell={true} />
              </div>
              <div>
                <Link
                  href="/products?type=resell"
                  className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-xs md:text-base transition-colors"
                >
                  View All Brand Products
                  <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </TouchCard>
          </div>
          
          <div className="text-center">
            <TouchButton className="bg-gray-900 text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              <Link href="/products" className="block w-full h-full">
                Browse All Products
              </Link>
            </TouchButton>
          </div>
        </div>
      </section>

      {/* Company Overview Section - Mobile Optimized */}
      <section className="py-6 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-6 text-center lg:text-left px-2">
                Leading Commercial Kitchen Solutions in Pune
              </h2>
              <p className="text-sm md:text-lg text-gray-600 mb-4 md:mb-6 text-center lg:text-left px-2 leading-relaxed">
                Kitchen Kraft Equipments specializes in designing, manufacturing, and delivering 
                top-of-the-line commercial kitchen solutions for restaurants, hotels, and food service businesses. 
                With a focus on innovation, durability, and functionality, we empower culinary professionals 
                to create exceptional experiences efficiently and effectively.
              </p>
              
              <div className="grid grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-8 px-2">
                <div className="text-center">
                  <div className="text-xl md:text-3xl font-bold text-blue-600 mb-1 md:mb-2">15+</div>
                  <div className="text-xs md:text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-3xl font-bold text-green-600 mb-1 md:mb-2">1000+</div>
                  <div className="text-xs md:text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-3xl font-bold text-purple-600 mb-1 md:mb-2">500+</div>
                  <div className="text-xs md:text-sm text-gray-600">Happy Clients</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start px-2">
                <TouchButton className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center">
                  <Link href="/about" className="block w-full h-full">
                    Learn About Us
                  </Link>
                </TouchButton>
                <TouchButton className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors text-center">
                  <Link href="/contact" className="block w-full h-full">
                    Get Free Quote
                  </Link>
                </TouchButton>
              </div>
            </div>
            
            <div className="space-y-3 md:space-y-6 mt-6 lg:mt-0">
              <TouchCard className="bg-white p-3 md:p-6 rounded-xl shadow-md">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Quality & Durability</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Premium-grade stainless steel materials and rigorous testing ensure long-lasting 
                  reliability and flawless functionality in high-performance commercial kitchens.
                </p>
              </TouchCard>
              
              <TouchCard className="bg-white p-3 md:p-6 rounded-xl shadow-md">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Customized Solutions</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Tailored kitchen equipment designed to fit your unique space and operational needs. 
                  From concept to installation, we create solutions that enhance efficiency and workflow.
                </p>
              </TouchCard>
              
              <TouchCard className="bg-white p-3 md:p-6 rounded-xl shadow-md">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Competitive Pricing</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Top-quality commercial kitchen equipment at competitive prices, ensuring value 
                  without compromise. Excellence made affordable for businesses of all sizes.
                </p>
              </TouchCard>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Stats Section */}
      <section className="py-6 md:py-16 bg-blue-50">
        <div className="overflow-hidden">
          <ProductInfoBox />
        </div>
      </section>

      {/* Trusted Clients Section */}
      <section className="py-6 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
              Trusted by Leading Businesses
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto px-2 md:px-4 leading-relaxed">
              From fine dining restaurants to large hotel chains, businesses across Pune trust 
              Kitchen Kraft Equipments for their commercial kitchen needs.
            </p>
          </div>
          <div className="overflow-hidden">
            <Clients />
          </div>
        </div>
      </section>

      {/* Call to Action Section - Mobile Optimized */}
      <section className="py-6 md:py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 px-2">
            Ready to Transform Your Commercial Kitchen?
          </h2>
          <p className="text-sm md:text-xl mb-4 md:mb-8 max-w-2xl mx-auto px-2 md:px-4 leading-relaxed">
            Get expert consultation and customized solutions for your commercial kitchen project. 
            Contact us today for a free quote and professional advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-2">
            <TouchButton className="bg-blue-600 text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              <Link href="/contact" className="block w-full h-full">
                Get Free Consultation
              </Link>
            </TouchButton>
            <TouchButton className="border-2 border-white text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
              <Link href="/services" className="block w-full h-full">
                Explore Our Services
              </Link>
            </TouchButton>
          </div>
        </div>
      </section>
    </>
  );
}
