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
  const hasSleepRecords = sleepRecords.length >= 1;

  const sleepDurationsSum = function (sleepRecords) {
    let durationSum = 0;
    for (let i = 0; i < sleepRecords.length; i++) {
      durationSum += sleepRecords[i].duration;
    }
    return durationSum;
  };
  const totalSleepDuration = sleepDurationsSum(sleepRecords);

  const averageSleepDuration = hasSleepRecords
    ? totalSleepDuration / sleepRecords.length
    : null;

  const formatDecimalHours = function (averageSleepDuration) {
    const sleepHours = Math.floor(averageSleepDuration);
    const sleepMinutes = Math.round((averageSleepDuration - sleepHours) * 60);
    return `${sleepHours} hr ${sleepMinutes} m`;
  };

  const formattedAverageSleepDuration =
    formatDecimalHours(averageSleepDuration);

  const highestSleepDuration = function (sleepRecords) {
    if (sleepRecords.length === 0) return null;
    let highestSleepRecord = sleepRecords[0];
    for (let i = 1; i < sleepRecords.length; i++) {
      if (sleepRecords[i].duration > highestSleepRecord.duration)
        highestSleepRecord = sleepRecords[i];
    }
    return highestSleepRecord;
  };
  const bestSleepRecord = highestSleepDuration(sleepRecords);

  const formattedBestSleepDuration = hasSleepRecords
    ? formatDecimalHours(bestSleepRecord.duration)
    : null;

  const sleepDate = new Date(bestSleepRecord.date);

  const formattedSleepDate = sleepDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const bestSleepDay = hasSleepRecords ? bestSleepRecord.day : null;
  const bestSleepDate = hasSleepRecords ? bestSleepRecord.date : null;

  const formattedTotalSleepDuration = formatDecimalHours(totalSleepDuration);

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
          <h3 className="summary-value">{formattedBestSleepDuration}</h3>
          <p className="summary-trend">
            {formattedSleepDate} ({bestSleepDay})
          </p>
        </div>

        <div className="summary-card">
          <p className="summary-label">Total (week)</p>
          <h3 className="summary-value">{formattedTotalSleepDuration}</h3>
          {/* TODO: Add week-over-week sleep trend after previous-week data is available */}
        </div>
      </div>
    </div>
  );
}

export default SleepChartCard;
