import GrowthChartCard from "./GrowthChartCard.jsx";
import SleepChartCard from "./SleepChartCard.jsx";
import RecentRecordsCard from "./RecentRecordsCard.jsx";

function DashboardCharts({ growthRecords, sleepRecords }) {
  return (
    <div className="dashboard-charts">
      <GrowthChartCard growthRecords={growthRecords} />
      <SleepChartCard sleepRecords={sleepRecords} />
      <RecentRecordsCard />
    </div>
  );
}

export default DashboardCharts;
