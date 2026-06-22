import GrowthChartCard from "./GrowthChartCard.jsx";
import SleepChartCard from "./SleepChartCard.jsx";
import RecentRecordsCard from "./RecentRecordsCard.jsx";

function DashboardCharts() {
  return (
    <div className="dashboard-charts">
      <GrowthChartCard />
      <SleepChartCard />
      <RecentRecordsCard />
    </div>
  );
}

export default DashboardCharts;
