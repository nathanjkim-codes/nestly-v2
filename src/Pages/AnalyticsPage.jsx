import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { formatDecimal } from "../utils/formatDecimal";
import { formatDecimalHours } from "../utils/formatDecimalHours";
import { measurementUnits } from "../utils/measurementUnits";
import {
  heightConversion,
  weightConversion,
  feedingConversion,
} from "../utils/measurementConversion";
import {
  CartesianGrid,
  LineChart,
  Line,
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30");

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  const { selectedChild, selectedUnit } = useOutletContext();

  const units = measurementUnits(selectedUnit);

  const growthRecords = selectedChild.growthRecords;
  const sleepRecords = selectedChild.sleepRecords;
  const feedingRecords = selectedChild.feedingRecords;

  const sortedGrowthRecords = [...growthRecords].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const sortedSleepRecords = [...sleepRecords].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const sortedFeedingRecords = [...feedingRecords].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const today = new Date();
  const cutoffDate = new Date(today);
  cutoffDate.setDate(today.getDate() - Number(dateRange));

  const previousCutoffDate = new Date(cutoffDate);
  previousCutoffDate.setDate(cutoffDate.getDate() - Number(dateRange));

  const filteredGrowthRecords = sortedGrowthRecords.filter((record) => {
    if (dateRange === "all") {
      return true;
    }
    const recordDate = new Date(record.date);
    return recordDate >= cutoffDate && recordDate <= today;
  });

  const convertedGrowthRecords = filteredGrowthRecords.map((record) => {
    return {
      date: record.date,
      height: heightConversion(record.height, selectedUnit),
      weight: weightConversion(record.weight, selectedUnit),
    };
  });

  const filteredSleepRecords = sortedSleepRecords.filter((record) => {
    if (dateRange === "all") {
      return true;
    }
    const recordDate = new Date(record.date);
    return recordDate >= cutoffDate && recordDate <= today;
  });

  const filteredFeedingRecords = sortedFeedingRecords.filter((record) => {
    if (dateRange === "all") {
      return true;
    }
    const recordDate = new Date(record.date);
    return recordDate >= cutoffDate && recordDate <= today;
  });

  const convertedFeedingRecords = filteredFeedingRecords.map((record) => {
    return {
      date: record.date,
      amount: feedingConversion(record.amount, selectedUnit),
    };
  });

  // =========================
  // Growth Analytics
  // =========================

  const previousFilteredGrowthRecords = sortedGrowthRecords.filter((record) => {
    const recordDate = new Date(record.date);

    return recordDate >= previousCutoffDate && recordDate < cutoffDate;
  });

  const hasFilteredGrowthRecords = filteredGrowthRecords.length > 0;
  const hasPreviousFilteredGrowthRecords =
    previousFilteredGrowthRecords.length > 0;

  const hasEnoughFilteredGrowthRecords = filteredGrowthRecords.length >= 2;
  const hasEnoughPreviousFilteredGrowthRecords =
    previousFilteredGrowthRecords.length >= 2;

  const firstGrowthRecord = hasFilteredGrowthRecords
    ? filteredGrowthRecords[0]
    : null;

  const latestGrowthRecord = hasFilteredGrowthRecords
    ? filteredGrowthRecords[filteredGrowthRecords.length - 1]
    : null;

  const heightGrowth = hasEnoughFilteredGrowthRecords
    ? latestGrowthRecord.height - firstGrowthRecord.height
    : null;

  const previousFirstGrowthRecord = hasPreviousFilteredGrowthRecords
    ? previousFilteredGrowthRecords[0]
    : null;

  const previousLatestGrowthRecord = hasPreviousFilteredGrowthRecords
    ? previousFilteredGrowthRecords[previousFilteredGrowthRecords.length - 1]
    : null;

  const previousHeightGrowth = hasEnoughPreviousFilteredGrowthRecords
    ? previousLatestGrowthRecord.height - previousFirstGrowthRecord.height
    : null;

  const growthDifference =
    heightGrowth !== null && previousHeightGrowth !== null
      ? heightGrowth - previousHeightGrowth
      : null;

  const growthPercentChange =
    growthDifference !== null && previousHeightGrowth > 0
      ? (growthDifference / previousHeightGrowth) * 100
      : null;

  // Growth trend logic

  let growthSign;

  if (heightGrowth > 0) {
    growthSign = "+";
  } else {
    growthSign = "";
  }

  let trendGrowth;

  if (dateRange === "all") {
    trendGrowth = "All-time record";
  } else if (!hasEnoughPreviousFilteredGrowthRecords) {
    trendGrowth = "No previous records";
  } else if (growthPercentChange === null) {
    trendGrowth = "Cannot compare";
  } else if (growthPercentChange > 0) {
    trendGrowth = "↑";
  } else if (growthPercentChange < 0) {
    trendGrowth = "↓";
  } else {
    trendGrowth = "No change";
  }

  let growthTrendDisplay;

  if (dateRange === "all") {
    growthTrendDisplay = "";
  } else if (!hasEnoughPreviousFilteredGrowthRecords) {
    growthTrendDisplay = "No previous data";
  } else if (growthPercentChange === null) {
    growthTrendDisplay = "Cannot compare";
  } else {
    growthTrendDisplay = `${trendGrowth} ${formatDecimal(growthPercentChange)} %`;
  }

  // =========================
  // Sleep Analytics
  // =========================

  const previousFilteredSleepRecords = sortedSleepRecords.filter((record) => {
    const recordDate = new Date(record.date);
    return recordDate >= previousCutoffDate && recordDate < cutoffDate;
  });

  const hasFilteredSleepRecords = filteredSleepRecords.length > 0;
  const hasPreviousSleepRecords = previousFilteredSleepRecords.length > 0;

  const totalSleepDuration = filteredSleepRecords.reduce(
    (total, record) => total + record.duration,
    0,
  );

  const averageSleepDuration = hasFilteredSleepRecords
    ? totalSleepDuration / filteredSleepRecords.length
    : null;

  const totalPreviousSleepDuration = previousFilteredSleepRecords.reduce(
    (total, record) => total + record.duration,
    0,
  );

  const previousAverageSleepDuration = hasPreviousSleepRecords
    ? totalPreviousSleepDuration / previousFilteredSleepRecords.length
    : null;

  const sleepDurationDifference =
    averageSleepDuration !== null && previousAverageSleepDuration !== null
      ? averageSleepDuration - previousAverageSleepDuration
      : null;

  const sleepPercentChange =
    sleepDurationDifference !== null && previousAverageSleepDuration > 0
      ? (sleepDurationDifference / previousAverageSleepDuration) * 100
      : null;

  // Sleep trend logic

  let trendSleep;

  if (dateRange === "all") {
    trendSleep = "All-time average";
  } else if (!hasPreviousSleepRecords) {
    trendSleep = "No previous records";
  } else if (sleepPercentChange > 0) {
    trendSleep = "↑";
  } else if (sleepPercentChange < 0) {
    trendSleep = "↓";
  } else {
    trendSleep = "No change";
  }

  // =========================
  // Feeding Analytics
  // =========================

  const previousFilteredFeedingRecords = sortedFeedingRecords.filter(
    (record) => {
      const recordDate = new Date(record.date);
      return recordDate >= previousCutoffDate && recordDate < cutoffDate;
    },
  );

  const hasFilteredFeedingRecords = filteredFeedingRecords.length > 0;
  const hasPreviousFeedingRecords = previousFilteredFeedingRecords.length > 0;

  const totalFeedingAmount = filteredFeedingRecords.reduce(
    (total, record) => total + record.amount,
    0,
  );

  const totalPreviousFeedingAmount = previousFilteredFeedingRecords.reduce(
    (total, record) => total + record.amount,
    0,
  );

  const averageFeedingAmount = hasFilteredFeedingRecords
    ? totalFeedingAmount / filteredFeedingRecords.length
    : null;

  const previousAverageFeedingAmount = hasPreviousFeedingRecords
    ? totalPreviousFeedingAmount / previousFilteredFeedingRecords.length
    : null;

  const feedingAmountDifference =
    averageFeedingAmount !== null && previousAverageFeedingAmount !== null
      ? averageFeedingAmount - previousAverageFeedingAmount
      : null;

  const feedingPercentChange =
    feedingAmountDifference !== null && previousAverageFeedingAmount > 0
      ? (feedingAmountDifference / previousAverageFeedingAmount) * 100
      : null;

  // Feeding trend logic

  let trendFeeding;

  if (dateRange === "all") {
    trendFeeding = "All-time average";
  } else if (!hasPreviousFeedingRecords) {
    trendFeeding = "No previous data";
  } else if (feedingPercentChange > 0) {
    trendFeeding = "↑";
  } else if (feedingPercentChange < 0) {
    trendFeeding = "↓";
  } else {
    trendFeeding = "No change";
  }

  return (
    <section className="analytics-page">
      <div className="page-top">
        <div className="page-title-group">
          <h1 className="page-heading">Analytics</h1>
          <p className="page-description">
            Understand trends and patterns in {selectedChild.profile.name}'s
            health data.
          </p>
        </div>

        <select
          className="dropdown-range analytics-dropdown"
          value={dateRange}
          onChange={handleDateRangeChange}
        >
          <option value="30">Last 30 Days</option>
          <option value="7">Last 7 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div className="page-stats">
        <div className="page-stat-card">
          <span className="page-stat-card-icon">📏</span>

          <div className="page-stat-card-content">
            <p className="page-stat-card-label">Growth (Height)</p>
            <h3 className="page-stat-card-value">
              {hasEnoughFilteredGrowthRecords
                ? `${growthSign}${formatDecimal(heightConversion(heightGrowth, selectedUnit))} ${units.height}`
                : "No Data"}
            </h3>

            <div className="page-stat-bottom-content">
              <p className="page-stat-card-time">
                {dateRange === "all"
                  ? "All-time growth"
                  : `vs previous ${dateRange} days`}
              </p>

              <span className="page-stat-card-trend">{growthTrendDisplay}</span>
            </div>
          </div>
        </div>

        <div className="page-stat-card">
          <span className="page-stat-card-icon">🌙</span>

          <div className="page-stat-card-content">
            <p className="page-stat-card-label">Avg Sleep</p>
            <h3 className="page-stat-card-value">
              {hasFilteredSleepRecords
                ? `${formatDecimalHours(averageSleepDuration)}`
                : "No data"}
            </h3>

            <div className="page-stat-bottom-content">
              <p className="page-stat-card-time">
                {dateRange === "all"
                  ? "All-time average"
                  : `vs previous ${dateRange} days`}
              </p>
              <span className="page-stat-card-trend">
                {dateRange === "all"
                  ? ""
                  : hasPreviousSleepRecords
                    ? `${trendSleep} ${formatDecimal(sleepPercentChange)} %`
                    : "No previous data"}
              </span>
            </div>
          </div>
        </div>

        <div className="page-stat-card">
          <span className="page-stat-card-icon">🍼</span>

          <div className="page-stat-card-content">
            <p className="page-stat-card-label">Avg Feeding</p>
            <h3 className="page-stat-card-value">
              {hasFilteredFeedingRecords
                ? `${formatDecimal(feedingConversion(averageFeedingAmount, selectedUnit))} ${units.feeding}`
                : "No data"}
            </h3>

            <div className="page-stat-bottom-content">
              <p className="page-stat-card-time">
                {dateRange === "all"
                  ? "All-time average"
                  : `vs previous ${dateRange} days`}
              </p>
              <span className="page-stat-card-trend">
                {dateRange === "all"
                  ? ""
                  : hasPreviousFeedingRecords
                    ? `${trendFeeding} ${formatDecimal(feedingPercentChange)} %`
                    : "No previous data"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-chart analytics-growth-chart">
        <div className="analytics-chart-header">
          <h3 className="chart-title">Growth Trend</h3>

          <div className="chart-legend">
            <span className="legend-line legend-line-height"></span>
            <span className="legend-label">Height({units.height})</span>
          </div>
          <div className="chart-legend">
            <span className="legend-line legend-line-weight"></span>
            <span className="legend-label">Weight({units.weight})</span>
          </div>
        </div>

        {hasFilteredGrowthRecords ? (
          <div className="analytics-chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={convertedGrowthRecords}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid vertical={false} stroke="#1E293B" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  padding={{ left: 12, right: 12 }}
                  tickMargin={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  domain={[0, "dataMax + 5"]}
                />
                <Tooltip />

                <Line
                  dataKey="height"
                  stroke="#4F7CFF"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  dataKey="weight"
                  stroke="#FF5C9A"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="chart-empty-state">
            <p className="chart-empty-message">No Growth Records yet.</p>
          </div>
        )}
      </div>

      <div className="analytics-bottom-charts">
        <div className="analytics-chart analytics-sleep-chart">
          <div className="analytics-chart-header analytics-sleep-header">
            <h3 className="chart-title">Sleep Trend</h3>

            <div className="chart-legend">
              <span className="legend-bar legend-bar-sleep"></span>
              <span className="legend-label">Total Sleep (hours)</span>
            </div>
          </div>

          {hasFilteredSleepRecords ? (
            <div className="analytics-chart-area">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredSleepRecords}
                  margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
                >
                  <CartesianGrid vertical={false} stroke="#1E293B" />

                  <XAxis dataKey="date" axisLine={false} tickLine={false} />

                  <YAxis axisLine={false} tickLine={false} />

                  <Tooltip />

                  <Bar dataKey="duration" fill="#4F7CFF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="chart-empty-state">
              <p className="chart-empty-message">No Sleep Records yet.</p>
            </div>
          )}
        </div>

        <div className="analytics-chart analytics-feeding-chart">
          <div className="analytics-chart-header analytics-feeding-header">
            <h3 className="chart-title">Feeding Trend</h3>

            <div className="chart-legend">
              <span className="legend-bar legend-bar-feeding"></span>
              <span className="legend-label">Amount ({units.feeding})</span>
            </div>
          </div>

          {hasFilteredFeedingRecords ? (
            <div className="analytics-chart-area">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={convertedFeedingRecords}
                  margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
                >
                  <CartesianGrid vertical={false} stroke="#1E293B" />

                  <XAxis dataKey="date" axisLine={false} tickLine={false} />

                  <YAxis axisLine={false} tickLine={false} />

                  <Tooltip />

                  <Bar dataKey="amount" fill="#4F7CFF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="chart-empty-state">
              <p className="chart-empty-message">No Feeding Records yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AnalyticsPage;
