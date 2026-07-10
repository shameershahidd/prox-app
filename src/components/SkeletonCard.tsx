import "./SkeletonCard.css";

export function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card__image" />
      <div className="skeleton-card__lines">
        <div className="skeleton-card__line skeleton-card__line--wide" />
        <div className="skeleton-card__line skeleton-card__line--narrow" />
      </div>
      <div className="skeleton-card__price" />
    </div>
  );
}

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="skeleton-list" role="status" aria-label="Loading results">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
      <span className="visually-hidden">Loading results</span>
    </div>
  );
}
