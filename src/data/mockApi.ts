import { products } from "./products";
import { toDisplayProduct } from "./pricing";
import type { DisplayProduct, Product, SortOption } from "../types";

const NETWORK_DELAY_MS = 650;

export interface SearchParams {
  query: string;
  retailerFilter: string[];
  sort: SortOption;
}

export function searchProducts({
  query,
  retailerFilter,
  sort,
}: SearchParams): Promise<DisplayProduct[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (query.trim().toLowerCase() === "error") {
        reject(new Error("Could not reach Prox servers. Check your connection and try again."));
        return;
      }

      const matchesQuery = (name: string, category: string) =>
        query.trim()
          ? name.toLowerCase().includes(query.trim().toLowerCase()) ||
            category.toLowerCase().includes(query.trim().toLowerCase())
          : true;

      let results = products
        .filter((p) => matchesQuery(p.name, p.category))
        .map((p) => toDisplayProduct(p, retailerFilter));

      if (sort === "price-asc") {
        results = [...results].sort((a, b) => a.price - b.price);
      } else if (sort === "price-desc") {
        results = [...results].sort((a, b) => b.price - a.price);
      }

      resolve(results);
    }, NETWORK_DELAY_MS);
  });
}

export function fetchProductById(id: string): Promise<Product | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find((p) => p.id === id));
    }, NETWORK_DELAY_MS / 2);
  });
}
