import { useCallback, useEffect, useState } from "react";
import type { SavedDeal } from "../types";

const STORAGE_KEY = "prox.savedDeals";

function readSaved(): SavedDeal[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Defensive check: an earlier version of this app stored a plain
    // string[] of product IDs. If we find that shape, discard it rather
    // than crash — it's local dev/demo data, not worth migrating.
    if (!Array.isArray(parsed) || (parsed.length > 0 && typeof parsed[0] !== "object")) {
      return [];
    }
    return parsed as SavedDeal[];
  } catch {
    return [];
  }
}

export function useSavedDeals() {
  const [savedDeals, setSavedDeals] = useState<SavedDeal[]>(() => readSaved());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedDeals));
  }, [savedDeals]);

  const isSaved = useCallback(
    (productId: string, retailer: string) =>
      savedDeals.some((d) => d.productId === productId && d.retailer === retailer),
    [savedDeals]
  );

  const toggleSaved = useCallback((productId: string, retailer: string, price: number) => {
    setSavedDeals((prev) => {
      const exists = prev.some((d) => d.productId === productId && d.retailer === retailer);
      if (exists) {
        return prev.filter((d) => !(d.productId === productId && d.retailer === retailer));
      }
      return [...prev, { productId, retailer, price }];
    });
  }, []);

  return { savedDeals, isSaved, toggleSaved };
}
