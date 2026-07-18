import WeeklySummaryCard from "./WeeklySummaryCard.jsx";
import QuickAddCard from "./QuickAddCard.jsx";

function DashboardActions({ growthRecords, sleepRecords }) {
  return (
    <div className="dashboard-actions">
      <WeeklySummaryCard
        growthRecords={growthRecords}
        sleepRecords={sleepRecords}
      />
      <QuickAddCard />
    </div>
  );
}

export default DashboardActions;
