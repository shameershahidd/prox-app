import type { SortOption } from "../types";
import { retailers } from "../data/products";
import "./FilterBar.css";

interface FilterBarProps {
  activeRetailers: string[];
  onToggleRetailer: (retailer: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function FilterBar({
  activeRetailers,
  onToggleRetailer,
  sort,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__chips" role="group" aria-label="Filter by retailer">
        {retailers.map((retailer) => {
          const active = activeRetailers.includes(retailer);
          return (
            <button
              key={retailer}
              type="button"
              className={`filter-chip ${active ? "filter-chip--active" : ""}`}
              aria-pressed={active}
              onClick={() => onToggleRetailer(retailer)}
            >
              {retailer}
            </button>
          );
        })}
      </div>
      <select
        className="filter-bar__sort"
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        aria-label="Sort by price"
      >
        <option value="relevance">Sort: Relevance</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}
