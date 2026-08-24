import { Metadata } from 'next';
import { api } from '@/lib/api';
import { seoManager } from '@/lib/seo';
import ProductSection from '@/components/products/ProductSection';
import { MANUFACTURING_SECTION, sectionForGenre } from '@/lib/productSections';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  try {
    const genres = await api.getGenresByType('manufacture');
    const manufacturingSlugs = new Set(genres.map((g) => g.slug));
    const allProducts = await api.getAllProducts();
    return allProducts
      .filter((product) => manufacturingSlugs.has(product.categorySlug))
      .map((product) => ({ category: product.categorySlug, slug: product.slug }));
  } catch (error) {
    console.error('Failed to generate static params for manufacturing products:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { category, slug } = await params;
    const categoryData = await api.getGenreBySlug(category);

    if (!categoryData || sectionForGenre(categoryData).basePath !== MANUFACTURING_SECTION.basePath) {
      return {
        title: 'Product Not Found | Kitchen Kraft Equipments',
        description: 'The requested product was not found.',
      };
    }

    const product = await api.getProductBySlug(category, slug);
    if (!product) {
      return {
        title: 'Product Not Found | Kitchen Kraft Equipments',
        description: 'The requested product was not found.',
      };
    }

    return seoManager.generateProductMetadata(product, MANUFACTURING_SECTION.basePath);
  } catch (error) {
    console.error('Failed to generate metadata for manufacturing product:', error);
    return {
      title: 'Product | Kitchen Kraft Equipments',
      description: 'Commercial kitchen equipment from Kitchen Kraft Equipments.',
    };
  }
}

export default async function ManufacturingProductPage({ params }: PageProps) {
  const { category, slug } = await params;
  return <ProductSection category={category} slug={slug} section={MANUFACTURING_SECTION} />;
}
