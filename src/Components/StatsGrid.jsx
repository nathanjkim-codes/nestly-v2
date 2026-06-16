function StatsGrid({ stats }) {
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <div className="stat-card">
          <p>{stat.title}</p>
          <h2>{stat.value}</h2>
          <p>{stat.trend}</p>
        </div>
      ))}
    </div>
  );
}
export default StatsGrid;
