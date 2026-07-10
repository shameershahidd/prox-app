import "./StatePanel.css";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="state-panel state-panel--error" role="alert">
      <div className="state-panel__icon" aria-hidden="true">⚠️</div>
      <p className="state-panel__title">Something went wrong</p>
      <p className="state-panel__description">{message}</p>
      <button type="button" className="state-panel__action state-panel__action--error" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
