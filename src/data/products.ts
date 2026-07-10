import type { Product } from "../types";

export const products: Product[] = [
  {
    id: "p1", name: "Whole Milk", size: "1 gal", category: "Dairy", image: "🥛", isDeal: true,
    allPrices: [
      { retailer: "Publix", price: 3.49 },
      { retailer: "Walmart", price: 3.68 },
      { retailer: "Kroger", price: 3.59 },
    ],
  },
  {
    id: "p2", name: "Large Eggs", size: "12 ct", category: "Dairy", image: "🥚", isDeal: true,
    allPrices: [
      { retailer: "Walmart", price: 2.98 },
      { retailer: "Kroger", price: 3.29 },
      { retailer: "Target", price: 3.49 },
      { retailer: "Publix", price: 3.99 },
    ],
  },
  {
    id: "p3", name: "Sourdough Bread", size: "24 oz loaf", category: "Bakery", image: "🍞",
    allPrices: [
      { retailer: "Kroger", price: 3.99 },
      { retailer: "Publix", price: 4.29 },
      { retailer: "Walmart", price: 3.87 },
    ],
  },
  {
    id: "p4", name: "Bananas", size: "per lb", category: "Produce", image: "🍌",
    allPrices: [
      { retailer: "Walmart", price: 0.54 },
      { retailer: "Kroger", price: 0.59 },
      { retailer: "Publix", price: 0.69 },
      { retailer: "Target", price: 0.62 },
    ],
  },
  {
    id: "p5", name: "Chicken Breast", size: "per lb", category: "Meat", image: "🍗", isDeal: true,
    allPrices: [
      { retailer: "Publix", price: 4.49 },
      { retailer: "Kroger", price: 4.79 },
      { retailer: "Walmart", price: 4.68 },
    ],
  },
  {
    id: "p6", name: "Roma Tomatoes", size: "per lb", category: "Produce", image: "🍅",
    allPrices: [
      { retailer: "Kroger", price: 1.49 },
      { retailer: "Publix", price: 1.79 },
      { retailer: "Walmart", price: 1.38 },
      { retailer: "Target", price: 1.69 },
    ],
  },
  {
    id: "p7", name: "Cheddar Cheese", size: "8 oz block", category: "Dairy", image: "🧀",
    allPrices: [
      { retailer: "Target", price: 3.29 },
      { retailer: "Walmart", price: 3.18 },
      { retailer: "Kroger", price: 3.49 },
    ],
  },
  {
    id: "p8", name: "Ground Coffee", size: "12 oz", category: "Pantry", image: "☕",
    allPrices: [
      { retailer: "Walmart", price: 6.98 },
      { retailer: "Target", price: 7.49 },
      { retailer: "Kroger", price: 7.29 },
    ],
  },
  {
    id: "p9", name: "Greek Yogurt", size: "32 oz tub", category: "Dairy", image: "🍦", isDeal: true,
    allPrices: [
      { retailer: "Publix", price: 4.99 },
      { retailer: "Kroger", price: 5.29 },
      { retailer: "Walmart", price: 5.12 },
      { retailer: "Target", price: 5.49 },
    ],
  },
  {
    id: "p10", name: "Avocados", size: "each", category: "Produce", image: "🥑",
    allPrices: [
      { retailer: "Kroger", price: 0.98 },
      { retailer: "Walmart", price: 0.88 },
    ],
  },
  {
    id: "p11", name: "Orange Juice", size: "52 oz", category: "Beverages", image: "🧃",
    allPrices: [
      { retailer: "Target", price: 4.29 },
      { retailer: "Walmart", price: 4.18 },
      { retailer: "Kroger", price: 4.49 },
    ],
  },
  {
    id: "p12", name: "Spaghetti", size: "16 oz box", category: "Pantry", image: "🍝",
    allPrices: [
      { retailer: "Walmart", price: 1.24 },
      { retailer: "Kroger", price: 1.39 },
      { retailer: "Target", price: 1.49 },
    ],
  },
  {
    id: "p13", name: "Frozen Pizza", size: "26 oz", category: "Frozen", image: "🍕", isDeal: true,
    allPrices: [
      { retailer: "Kroger", price: 5.49 },
      { retailer: "Walmart", price: 5.67 },
      { retailer: "Target", price: 5.99 },
      { retailer: "Publix", price: 6.49 },
    ],
  },
  {
    id: "p14", name: "Baby Spinach", size: "5 oz clamshell", category: "Produce", image: "🥬",
    allPrices: [
      { retailer: "Publix", price: 2.99 },
      { retailer: "Walmart", price: 2.87 },
    ],
  },
  {
    id: "p15", name: "Peanut Butter", size: "16 oz jar", category: "Pantry", image: "🥜",
    allPrices: [
      { retailer: "Target", price: 3.49 },
      { retailer: "Walmart", price: 3.32 },
      { retailer: "Kroger", price: 3.59 },
    ],
  },
  {
    id: "p16", name: "Salmon Fillet", size: "per lb", category: "Meat", image: "🐟",
    allPrices: [
      { retailer: "Walmart", price: 8.98 },
      { retailer: "Publix", price: 9.99 },
      { retailer: "Kroger", price: 9.49 },
    ],
  },
  {
    id: "p17", name: "Cereal", size: "18 oz box", category: "Pantry", image: "🥣", isDeal: true,
    allPrices: [
      { retailer: "Kroger", price: 3.79 },
      { retailer: "Target", price: 3.99 },
      { retailer: "Walmart", price: 3.86 },
      { retailer: "Publix", price: 4.49 },
    ],
  },
  {
    id: "p18", name: "Sparkling Water", size: "12 pk", category: "Beverages", image: "🫧",
    allPrices: [
      { retailer: "Target", price: 4.99 },
      { retailer: "Walmart", price: 4.78 },
    ],
  },
];

export const retailers = ["Walmart", "Target", "Kroger", "Publix"];
export const categories = [
  "Dairy", "Bakery", "Produce", "Meat", "Pantry", "Frozen", "Beverages",
];
