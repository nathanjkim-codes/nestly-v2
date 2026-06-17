function StatCard({ stat }) {
  return (
    <div className="stat-card">
      <p className="stat-title">{stat.title}</p>
      <h2 className="stat-value">{stat.value}</h2>
      <p className="stat-trend">{stat.trend}</p>
    </div>
  );
}
export default StatCard;
