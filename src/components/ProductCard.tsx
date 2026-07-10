import { Link } from "react-router-dom";
import type { DisplayProduct } from "../types";
import "./ProductCard.css";

interface ProductCardProps {
  product: DisplayProduct;
  isSaved: boolean;
  onToggleSave: (product: DisplayProduct) => void;
  showBestBadge?: boolean;
}

export function ProductCard({ product, isSaved, onToggleSave, showBestBadge = false }: ProductCardProps) {
  const cheapestOverall = Math.min(...product.allPrices.map((p) => p.price));
  const isCheapestHere = product.price === cheapestOverall;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__link">
        <div className="product-card__image" aria-hidden="true">
          {product.image}
        </div>
        <div className="product-card__info">
          <div className="product-card__top-row">
            <span className="product-card__name">{product.name}</span>
            {product.isDeal && <span className="product-card__deal-badge">Deal</span>}
          </div>
          <span className="product-card__size">{product.size}</span>
          <span className="product-card__retailer">{product.retailer}</span>
        </div>
        <div className="product-card__price-col">
          <span className="product-card__price">${product.price.toFixed(2)}</span>
          {showBestBadge && isCheapestHere && <span className="product-card__best">Best price</span>}
        </div>
      </Link>
      <button
        type="button"
        className={`product-card__save ${isSaved ? "product-card__save--active" : ""}`}
        onClick={() => onToggleSave(product)}
        aria-pressed={isSaved}
        aria-label={
          isSaved
            ? `Remove ${product.name} from ${product.retailer} from saved deals`
            : `Save ${product.name} from ${product.retailer}`
        }
      >
        {isSaved ? "★" : "☆"}
      </button>
    </div>
  );
}
