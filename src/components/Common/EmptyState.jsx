function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      {Icon && <Icon size={48} />}
      {title && <h4>{title}</h4>}
      {description && <p>{description}</p>}
      {actionLabel && (
        <button className="btn" style={{ marginTop: 16 }} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
