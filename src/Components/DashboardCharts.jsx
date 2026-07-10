import GrowthChartCard from "./GrowthChartCard.jsx";
import SleepChartCard from "./SleepChartCard.jsx";
import RecentRecordsCard from "./RecentRecordsCard.jsx";

function DashboardCharts({ growthRecords, sleepRecords, feedingRecords }) {
  return (
    <div className="dashboard-charts">
      <GrowthChartCard growthRecords={growthRecords} />
      <SleepChartCard sleepRecords={sleepRecords} />
      <RecentRecordsCard
        growthRecords={growthRecords}
        sleepRecords={sleepRecords}
        feedingRecords={feedingRecords}
      />
    </div>
  );
}

export default DashboardCharts;
