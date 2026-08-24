import { Metadata } from 'next';
import { api } from '@/lib/api';
import { seoManager } from '@/lib/seo';
import CategorySection from '@/components/products/CategorySection';
import { MANUFACTURING_SECTION, RESERVED_SLUGS, sectionForGenre } from '@/lib/productSections';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  try {
    const genres = await api.getGenresByType('manufacture');
    return genres
      .filter((genre) => !RESERVED_SLUGS.has(genre.slug))
      .map((genre) => ({ category: genre.slug }));
  } catch (error) {
    console.error('Failed to generate static params for manufacturing categories:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { category } = await params;
    const categoryData = await api.getGenreBySlug(category);

    // Only own the metadata for categories that belong to this section.
    if (!categoryData || sectionForGenre(categoryData).basePath !== MANUFACTURING_SECTION.basePath) {
      return {
        title: 'Category Not Found | Kitchen Kraft Equipments',
        description: 'The requested product category was not found.',
      };
    }

    return seoManager.generateCategoryMetadata(categoryData);
  } catch (error) {
    console.error('Failed to generate metadata for manufacturing category:', error);
    return {
      title: 'Manufacturing | Kitchen Kraft Equipments',
      description: 'Custom-manufactured commercial kitchen equipment.',
    };
  }
}

export default async function ManufacturingCategoryPage({ params }: PageProps) {
  const { category } = await params;
  return <CategorySection categorySlug={category} section={MANUFACTURING_SECTION} />;
}
