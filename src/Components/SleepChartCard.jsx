import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function SleepChartCard({ sleepRecords }) {
  const sleepDurationsSum = function (sleepRecords) {
    let durationSum = 0;
    for (let i = 0; i < sleepRecords.length; i++) {
      durationSum += sleepRecords[i].duration;
    }
    return durationSum;
  };
  const totalSleepDuration = sleepDurationsSum(sleepRecords);

  const averageSleepDuration = totalSleepDuration / sleepRecords.length;
  console.log(averageSleepDuration);

  const formatDecimalHours = function (averageSleepDuration) {
    const sleepHours = Math.floor(averageSleepDuration);
    const sleepMinutes = Math.round((averageSleepDuration - sleepHours) * 60);
    return `${sleepHours} hr ${sleepMinutes} m`;
  };

  const formattedAverageSleepDuration =
    formatDecimalHours(averageSleepDuration);

  return (
    <div className="dashboard-card sleep-chart-card">
      <div className="chart-header">
        <h3 className="card-title">Sleep This Week</h3>
        <button className="card-action-button">View all</button>
      </div>
      <div className="chart-legend">
        <p className="legend-sleep-info">Avg {formattedAverageSleepDuration}</p>
      </div>
      <div className="sleep-chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sleepRecords}
            margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} stroke="#1E293B" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
              domain={[0, "dataMax + 2"]}
            />
            <Tooltip />
            <Bar dataKey="duration" fill="#4F7CFF" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="summary-row">
        <div className="summary-card">
          <p className="summary-label">Best night</p>
          <h3 className="summary-value">10h 30m</h3>
          <p className="summary-trend">May 24 (Fri)</p>
        </div>

        <div className="summary-card">
          <p className="summary-label">Total (week)</p>
          <h3 className="summary-value">64h 20m</h3>
          <p className="summary-trend">↑ 3h 10m this week</p>
        </div>
      </div>
    </div>
  );
}

export default SleepChartCard;
