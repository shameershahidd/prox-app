import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../data/mockApi";
import type { Product } from "../types";
import { useSavedDeals } from "../hooks/useSavedDeals";
import { SkeletonList } from "../components/SkeletonCard";
import { EmptyState } from "../components/EmptyState";
import "./ProductDetailScreen.css";

export function ProductDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const { isSaved, toggleSaved } = useSavedDeals();

  useEffect(() => {
    if (!id) return;
    setProduct(undefined);
    fetchProductById(id).then((result) => setProduct(result ?? null));
  }, [id]);

  // "Save this deal" always refers to the cheapest price shown at the top
  // of the comparison list below (the one already labeled "Cheapest"), not
  // an arbitrary retailer — so the star and CTA stay meaningful without
  // asking the user to pick a retailer first.
  const sortedPrices = product ? [...product.allPrices].sort((a, b) => a.price - b.price) : [];
  const bestEntry = sortedPrices[0];

  return (
    <div className="detail-screen">
      <div className="detail-screen__topbar">
        <button
          type="button"
          className="detail-screen__back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          ←
        </button>
        <span className="detail-screen__topbar-title">Product</span>
        <span className="detail-screen__spacer" />
      </div>

      {product === undefined && (
        <div className="detail-screen__loading">
          <SkeletonList count={1} />
        </div>
      )}

      {product === null && (
        <EmptyState
          icon="❓"
          title="Product not found"
          description="This item may have been removed. Head back and try another search."
          actionLabel="Back to search"
          onAction={() => navigate("/")}
        />
      )}

      {product && bestEntry && (
        <div className="detail-screen__body">
          <div className="detail-screen__hero" aria-hidden="true">
            {product.image}
          </div>

          <div className="detail-screen__title-row">
            <div>
              <h1 className="detail-screen__name">{product.name}</h1>
              <p className="detail-screen__size">{product.size} · {product.category}</p>
            </div>
            <button
              type="button"
              className={`detail-screen__save ${isSaved(product.id, bestEntry.retailer) ? "detail-screen__save--active" : ""}`}
              onClick={() => toggleSaved(product.id, bestEntry.retailer, bestEntry.price)}
              aria-pressed={isSaved(product.id, bestEntry.retailer)}
            >
              {isSaved(product.id, bestEntry.retailer) ? "★ Saved" : "☆ Save"}
            </button>
          </div>

          <section className="detail-screen__compare">
            <h2 className="detail-screen__section-title">Compare prices nearby</h2>
            <ul className="price-compare-list">
              {sortedPrices.map((entry, index) => (
                <li
                  key={entry.retailer}
                  className={`price-compare-row ${index === 0 ? "price-compare-row--best" : ""}`}
                >
                  <span className="price-compare-row__retailer">{entry.retailer}</span>
                  {index === 0 && <span className="price-compare-row__tag">Cheapest</span>}
                  <span className="price-compare-row__price">${entry.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </section>

          <button
            type="button"
            className="detail-screen__cta"
            onClick={() => toggleSaved(product.id, bestEntry.retailer, bestEntry.price)}
          >
            {isSaved(product.id, bestEntry.retailer) ? "Remove from saved deals" : "Save this deal"}
          </button>
        </div>
      )}
    </div>
  );
}
