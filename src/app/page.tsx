import { Metadata } from 'next';
import Link from 'next/link';
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import ProductInfoBox from "@/components/ProductInfoBox";
import HomepageProductSection from "@/components/homepage/HomepageProductSection";
import { seoManager } from "@/lib/seo";
import { getPublicFlags } from "@/lib/publicFlags";
import HomeServicesSection from "@/components/homepage/HomeServicesSection";
import { TouchButton, TouchCard } from "@/components/ui/TouchFeedback";

// Generate metadata for homepage
export const metadata: Metadata = seoManager.generateHomepageMetadata();

export default async function HomePage() {
  const flags = await getPublicFlags();

  return (
    <>
      <Hero />
      
      {flags.services && <HomeServicesSection />}

      {/* Featured Products Section - Updated with Category Cards */}
      <HomepageProductSection />

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
              <Link href={flags.services ? '/services' : '/products'} className="block w-full h-full">
                {flags.services ? 'Explore Our Services' : 'Explore Our Products'}
              </Link>
            </TouchButton>
          </div>
        </div>
      </section>
    </>
  );
}
