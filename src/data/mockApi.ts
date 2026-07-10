import type { Product, SortOption } from "../types";
import { products } from "./products";

interface SearchParams {
  query: string;
  retailerFilter: string[];
  sort: SortOption;
}

export function searchProducts({
  query,
  retailerFilter,
  sort,
}: SearchParams): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const normalized = query.trim().toLowerCase();

      if (normalized === "error") {
        reject(
          new Error(
            "Could not reach Prox servers. Check your connection and try again."
          )
        );
        return;
      }

      let results = products.filter((p) => {
        const matchesQuery =
          normalized === "" ||
          p.name.toLowerCase().includes(normalized) ||
          p.category.toLowerCase().includes(normalized);

        const matchesRetailer =
          retailerFilter.length === 0 ||
          retailerFilter.includes(p.retailer);

        return matchesQuery && matchesRetailer;
      });

      if (sort === "price-asc") {
        results = [...results].sort((a, b) => a.price - b.price);
      } else if (sort === "price-desc") {
        results = [...results].sort((a, b) => b.price - a.price);
      }

      resolve(results);
    }, 650);
  });
}

export function fetchProductById(id: string): Promise<Product | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find((p) => p.id === id));
    }, 325);
  });
}
