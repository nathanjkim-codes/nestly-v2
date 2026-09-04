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

  const latestGrowthRecordDate = hasGrowthRecord
    ? new Date(sortedGrowthRecord[0].date)
    : null;

  const latestSleepRecordDate = hasSleepRecord
    ? new Date(sortedSleepRecord[0].date)
    : null;

  const previousGrowthMonthDate = hasGrowthRecord
    ? new Date(
        latestGrowthRecordDate.getFullYear(),
        latestGrowthRecordDate.getMonth() - 1,
        1,
      )
    : null;

  const previousGrowthMonthRecords = hasGrowthRecord
    ? sortedGrowthRecord.filter((record) => {
        const dateObject = new Date(record.date);
        return (
          dateObject.getMonth() === previousGrowthMonthDate.getMonth() &&
          dateObject.getFullYear() === previousGrowthMonthDate.getFullYear()
        );
      })
    : [];

  const hasPreviousGrowthRecord = previousGrowthMonthRecords.length > 0;

  const latestPreviousGrowthRecord = hasPreviousGrowthRecord
    ? previousGrowthMonthRecords[0]
    : null;

  const monthlyHeightDifference = hasPreviousGrowthRecord
    ? latestGrowthRecord.height - latestPreviousGrowthRecord.height
    : null;

  const monthlyWeightDifference = hasPreviousGrowthRecord
    ? latestGrowthRecord.weight - latestPreviousGrowthRecord.weight
    : null;

  const getStartOfWeekMonday = function getStartOfWeekMonday(
    latestSleepRecordDate,
  ) {
    const sleepRecordDate = new Date(latestSleepRecordDate);
    const dayOfWeek = sleepRecordDate.getDay();

    const mondayOffset =
      sleepRecordDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

    const startOfWeek = new Date(sleepRecordDate.setDate(mondayOffset));

    startOfWeek.setHours(0, 0, 0, 0);

    return startOfWeek;
  };

  const latestSleepWeekStart = hasSleepRecord
    ? getStartOfWeekMonday(latestSleepRecordDate)
    : null;

  const getEndOfWeekSunday = function getEndOfWeekSunday(startOfWeek) {
    const sleepRecordDate = new Date(startOfWeek);

    const sundayOffset = sleepRecordDate.getDate() + 6;

    const endOfWeek = new Date(sleepRecordDate.setDate(sundayOffset));

    endOfWeek.setHours(23, 59, 59, 999);

    return endOfWeek;
  };

  const latestSleepWeekEnd = hasSleepRecord
    ? getEndOfWeekSunday(latestSleepWeekStart)
    : null;

  const latestSleepWeek = hasSleepRecord
    ? sleepRecords.filter((record) => {
        const recordDate = new Date(record.date);
        return (
          recordDate >= latestSleepWeekStart && recordDate <= latestSleepWeekEnd
        );
      })
    : [];

  const getPreviousSleepWeekStart = function (startOfWeek) {
    const previousSleepWeekDate = new Date(startOfWeek);

    const previousMonday = previousSleepWeekDate.getDate() - 7;

    const previousSleepWeekStart = new Date(
      previousSleepWeekDate.setDate(previousMonday),
    );
    return previousSleepWeekStart;
  };

  const previousSleepWeekStart = hasSleepRecord
    ? getPreviousSleepWeekStart(latestSleepWeekStart)
    : null;

  const previousSleepWeekEnd = hasSleepRecord
    ? getEndOfWeekSunday(previousSleepWeekStart)
    : null;

  const previousSleepWeek = hasSleepRecord
    ? sleepRecords.filter((record) => {
        const recordDate = new Date(record.date);
        return (
          recordDate >= previousSleepWeekStart &&
          recordDate <= previousSleepWeekEnd
        );
      })
    : [];

  const latestSleepTotal = latestSleepWeek.reduce((total, record) => {
    return total + record.duration;
  }, 0);

  const hasLatestSleepWeekRecords = latestSleepWeek.length > 0;

  const latestSleepWeekAverage = hasLatestSleepWeekRecords
    ? latestSleepTotal / latestSleepWeek.length
    : null;

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
      trend: hasPreviousGrowthRecord
        ? `↑ ${formatDecimal(heightConversion(monthlyHeightDifference, selectedUnit))} ${units.height} vs last month`
        : "No data",
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
      trend: hasPreviousGrowthRecord
        ? `↑ ${formatDecimal(weightConversion(monthlyWeightDifference, selectedUnit))} ${units.weight} vs last month`
        : "No data",
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
