import { FAQSchema } from '@/components/seo/StructuredData';

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Per-product FAQ, entered by an admin against the product.
 *
 * Uses native <details>/<summary> rather than a JS accordion: it works before
 * hydration, is keyboard accessible for free, and Google can read the answers
 * whether or not an item is open. Also emits FAQPage structured data, which
 * makes the product page eligible for expandable FAQ results in search.
 */
export default function ProductFaq({ faqs }: { faqs?: FaqItem[] }) {
  const items = (faqs || []).filter((f) => f?.question?.trim() && f?.answer?.trim());
  if (items.length === 0) return null;

  return (
    <section className="py-12 border-t border-gray-100">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">
          Common questions
        </h2>

        <div className="divide-y divide-gray-100">
          {items.map((faq, i) => (
            <details key={i} className="group py-4">
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                <span className="font-medium text-gray-900 leading-snug">
                  {faq.question}
                </span>
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-600 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <FAQSchema faqs={items} />
    </section>
  );
}
