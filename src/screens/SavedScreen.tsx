import { useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useSavedDeals } from "../hooks/useSavedDeals";
import { ProductCard } from "../components/ProductCard";
import { EmptyState } from "../components/EmptyState";
import type { DisplayProduct } from "../types";
import "./Screen.css";

export function SavedScreen() {
  const { savedDeals, isSaved, toggleSaved } = useSavedDeals();
  const navigate = useNavigate();

  // Rebuild each saved item using the EXACT retailer/price it was saved at
  // — not recomputed via toDisplayProduct() — so Saved Deals always shows
  // what the user actually saved, even if that retailer has since stopped
  // being the cheapest option.
  const savedProducts: DisplayProduct[] = savedDeals
    .map((deal) => {
      const base = products.find((p) => p.id === deal.productId);
      if (!base) return null;
      return { ...base, retailer: deal.retailer, price: deal.price };
    })
    .filter((p): p is DisplayProduct => p !== null);

  return (
    <div className="screen">
      <header className="screen__header">
        <p className="screen__eyebrow">Prox</p>
        <h1 className="screen__title">Your saved deals</h1>
      </header>

      <div className="screen__body">
        {savedProducts.length === 0 ? (
          <EmptyState
            icon="☆"
            title="Nothing saved yet"
            description="Tap the star on any deal to keep track of it here."
            actionLabel="Browse deals"
            onAction={() => navigate("/")}
          />
        ) : (
          <div className="product-list">
            {savedProducts.map((product) => (
              <ProductCard
                key={`${product.id}-${product.retailer}`}
                product={product}
                isSaved={isSaved(product.id, product.retailer)}
                onToggleSave={(p) => toggleSaved(p.id, p.retailer, p.price)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
