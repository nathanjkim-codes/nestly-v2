import StatCard from "./StatCard.jsx";

function StatsGrid({ stats }) {
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
export default StatsGrid;
