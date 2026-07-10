import type { Product, RetailerPrice, DisplayProduct } from "../types";

/**
 * Every product in the catalog is carried by all four retailers (allPrices
 * always has one entry per retailer) — that's what makes cross-retailer
 * comparison possible. So a retailer filter should REPRICE each product to
 * that retailer's price, not remove products that "belong" to a different
 * retailer. With no filter active, we show the cheapest price anywhere,
 * since surfacing the best deal is the whole point of the app.
 */
export function toDisplayProduct(product: Product, retailerFilter: string[] = []): DisplayProduct {
  const candidates: RetailerPrice[] = retailerFilter.length
    ? product.allPrices.filter((p) => retailerFilter.includes(p.retailer))
    : product.allPrices;

  const cheapest = candidates.reduce((min, curr) => (curr.price < min.price ? curr : min), candidates[0]);

  return { ...product, retailer: cheapest.retailer, price: cheapest.price };
}
