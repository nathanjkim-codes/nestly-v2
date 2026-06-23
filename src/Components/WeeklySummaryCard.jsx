function WeeklySummaryCard() {
  return (
    <div className="dashboard-card weekly-summary-card">
      <div className="card-header">
        <h3 className="card-title">Weekly Summary</h3>
        <button className="card-action-button">View Report</button>
      </div>
      <div className="summary-list">
        <div className="summary-item">
          <div className="summary-icon">👶</div>

          <div className="summary-info">
            <p className="summary-title">Growth</p>
            <p className="summary-description">
              Height +0.6 in, Weight +0.8 lbs
            </p>
          </div>
          <span className="summary-status-badge">On track</span>
        </div>
      </div>
    </div>
  );
}
export default WeeklySummaryCard;
