import { Metadata } from 'next';
import Link from 'next/link';
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import ProductContainer from "@/components/ProductContainer";
import ProductInfoBox from "@/components/ProductInfoBox";
import { seoManager } from "@/lib/seo";

// Generate metadata for homepage
export const metadata: Metadata = seoManager.generateHomepageMetadata();

export default function HomePage() {
  return (
    <>
      <Hero />
      
      {/* Services Overview Section */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Professional Commercial Kitchen Services
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Complete solutions for your commercial kitchen needs - from custom design and manufacturing 
              to installation and ongoing maintenance. Serving restaurants, hotels, and food businesses across Pune.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
              <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto sm:mx-0">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d={service.icon} clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center sm:text-left">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4 text-center sm:text-left">{service.description}</p>
                <Link 
                  href={service.href}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center justify-center sm:justify-start w-full sm:w-auto"
                >
                  Learn More
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 md:mt-12">
            <Link
              href="/services"
              className="inline-block bg-blue-600 text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Premium Commercial Kitchen Equipment
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Discover our extensive range of high-quality commercial kitchen equipment. 
              From custom-manufactured solutions to trusted brand products - everything you need for your professional kitchen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Manufacturing Products */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Custom Manufacturing</h3>
              </div>
              <p className="text-gray-700 mb-6 text-sm md:text-base">
                Precision-engineered stainless steel equipment manufactured to your exact specifications. 
                Built for durability, efficiency, and compliance with food safety standards.
              </p>
              <div className="overflow-hidden">
                <ProductContainer />
              </div>
              <div className="mt-6">
                <Link
                  href="/products?type=manufacture"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm md:text-base"
                >
                  View All Manufacturing Products
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Reseller Products */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 md:p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Premium Brands</h3>
              </div>
              <p className="text-gray-700 mb-6 text-sm md:text-base">
                Curated selection of top-quality commercial kitchen equipment from trusted manufacturers. 
                Ready-to-ship solutions for immediate deployment in your kitchen.
              </p>
              <div className="overflow-hidden">
                <ProductContainer isResell={true} />
              </div>
              <div className="mt-6">
                <Link
                  href="/products?type=resell"
                  className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm md:text-base"
                >
                  View All Brand Products
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              href="/products"
              className="inline-block bg-gray-900 text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 text-center lg:text-left">
                Leading Commercial Kitchen Solutions in Pune
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 text-center lg:text-left">
                Kitchen Kraft Equipments specializes in designing, manufacturing, and delivering 
                top-of-the-line commercial kitchen solutions for restaurants, hotels, and food service businesses. 
                With a focus on innovation, durability, and functionality, we empower culinary professionals 
                to create exceptional experiences efficiently and effectively.
              </p>
              
              <div className="grid grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">15+</div>
                  <div className="text-xs md:text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">1000+</div>
                  <div className="text-xs md:text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">500+</div>
                  <div className="text-xs md:text-sm text-gray-600">Happy Clients</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/about"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Learn About Us
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors text-center"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
            
            <div className="space-y-4 md:space-y-6 mt-8 lg:mt-0">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality & Durability</h3>
                <p className="text-gray-600 text-sm">
                  Premium-grade stainless steel materials and rigorous testing ensure long-lasting 
                  reliability and flawless functionality in high-performance commercial kitchens.
                </p>
              </div>
              
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Customized Solutions</h3>
                <p className="text-gray-600 text-sm">
                  Tailored kitchen equipment designed to fit your unique space and operational needs. 
                  From concept to installation, we create solutions that enhance efficiency and workflow.
                </p>
              </div>
              
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Competitive Pricing</h3>
                <p className="text-gray-600 text-sm">
                  Top-quality commercial kitchen equipment at competitive prices, ensuring value 
                  without compromise. Excellence made affordable for businesses of all sizes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Stats Section */}
      <section className="py-8 md:py-16 bg-blue-50">
        <div className="overflow-hidden">
          <ProductInfoBox />
        </div>
      </section>

      {/* Trusted Clients Section */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Trusted by Leading Businesses
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              From fine dining restaurants to large hotel chains, businesses across Pune trust 
              Kitchen Kraft Equipments for their commercial kitchen needs.
            </p>
          </div>
          <div className="overflow-hidden">
            <Clients />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-8 md:py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Commercial Kitchen?
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Get expert consultation and customized solutions for your commercial kitchen project. 
            Contact us today for a free quote and professional advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
