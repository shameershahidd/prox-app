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
  allPrices: RetailerPrice[];
  isDeal?: boolean;
}

export interface DisplayProduct extends Product {
  retailer: string;
  price: number;
}

// A "save" is pinned to the specific retailer/price the user saved it at,
// not just the product. Saving "Bananas at Walmart, $0.54" and "Bananas at
// Kroger, $0.57" are two different saved deals — switching a retailer
// filter should never make a saved star appear on a deal you never
// actually saved.
export interface SavedDeal {
  productId: string;
  retailer: string;
  price: number;
}

export type SortOption = "relevance" | "price-asc" | "price-desc";
