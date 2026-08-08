import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import {
  CartesianGrid,
  LineChart,
  Line,
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
          onChange={handleDateRange}
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
        <div className="chart-header">
          <h3 className="chart-title">Growth Trend</h3>
          <p className="chart-legend">-- Height</p>
          <p className="legend-weight">-- Weight</p>
        </div>

        {hasGrowthRecords ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sortedGrowthRecords}
              margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
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
        ) : (
          <div className="chart-empty-state">
            <p>No growth Records yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default AnalyticsPage;
