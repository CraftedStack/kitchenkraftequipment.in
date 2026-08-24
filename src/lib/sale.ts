import type { Product } from './api';

export interface SaleInfo {
  onSale: boolean;
  /** Original price as a number, or null if unparseable. */
  original: number | null;
  /** Discounted price as a number (only when onSale). */
  sale: number | null;
  /** Whole-number percent off for display (e.g. 15). */
  percent: number | null;
}

const toNum = (v: unknown): number | null => {
  if (v === null || v === undefined || v === '') return null;
  const n = typeof v === 'number' ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : null;
};

/**
 * Derive display sale info for a product. Trusts the backend's `on_sale` flag
 * (which already accounts for the schedule) but falls back to a local check on
 * sale_price if the flag is absent. Returns onSale=false when there's no valid,
 * lower sale price.
 */
export function getSaleInfo(product: Pick<Product, 'price' | 'sale_price' | 'sale_percent' | 'on_sale'>): SaleInfo {
  const original = toNum(product.price);
  const sale = toNum(product.sale_price);

  const scheduleOk = product.on_sale !== false; // undefined → allow; false → blocked
  const valid = original !== null && sale !== null && sale > 0 && sale < original && scheduleOk;

  if (!valid) {
    return { onSale: false, original, sale: null, percent: null };
  }

  const percent =
    toNum(product.sale_percent) ?? Math.round((1 - (sale as number) / (original as number)) * 100);

  return { onSale: true, original, sale, percent: Math.round(percent) };
}

/** Format a number as ₹ with Indian grouping. */
export const formatINR = (n: number): string => `₹${n.toLocaleString('en-IN')}`;
