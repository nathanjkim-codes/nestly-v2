function StatCard({ stat }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{stat.icon}</div>

      <div className="stat-info">
        <p className="stat-title">{stat.title}</p>
        <h2 className="stat-value">{stat.value}</h2>
        <p className="stat-trend">{stat.trend}</p>
      </div>
    </div>
  );
}
export default StatCard;
