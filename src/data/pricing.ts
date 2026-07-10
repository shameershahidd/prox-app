import type { Product, DisplayProduct } from "../types";

/**
 * Turns a Product into one DisplayProduct per retailer (or per retailer in
 * the active filter, if one is set). Every matching product can now appear
 * multiple times in a results list — once per retailer carrying it — so the
 * comparison is visible directly in the list instead of hidden behind the
 * detail screen. Rows are returned cheapest-first within the product, purely
 * for a nicer default (relevance) read; price-asc/price-desc sorting at the
 * search layer overrides this ordering globally.
 */
export function toDisplayProducts(product: Product, retailerFilter: string[] = []): DisplayProduct[] {
  const candidates = retailerFilter.length
    ? product.allPrices.filter((p) => retailerFilter.includes(p.retailer))
    : product.allPrices;

  return [...candidates]
    .sort((a, b) => a.price - b.price)
    .map((rp) => ({ ...product, retailer: rp.retailer, price: rp.price }));
}
