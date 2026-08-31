import GrowthChartCard from "./GrowthChartCard.jsx";
import SleepChartCard from "./SleepChartCard.jsx";
import RecentRecordsCard from "./RecentRecordsCard.jsx";

function DashboardCharts({
  growthRecords,
  sleepRecords,
  feedingRecords,
  selectedUnit,
}) {
  return (
    <div className="dashboard-charts">
      <GrowthChartCard
        growthRecords={growthRecords}
        selectedUnit={selectedUnit}
      />
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
