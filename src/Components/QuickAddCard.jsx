function QuickAddCard() {
  return (
    <div className="dashboard-card quick-add-card">
      <div className="card-header">
        <h3 className="card-title">Quick Add</h3>
      </div>

      <div className="quick-add-actions">
        <button className="quick-add-button">
          <span className="quick-add-icon">🌙</span>
          <span className="quick-add-label">Sleep</span>
        </button>

        <button className="quick-add-button">
          <span className="quick-add-icon">🍼</span>
          <span className="quick-add-label">Feeding</span>
        </button>

        <button className="quick-add-button">
          <span className="quick-add-icon">👶</span>
          <span className="quick-add-label">Growth</span>
        </button>

        <button className="quick-add-button">
          <span className="quick-add-icon">😊</span>
          <span className="quick-add-label">Mood</span>
        </button>

        <button className="quick-add-button">
          <span className="quick-add-icon">📝</span>
          <span className="quick-add-label">Note</span>
        </button>
      </div>
    </div>
  );
}

export default QuickAddCard;
