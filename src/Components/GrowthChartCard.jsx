import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function GrowthChartCard({ growthRecords }) {
  const latestGrowthRecord = growthRecords[growthRecords.length - 1];
  return (
    <div className="dashboard-card growth-chart-card">
      <div className="chart-header">
        <h3 className="card-title">Growth Over Time</h3>
        <button className="card-action-button">View all</button>
      </div>
      <div className="chart-legend">
        <p className="legend-height">◆ Height (in)</p>
        <p className="legend-weight">● Weight (lbs)</p>
      </div>
      <div className="growth-chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={growthRecords}
            margin={{ top: 30, right: 24, left: -10, bottom: 20 }}
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
      <div className="summary-row">
        <div className="summary-card">
          <p className="summary-label">Height</p>
          <h3 className="summary-value">{latestGrowthRecord.height} in</h3>
          <p className="summary-percentile">72nd percentile</p>
          <p className="summary-trend">↑ 0.6 from last month</p>
        </div>

        <div className="summary-card">
          <p className="summary-label">Weight</p>
          <h3 className="summary-value">{latestGrowthRecord.weight} lbs</h3>
          <p className="summary-percentile">65th percentile</p>
          <p className="summary-trend">↑ 0.8 from last month</p>
        </div>
      </div>
    </div>
  );
}
export default GrowthChartCard;
