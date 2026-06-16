import ChildOverview from "./ChildOverview.jsx";
import StatsGrid from "./StatsGrid.jsx";

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
    { title: "Growth", value: "35.2 in", trend: "↑ 0.6 in this month" },

    { title: "Weight", value: "28.4 lbs", trend: "↑ 0.8 lbs this month" },

    { title: "Sleep", value: "9h 20m", trend: "↑ 45m vs last week" },

    { title: "Feeding", value: "3 times", trend: "↓ 1 vs last week" },

    { title: "Mood", value: "Good", trend: "Mostly positive" },
  ];

  return (
    <div className="dashboard">
      <ChildOverview child={selectedChild} />
      <StatsGrid />
    </div>
  );
}

export default Dashboard;
