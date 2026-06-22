import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { SITE_CONFIG } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ServiceSchema } from '@/components/seo/StructuredData';
import ServiceInquiryForm from '@/components/forms/ServiceInquiryForm';

export const revalidate = 3600;

const COLOR_GRADIENTS: Record<string, string> = {
  blue: 'from-blue-600 to-blue-800',
  green: 'from-green-600 to-green-800',
  purple: 'from-purple-600 to-purple-800',
  gray: 'from-gray-600 to-gray-800',
  red: 'from-red-600 to-red-800',
  orange: 'from-orange-500 to-orange-700',
};

const COLOR_ACCENT: Record<string, string> = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  purple: 'text-purple-600',
  gray: 'text-gray-600',
  red: 'text-red-600',
  orange: 'text-orange-600',
};

const COLOR_BG: Record<string, string> = {
  blue: 'bg-blue-50',
  green: 'bg-green-50',
  purple: 'bg-purple-50',
  gray: 'bg-gray-50',
  red: 'bg-red-50',
  orange: 'bg-orange-50',
};

export async function generateStaticParams() {
  try {
    const services = await api.getServices();
    return services.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await api.getServiceBySlug(slug);
  if (!service) return {};

  const title = service.seo_title || `${service.title} | Kitchen Kraft Equipments`;
  const description = service.seo_description || service.description || `${service.title} services from Kitchen Kraft Equipments, Pune.`;
  const keywords = service.seo_keywords?.split(',').map((k) => k.trim()).filter(Boolean) || [];
  const url = `${SITE_CONFIG.url}/services/${slug}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      images: service.image_url ? [{ url: service.image_url }] : [],
    },
    alternates: { canonical: url },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await api.getServiceBySlug(slug);
  if (!service) notFound();

  const gradient = COLOR_GRADIENTS[service.color_theme] || COLOR_GRADIENTS.blue;
  const accent = COLOR_ACCENT[service.color_theme] || COLOR_ACCENT.blue;
  const bgLight = COLOR_BG[service.color_theme] || COLOR_BG.blue;
  const serviceUrl = `${SITE_CONFIG.url}/services/${slug}`;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: service.title, href: `/services/${slug}` },
  ];

  return (
    <>
      <ServiceSchema
        serviceName={service.title}
        serviceDescription={service.seo_description || service.description || service.title}
        serviceUrl={serviceUrl}
      />
      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero */}
      <section className={`bg-gradient-to-r ${gradient} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
              {service.subtitle && (
                <p className="text-lg text-white/80 mb-4">{service.subtitle}</p>
              )}
              {service.description && (
                <p className="text-xl mb-8">{service.description}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/contact?service=${slug}`}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Get Quote
                </Link>
                <Link
                  href="/contact?type=consultation"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
                >
                  Free Consultation
                </Link>
              </div>
            </div>
            {service.image_url && (
              <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, idx) => (
                <div key={idx} className={`${bgLight} rounded-xl p-6`}>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                    <svg className={`w-4 h-4 ${accent}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Steps */}
      {service.process_steps && service.process_steps.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Our Process
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.process_steps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className={`w-12 h-12 rounded-xl ${bgLight} flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-lg font-bold ${accent}`}>{step.step}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Why Choose Our {service.title}?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <svg className={`w-6 h-6 ${accent} flex-shrink-0 mt-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Packages */}
      {service.packages && service.packages.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Pricing Packages
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {service.packages.map((pkg, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className={`text-2xl font-bold ${accent} mb-6`}>{pkg.price}</p>
                  <ul className="space-y-3">
                    {pkg.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?service=${slug}&package=${encodeURIComponent(pkg.name)}`}
                    className={`mt-6 block text-center py-2 rounded-lg border-2 border-current ${accent} hover:opacity-80 font-semibold transition text-sm`}
                  >
                    Get This Package
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faq && service.faq.length > 0 && (
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {service.faq.map((item, idx) => (
                <details key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900 list-none">
                    {item.question}
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry Form */}
      <section className={`py-16 ${bgLight}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Get a Quote for {service.title}
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
          <ServiceInquiryForm serviceName={service.title} serviceSlug={slug} />
        </div>
      </section>
    </>
  );
}
