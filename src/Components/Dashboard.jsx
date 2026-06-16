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

  return (
    <div className="dashboard">
      <ChildOverview child={selectedChild} />
      <StatsGrid />
    </div>
  );
}

export default Dashboard;
