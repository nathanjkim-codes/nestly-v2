import WeeklySummaryCard from "./WeeklySummaryCard.jsx";
import QuickAddCard from "./QuickAddCard.jsx";

function DashboardActions() {
  return (
    <div className="dashboard-actions">
      <WeeklySummaryCard />
      <QuickAddCard />
    </div>
  );
}

export default DashboardActions;
