import "./StatePanel.css";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="state-panel">
      <div className="state-panel__icon" aria-hidden="true">{icon}</div>
      <p className="state-panel__title">{title}</p>
      <p className="state-panel__description">{description}</p>
      {actionLabel && onAction && (
        <button type="button" className="state-panel__action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
