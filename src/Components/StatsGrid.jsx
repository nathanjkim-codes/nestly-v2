import StatCard from "./StatCard.jsx";

function StatsGrid({ stats }) {
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <StatCard stat={stat} />
      ))}
    </div>
  );
}
export default StatsGrid;
