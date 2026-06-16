function StatCard({ stat }) {
  return (
    <div className="stat-card">
      <p>{stat.title}</p>
      <h2>{stat.value}</h2>
      <p>{stat.trend}</p>
    </div>
  );
}
export default StatCard;
