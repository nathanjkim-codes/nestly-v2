import ChildOverview from "./ChildOverview.jsx";
import StatsGrid from "./StatsGrid.jsx";
import DashboardCharts from "./DashboardCharts.jsx";
import DashboardActions from "./DashboardActions.jsx";

function Dashboard({ selectedChild }) {
  const currentStats = selectedChild.currentStats;
  const growthRecords = selectedChild.growthRecords;

  const stats = [
    {
      id: "growth",
      icon: "📈",
      title: "Growth",
      value: currentStats.height,
      trend: "↑ 0.6 in this month",
    },

    {
      id: "weight",
      icon: "⚖️",
      title: "Weight",
      value: currentStats.weight,
      trend: "↑ 0.8 lbs this month",
    },

    {
      id: "sleep",
      icon: "🌙",
      title: "Sleep",
      value: currentStats.sleep,
      trend: "↑ 45m vs last week",
    },

    {
      id: "feeding",
      icon: "🍼",
      title: "Feeding",
      value: currentStats.feeding,
      trend: "↓ 1 vs last week",
    },

    {
      id: "mood",
      icon: "😊",
      title: "Mood",
      value: currentStats.mood,
      trend: "Mostly positive",
    },
  ];

  return (
    <div className="dashboard">
      <ChildOverview child={selectedChild} />
      <StatsGrid stats={stats} />
      <DashboardCharts growthRecords={growthRecords} />
      <DashboardActions />
    </div>
  );
}

export default Dashboard;
