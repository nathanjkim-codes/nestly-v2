function SleepChartCard() {
  return (
    <div className="dashboard-card sleep-chart-card">
      <div className="chart-header">
        <h3 className="card-title">Sleep This Week</h3>
        <button className="card-action-button">View all</button>
      </div>
      <div className="chart-legend">
        <p className="legend-sleep-info">Avg 9h 20m</p>
      </div>
      <div className="sleep-chart-area"></div>
      <div className="summary-row">
        <div className="summary-card">
          <p className="summary-label">Best night</p>
          <h3 className="summary-value">10h 30m</h3>
          <p className="summary-trend">May 24 (Fri)</p>
        </div>

        <div className="summary-card">
          <p className="summary-label">Total (week)</p>
          <h3 className="summary-value">64h 20m</h3>
          <p className="summary-trend">↑ 3h 10m this week</p>
        </div>
      </div>
    </div>
  );
}

export default SleepChartCard;
