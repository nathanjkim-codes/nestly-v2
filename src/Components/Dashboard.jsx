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
import {
  getStartOfWeekMonday,
  getEndOfWeekSunday,
  getPreviousWeekStart,
} from "../utils/dateUtils.js";
import { formatDecimalHours } from "../utils/formatDecimalHours.js";

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

  const latestSleepRecordDate = hasSleepRecord
    ? new Date(sortedSleepRecord[0].date)
    : null;

  const latestSleepWeekStart = hasSleepRecord
    ? getStartOfWeekMonday(latestSleepRecordDate)
    : null;

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

  const previousSleepWeekStart = hasSleepRecord
    ? getPreviousWeekStart(latestSleepWeekStart)
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

  const previousSleepTotal = previousSleepWeek.reduce((total, record) => {
    return total + record.duration;
  }, 0);

  const hasPreviousSleepWeekRecords = previousSleepWeek.length > 0;

  const previousSleepWeekAverage = hasPreviousSleepWeekRecords
    ? previousSleepTotal / previousSleepWeek.length
    : null;

  const weeklySleepDifference =
    hasLatestSleepWeekRecords && hasPreviousSleepWeekRecords
      ? latestSleepWeekAverage - previousSleepWeekAverage
      : null;

  const latestFeedingRecordDate = hasFeedingRecord
    ? new Date(sortedFeedingRecord[0].date)
    : null;

  const latestFeedingWeekStart = hasFeedingRecord
    ? getStartOfWeekMonday(latestFeedingRecordDate)
    : null;

  const latestFeedingWeekEnd = hasFeedingRecord
    ? getEndOfWeekSunday(latestFeedingWeekStart)
    : null;

  const latestFeedingWeek = hasFeedingRecord
    ? feedingRecords.filter((record) => {
        const recordDate = new Date(record.date);

        return (
          recordDate >= latestFeedingWeekStart &&
          recordDate <= latestFeedingWeekEnd
        );
      })
    : [];

  const latestFeedingTotal = latestFeedingWeek.reduce((total, record) => {
    return total + record.amount;
  }, 0);

  const hasLatestFeedingWeekRecords = latestFeedingWeek.length > 0;

  const latestFeedingWeekAverage = hasLatestFeedingWeekRecords
    ? latestFeedingTotal / latestFeedingWeek.length
    : null;

  const previousFeedingWeekStart = hasFeedingRecord
    ? getPreviousWeekStart(latestFeedingWeekStart)
    : null;

  const previousFeedingWeekEnd = hasFeedingRecord
    ? getEndOfWeekSunday(previousFeedingWeekStart)
    : null;

  const previousFeedingWeek = hasFeedingRecord
    ? feedingRecords.filter((record) => {
        const recordDate = new Date(record.date);
        return (
          recordDate >= previousFeedingWeekStart &&
          recordDate <= previousFeedingWeekEnd
        );
      })
    : [];

  const previousFeedingTotal = previousFeedingWeek.reduce((total, record) => {
    return total + record.amount;
  }, 0);

  const hasPreviousFeedingWeekRecords = previousFeedingWeek.length > 0;

  const previousFeedingWeekAverage = hasPreviousFeedingWeekRecords
    ? previousFeedingTotal / previousFeedingWeek.length
    : null;

  const weeklyFeedingDifference =
    hasPreviousFeedingWeekRecords && hasLatestFeedingWeekRecords
      ? latestFeedingWeekAverage - previousFeedingWeekAverage
      : null;

  let monthlyHeightTrend;
  if (monthlyHeightDifference === null) {
    monthlyHeightTrend = null;
  } else if (monthlyHeightDifference > 0) {
    monthlyHeightTrend = "↑";
  } else if (monthlyHeightDifference < 0) {
    monthlyHeightTrend = "↓";
  } else if (monthlyHeightDifference === 0) {
    monthlyHeightTrend = "No change";
  }

  let monthlyWeightTrend;
  if (monthlyWeightDifference === null) {
    monthlyWeightTrend = null;
  } else if (monthlyWeightDifference > 0) {
    monthlyWeightTrend = "↑";
  } else if (monthlyWeightDifference < 0) {
    monthlyWeightTrend = "↓";
  } else if (monthlyWeightDifference === 0) {
    monthlyWeightTrend = "No change";
  }

  let weeklySleepTrend;
  if (weeklySleepDifference === null) {
    weeklySleepTrend = null;
  } else if (weeklySleepDifference > 0) {
    weeklySleepTrend = "↑";
  } else if (weeklySleepDifference < 0) {
    weeklySleepTrend = "↓";
  } else if (weeklySleepDifference === 0) {
    weeklySleepTrend = "No change";
  }

  let weeklyFeedingTrend;
  if (weeklyFeedingDifference === null) {
    weeklyFeedingTrend = null;
  } else if (weeklyFeedingDifference > 0) {
    weeklyFeedingTrend = "↑";
  } else if (weeklyFeedingDifference < 0) {
    weeklyFeedingTrend = "↓";
  } else if (weeklyFeedingDifference === 0) {
    weeklyFeedingTrend = "No change";
  }

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
        ? `${monthlyHeightTrend} ${formatDecimal(heightConversion(Math.abs(monthlyHeightDifference), selectedUnit))} ${units.height} vs last month`
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
        ? `${monthlyWeightTrend} ${formatDecimal(weightConversion(Math.abs(monthlyWeightDifference), selectedUnit))} ${units.weight} vs last month`
        : "No data",
    },

    {
      id: "sleep",
      icon: "🌙",
      title: "Sleep",
      value: hasSleepRecord ? `${latestSleepRecord.duration} hrs` : "No data",
      trend: hasPreviousSleepWeekRecords
        ? `${weeklySleepTrend} ${formatDecimalHours(Math.abs(weeklySleepDifference))} vs last week`
        : "No data",
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
      trend: hasPreviousFeedingWeekRecords
        ? `${weeklyFeedingTrend} ${formatDecimal(feedingConversion(Math.abs(weeklyFeedingDifference), selectedUnit))} ${units.feeding} vs last week`
        : "No data",
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
