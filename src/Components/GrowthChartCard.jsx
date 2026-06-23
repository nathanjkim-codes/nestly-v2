function GrowthChartCard() {
  return (
    <div className="dashboard-card growth-chart-card">
      <div className="chart-header">
        <h3 className="card-title">Growth over time</h3>
        <button className="card-action-button">View all</button>
      </div>
      <div className="chart-legend">
        <p className="legend-height">◆ Height (in)</p>
        <p className="legend-weight">● Weight (lbs)</p>
      </div>
      <div className="growth-chart-area"></div>
      <div className="summary-row">
        <div className="summary-card">
          <p className="summary-label">Height</p>
          <h3 className="summary-value">35.2 in</h3>
          <p className="summary-percentile">72nd percentile</p>
          <p className="summary-trend">↑ 0.6 from last month</p>
        </div>

        <div className="summary-card">
          <p className="summary-label">Weight</p>
          <h3 className="summary-value">28.4 lbs</h3>
          <p className="summary-percentile">65th percentile</p>
          <p className="summary-trend">↑ 0.8 from last month</p>
        </div>
      </div>
    </div>
  );
}
export default GrowthChartCard;
