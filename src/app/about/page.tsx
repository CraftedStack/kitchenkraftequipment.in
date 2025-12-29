import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { seoManager } from '@/lib/seo';
import { COMPANY_INFO } from '@/lib/constants';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

// Generate metadata for about page
export const metadata: Metadata = seoManager.generatePageMetadata({
  title: 'About Kitchen Kraft Equipments - Leading Commercial Kitchen Manufacturers',
  description: 'Learn about Kitchen Kraft Equipments, Pune\'s leading manufacturer of commercial kitchen equipment. Our story, mission, and commitment to quality stainless steel kitchen solutions.',
  keywords: [
    'about kitchen kraft',
    'commercial kitchen manufacturers pune',
    'kitchen equipment company',
    'stainless steel manufacturers',
    'commercial kitchen solutions',
    'kitchen kraft history'
  ],
  path: '/about'
});

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' }
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Kitchen Kraft Equipments
              </h1>
              <p className="text-xl mb-8">
                Leading manufacturer of premium commercial kitchen equipment in Pune. 
                We specialize in custom stainless steel solutions for restaurants, 
                hotels, and food service businesses across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Contact Us
                </Link>
                <Link
                  href="/services"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
                >
                  Our Services
                </Link>
              </div>
            </div>
            <div className="relative h-96">
              <Image
                src="/imgs/about/company-hero.jpg"
                alt="Kitchen Kraft Equipments"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story - From Vision to Industry Leadership
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded with a vision to revolutionize commercial kitchen solutions in Pune, 
                Kitchen Kraft Equipments has been serving the food service industry with 
                dedication and excellence for over 15 years. Our journey began with a simple 
                mission: to provide high-quality, durable, and efficient kitchen equipment 
                that helps restaurants, hotels, and food businesses succeed.
              </p>
              <p className="text-gray-600 mb-6">
                Starting as a small manufacturing unit specializing in stainless steel kitchen 
                equipment, we have grown into a comprehensive solution provider offering everything 
                from custom equipment design and manufacturing to complete kitchen setup, installation, 
                and maintenance services. Our commitment to quality, innovation, and customer 
                satisfaction has made us a trusted partner for hundreds of restaurants, hotels, 
                catering businesses, and food service establishments across Maharashtra.
              </p>
              <p className="text-gray-600 mb-8">
                Today, Kitchen Kraft Equipments stands as one of Pune's leading commercial kitchen 
                equipment manufacturers, continuing to innovate and expand our capabilities. Our 
                state-of-the-art manufacturing facility, experienced team of engineers and craftsmen, 
                and commitment to using premium-grade stainless steel (SS 304/316) ensure that 
                every product meets the highest standards of quality, durability, and performance.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Milestones</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    <strong>2008:</strong> Founded as a small stainless steel fabrication unit
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    <strong>2012:</strong> Expanded to commercial kitchen equipment manufacturing
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    <strong>2016:</strong> Launched comprehensive kitchen design services
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    <strong>2020:</strong> Achieved ISO certification and expanded client base
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    <strong>2023:</strong> Completed 1000+ successful kitchen projects
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative h-96">
              <Image
                src="/imgs/about/our-story.jpg"
                alt="Kitchen Kraft Equipments - Our Story and Journey"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Driving excellence in commercial kitchen solutions through innovation, 
              quality, and customer-centric approach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                To provide innovative, high-quality commercial kitchen equipment and 
                comprehensive solutions that empower food service businesses to achieve 
                operational excellence and sustainable growth.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Deliver superior quality products
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Provide exceptional customer service
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Foster long-term partnerships
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 mb-4">
                To be the most trusted and preferred partner for commercial kitchen 
                solutions in India, recognized for our innovation, quality, and 
                commitment to customer success.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Industry leadership in innovation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Nationwide market presence
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Sustainable business practices
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide our decisions and define our culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Quality Excellence',
                description: 'Uncompromising commitment to quality in every product and service we deliver.',
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              },
              {
                title: 'Customer Focus',
                description: 'Putting customer needs at the center of everything we do and deliver.',
                icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              },
              {
                title: 'Innovation',
                description: 'Continuously improving and innovating to meet evolving market demands.',
                icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
              },
              {
                title: 'Integrity',
                description: 'Conducting business with honesty, transparency, and ethical practices.',
                icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Kitchen Kraft?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover what sets us apart in the commercial kitchen equipment industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Craftsmanship',
                description: 'Skilled artisans and modern manufacturing techniques ensure superior quality products.',
                stats: '15+ Years Experience'
              },
              {
                title: 'Custom Solutions',
                description: 'Tailored equipment and kitchen designs to meet your specific business requirements.',
                stats: '500+ Custom Projects'
              },
              {
                title: 'Premium Materials',
                description: 'High-grade stainless steel (SS 304/316) for durability and hygiene compliance.',
                stats: '100% SS Grade Materials'
              },
              {
                title: 'Comprehensive Service',
                description: 'End-to-end solutions from design and manufacturing to installation and maintenance.',
                stats: 'Complete Solutions'
              },
              {
                title: 'Quick Turnaround',
                description: 'Efficient production processes ensure timely delivery without compromising quality.',
                stats: '7-15 Days Delivery'
              },
              {
                title: 'Local Support',
                description: 'Based in Pune with local support team for quick response and service.',
                stats: '24/7 Support Available'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {feature.description}
                </p>
                <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full inline-block">
                  {feature.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Facility */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96">
              <Image
                src="/imgs/about/manufacturing-facility.jpg"
                alt="Manufacturing Facility"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                State-of-the-Art Manufacturing
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our modern manufacturing facility in Pune is equipped with advanced 
                machinery and technology to produce high-quality commercial kitchen 
                equipment that meets international standards.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Advanced Machinery</h3>
                    <p className="text-gray-600 text-sm">CNC machines, laser cutting, and precision welding equipment.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Quality Control</h3>
                    <p className="text-gray-600 text-sm">Rigorous testing and quality assurance at every production stage.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Skilled Workforce</h3>
                    <p className="text-gray-600 text-sm">Experienced craftsmen and engineers dedicated to excellence.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Standards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Certifications & Standards
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality is validated by industry certifications 
              and adherence to international standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'ISO Certified',
                description: 'Quality management system certification for consistent excellence.',
                badge: 'ISO 9001:2015'
              },
              {
                title: 'Food Safety',
                description: 'Compliance with food safety and hygiene standards.',
                badge: 'HACCP Compliant'
              },
              {
                title: 'Material Grade',
                description: 'Premium stainless steel grades for durability and safety.',
                badge: 'SS 304/316'
              },
              {
                title: 'Industry Standards',
                description: 'Adherence to commercial kitchen equipment standards.',
                badge: 'NSF Approved'
              }
            ].map((cert, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {cert.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {cert.description}
                </p>
                <div className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {cert.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Get in Touch
              </h2>
              <p className="text-xl mb-8">
                Ready to discuss your commercial kitchen project? Contact us today 
                for expert consultation and customized solutions.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{COMPANY_INFO.contact.address.full}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{COMPANY_INFO.contact.phone}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{COMPANY_INFO.contact.email}</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-10 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                <p className="text-lg mb-2">{COMPANY_INFO.contact.hours.weekdays}</p>
                <p className="text-lg">{COMPANY_INFO.contact.hours.weekend}</p>
                
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                  >
                    Contact Us Today
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}