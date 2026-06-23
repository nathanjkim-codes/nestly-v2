function RecentRecordsCard() {
  return (
    <div className="dashboard-card recent-records-card">
      <div className="chart-header">
        <h3 className="card-title">Recent Records</h3>
        <button className="card-action-button">View all</button>
      </div>

      <div className="records-list">
        <div className="record-item">
          <div className="record-icon">🌙</div>

          <div className="record-info">
            <p className="record-title">Sleep</p>
            <p className="record-time">May 26, 7:30 AM</p>
          </div>

          <p className="record-value">9h 10m</p>

          <span className="record-chevron">&gt;</span>
        </div>
      </div>
    </div>
  );
}
export default RecentRecordsCard;
