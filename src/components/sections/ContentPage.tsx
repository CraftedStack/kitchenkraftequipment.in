import Link from 'next/link';
import { api } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface Props {
  /** page_seo key, e.g. 'privacy'. */
  pageKey: string;
  /** Path this page is served from, for the breadcrumb trail. */
  path: string;
  /** Used when the API is unreachable, so the page never renders empty. */
  fallbackHeading: string;
  fallbackBody: string;
}

/**
 * Prose page driven by an admin-editable page_seo row.
 *
 * Used for the footer content pages (privacy, terms, warranty, support,
 * careers). Body copy is stored as plain text with blank lines between
 * paragraphs, which is what the Page SEO editor produces, so the client edits
 * these without touching code or markup.
 */
export default async function ContentPage({
  pageKey,
  path,
  fallbackHeading,
  fallbackBody,
}: Props) {
  const page = await api.getPageSeo(pageKey).catch(() => null);

  const heading = page?.heading?.trim() || fallbackHeading;
  const body = page?.intro_content?.trim() || fallbackBody;

  // Blank line separates paragraphs; single newlines stay inside a paragraph.
  const paragraphs = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: heading, href: path },
        ]}
      />

      <article className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-8">
            {heading}
          </h1>

          <div className="space-y-5">
            {paragraphs.map((text, i) => (
              <p key={i} className="text-gray-600 leading-relaxed">
                {text}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-gray-600 mb-4">
              Have a question about any of the above?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
