import { useEffect, useState } from "react";
import { searchProducts } from "../data/mockApi";
import type { DisplayProduct, SortOption } from "../types";
import { ProductCard } from "../components/ProductCard";
import { FilterBar } from "../components/FilterBar";
import { SkeletonList } from "../components/SkeletonCard";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { useSavedDeals } from "../hooks/useSavedDeals";
import "./SearchScreen.css";

type Status = "loading" | "success" | "error";

export function SearchScreen() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [retailerFilter, setRetailerFilter] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("relevance");
  const [status, setStatus] = useState<Status>("loading");
  const [results, setResults] = useState<DisplayProduct[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { isSaved, toggleSaved } = useSavedDeals();

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const runSearch = () => {
    setStatus("loading");
    searchProducts({ query: debouncedQuery, retailerFilter, sort })
      .then((products) => {
        setResults(products);
        setStatus("success");
      })
      .catch((err: Error) => {
        setErrorMessage(err.message);
        setStatus("error");
      });
  };

  useEffect(() => {
    runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, retailerFilter, sort]);

  const toggleRetailer = (retailer: string) => {
    setRetailerFilter((prev) =>
      prev.includes(retailer) ? prev.filter((r) => r !== retailer) : [...prev, retailer]
    );
  };

  return (
    <div className="screen">
      <header className="screen__header">
        <p className="screen__eyebrow">Prox</p>
        <h1 className="screen__title">Find today's best deal</h1>
        <div className="search-bar">
          <span className="search-bar__icon" aria-hidden="true">🔎</span>
          <input
            className="search-bar__input"
            type="search"
            placeholder="Search milk, eggs, bread…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search groceries"
          />
        </div>
      </header>

      <FilterBar
        activeRetailers={retailerFilter}
        onToggleRetailer={toggleRetailer}
        sort={sort}
        onSortChange={setSort}
      />

      <div className="screen__body">
        {status === "loading" && <SkeletonList />}

        {status === "error" && <ErrorState message={errorMessage} onRetry={runSearch} />}

        {status === "success" && results.length === 0 && (
          <EmptyState
            icon="🛒"
            title="No results"
            description={`We couldn't find anything matching "${debouncedQuery}". Try a different search.`}
            actionLabel={debouncedQuery ? "Clear search" : undefined}
            onAction={debouncedQuery ? () => setQuery("") : undefined}
          />
        )}

        {status === "success" && results.length > 0 && (
          <div className="product-list">
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSaved={isSaved(product.id, product.retailer)}
                onToggleSave={(p) => toggleSaved(p.id, p.retailer, p.price)}
                showBestBadge={retailerFilter.length > 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
