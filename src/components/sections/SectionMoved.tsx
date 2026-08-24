import Link from 'next/link';

interface Props {
  /**
   * Name of the specific thing the visitor was looking for, when known
   * (e.g. a service title). Lets the copy acknowledge where they landed
   * instead of showing a generic message.
   */
  subject?: string;
}

/**
 * Shown at /services (and /services/[slug]) while the Services section is
 * disabled and the mode is 'moved'.
 *
 * The wording says "reorganized", not "moved" — the client has discontinued
 * services rather than relocating them, so promising a new location would send
 * visitors hunting for a page that does not exist anywhere. Instead we point
 * them at what the business does offer.
 *
 * This page is deliberately `noindex, follow` (set by the route's metadata):
 * it returns 200 so humans get a soft landing, while `noindex` keeps a thin
 * page out of search results and `follow` still passes link equity through to
 * /products.
 */
export default function SectionMoved({ subject }: Props) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-xl w-full text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
          <svg
            className="h-7 w-7 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          We&rsquo;ve reorganized our website
        </h1>

        <p className="text-lg text-gray-600 mb-2">
          {subject
            ? `Our ${subject} page is no longer available.`
            : 'Our services pages are no longer available.'}
        </p>
        <p className="text-gray-600 mb-8">
          We now focus on manufacturing and supplying commercial kitchen
          equipment. Here&rsquo;s where to find what you need.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Browse Products
          </Link>
          <Link
            href="/manufacturing"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Custom Manufacturing
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Contact Us
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Looking for something specific?{' '}
          <Link href="/contact" className="text-blue-600 underline hover:text-blue-700">
            Get in touch
          </Link>{' '}
          and we&rsquo;ll help you find it.
        </p>
      </div>
    </section>
  );
}
