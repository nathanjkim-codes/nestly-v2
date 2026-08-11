import { useOutletContext } from "react-router-dom";
import { useState } from "react";
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

  const { selectedChild } = useOutletContext();

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

  const hasGrowthRecords = sortedGrowthRecords.length > 0;
  const hasSleepRecords = sortedSleepRecords.length > 0;
  const hasFeedingRecords = sortedFeedingRecords.length > 0;

  const today = new Date();
  const cutoffDate = new Date(today);
  cutoffDate.setDate(today.getDate() - Number(dateRange));

  const filteredGrowthRecords = sortedGrowthRecords.filter((record) => {
    if (dateRange === "all") {
      return true;
    }

    const recordDate = new Date(record.date);

    return recordDate >= cutoffDate && recordDate <= today;
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
          className="dropdown-range"
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
            <h3 className="page-stat-card-value">+1.5 in</h3>

            <div className="page-stat-bottom-content">
              <p className="page-stat-card-time">vs previous 30 days</p>
              <span className="page-stat-card-trend">↑ 6.3%</span>
            </div>
          </div>
        </div>

        <div className="page-stat-card">
          <span className="page-stat-card-icon">🌙</span>

          <div className="page-stat-card-content">
            <p className="page-stat-card-label">Avg Sleep</p>
            <h3 className="page-stat-card-value">9 h 32 m</h3>

            <div className="page-stat-bottom-content">
              <p className="page-stat-card-time">vs previous 30 days</p>
              <span className="page-stat-card-trend">↑ 8%</span>
            </div>
          </div>
        </div>

        <div className="page-stat-card">
          <span className="page-stat-card-icon">🍼</span>

          <div className="page-stat-card-content">
            <p className="page-stat-card-label">Avg Feeding</p>
            <h3 className="page-stat-card-value">4.6 oz</h3>

            <div className="page-stat-bottom-content">
              <p className="page-stat-card-time">vs previous 30 days</p>
              <span className="page-stat-card-trend">↑ 5%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-chart analytics-growth-chart">
        <div className="analytics-chart-header">
          <h3 className="chart-title">Growth Trend</h3>

          <div className="chart-legend">
            <span className="legend-line legend-line-height"></span>
            <span className="legend-label">Height</span>
          </div>
          <div className="chart-legend">
            <span className="legend-line legend-line-weight"></span>
            <span className="legend-label">Weight</span>
          </div>
        </div>

        {hasGrowthRecords ? (
          <div className="analytics-chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredGrowthRecords}
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

          {hasSleepRecords ? (
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
              <span className="legend-label">Amount (oz)</span>
            </div>
          </div>

          {hasFeedingRecords ? (
            <div className="analytics-chart-area">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredFeedingRecords}
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
