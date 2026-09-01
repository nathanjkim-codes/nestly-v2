import ChildOverview from "./ChildOverview.jsx";
import StatsGrid from "./StatsGrid.jsx";
import DashboardCharts from "./DashboardCharts.jsx";
import DashboardActions from "./DashboardActions.jsx";
import { formatDecimal } from "../utils/formatDecimal.js";
import {
  heightConversion,
  weightConversion,
  feedingConversion,
} from "../utils/measurementConversion.js";
import { measurementUnits } from "../utils/measurementUnits.js";

function Dashboard({ selectedChild, selectedUnit }) {
  const currentStats = selectedChild.currentStats;
  const growthRecords = selectedChild.growthRecords;
  const sleepRecords = selectedChild.sleepRecords;
  const feedingRecords = selectedChild.feedingRecords;

  const units = measurementUnits(selectedUnit);

  const sortedGrowthRecord = [...growthRecords].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const sortedSleepRecord = [...sleepRecords].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const sortedFeedingRecord = [...feedingRecords].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const hasGrowthRecord = sortedGrowthRecord.length > 0;
  const hasSleepRecord = sortedSleepRecord.length > 0;
  const hasFeedingRecord = sortedFeedingRecord.length > 0;

  const latestGrowthRecord = hasGrowthRecord ? sortedGrowthRecord[0] : null;
  const latestSleepRecord = hasSleepRecord ? sortedSleepRecord[0] : null;
  const latestFeedingRecord = hasFeedingRecord ? sortedFeedingRecord[0] : null;

  const stats = [
    {
      id: "growth",
      icon: "📈",
      title: "Growth",
      value: hasGrowthRecord
        ? `${formatDecimal(
            heightConversion(latestGrowthRecord.height, selectedUnit),
          )} ${units.height}`
        : "No data",
      trend: "↑ 0.6 in this month",
    },

    {
      id: "weight",
      icon: "⚖️",
      title: "Weight",
      value: hasGrowthRecord
        ? `${formatDecimal(
            weightConversion(latestGrowthRecord.weight, selectedUnit),
          )} ${units.weight}`
        : "No data",
      trend: "↑ 0.8 lbs this month",
    },

    {
      id: "sleep",
      icon: "🌙",
      title: "Sleep",
      value: hasSleepRecord ? `${latestSleepRecord.duration} hrs` : "No data",
      trend: "↑ 45m vs last week",
    },

    {
      id: "feeding",
      icon: "🍼",
      title: "Feeding",
      value: hasFeedingRecord
        ? `${formatDecimal(
            feedingConversion(latestFeedingRecord.amount, selectedUnit),
          )} ${units.feeding}`
        : "No data",
      trend: "↓ 1 vs last week",
    },

    {
      id: "mood",
      icon: "😊",
      title: "Mood",
      value: currentStats.mood,
      trend: "Mostly positive",
    },
  ];

  return (
    <div className="dashboard">
      <ChildOverview child={selectedChild} />
      <StatsGrid stats={stats} />
      <DashboardCharts
        growthRecords={growthRecords}
        sleepRecords={sleepRecords}
        feedingRecords={feedingRecords}
        selectedUnit={selectedUnit}
      />

      <DashboardActions
        growthRecords={growthRecords}
        sleepRecords={sleepRecords}
      />
    </div>
  );
}

export default Dashboard;
