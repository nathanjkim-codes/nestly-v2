import ChildOverview from "./ChildOverview.jsx";
import StatsGrid from "./StatsGrid.jsx";
import DashboardCharts from "./DashboardCharts.jsx";
import DashboardActions from "./DashboardActions.jsx";

function Dashboard() {
  const selectedChild = {
    name: "Emma",
    age: "3 years",
    gender: "Girl",
    birthDate: "Mar 10 2023",
    insight: {
      title: "✨ AI Insight",
      message: "Emma is growing well 🌱",
      description: "Sleep and nutrition patterns look balanced.",
    },
  };

  const stats = [
    {
      id: "growth",
      icon: "📈",
      title: "Growth",
      value: "35.2 in",
      trend: "↑ 0.6 in this month",
    },

    {
      id: "weight",
      icon: "⚖️",
      title: "Weight",
      value: "28.4 lbs",
      trend: "↑ 0.8 lbs this month",
    },

    {
      id: "sleep",
      icon: "🌙",
      title: "Sleep",
      value: "9h 20m",
      trend: "↑ 45m vs last week",
    },

    {
      id: "feeding",
      icon: "🍼",
      title: "Feeding",
      value: "3 times",
      trend: "↓ 1 vs last week",
    },

    {
      id: "mood",
      icon: "😊",
      title: "Mood",
      value: "Good",
      trend: "Mostly positive",
    },
  ];

  return (
    <div className="dashboard">
      <ChildOverview child={selectedChild} />
      <StatsGrid stats={stats} />
      <DashboardCharts />
      <DashboardActions />
    </div>
  );
}

export default Dashboard;
