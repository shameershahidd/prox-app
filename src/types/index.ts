export interface RetailerPrice {
  retailer: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  size: string;
  category: string;
  image: string;
  retailer: string;
  price: number;
  allPrices: RetailerPrice[];
  isDeal?: boolean;
}

export type SortOption = "relevance" | "price-asc" | "price-desc";
