import GrowthChartCard from "./GrowthChartCard.jsx";
import SleepChartCard from "./SleepChartCard.jsx";

function DashboardCharts() {
  return (
    <div className="dashboard-charts">
      <GrowthChartCard />
      <SleepChartCard />
    </div>
  );
}

export default DashboardCharts;
