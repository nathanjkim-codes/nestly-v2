import ChildOverview from "./ChildOverview.jsx";
import StatsGrid from "./StatsGrid.jsx";

function Dashboard() {
  return (
    <div className="dashboard">
      <ChildOverview />
      <StatsGrid />
    </div>
  );
}

export default Dashboard;
