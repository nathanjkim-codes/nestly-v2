import { formatDecimalHours } from "../utils/formatDecimalHours";

function WeeklySummaryCard({ growthRecords, sleepRecords }) {
  const hasEnoughGrowthRecords = growthRecords.length >= 2;
  const hasEnoughSleepRecords = sleepRecords.length >= 14;

  const latestGrowthRecord = hasEnoughGrowthRecords
    ? growthRecords[growthRecords.length - 1]
    : null;
  const previousGrowthRecord = hasEnoughGrowthRecords
    ? growthRecords[growthRecords.length - 2]
    : null;

  const latestWeeklySleepRecords = hasEnoughSleepRecords
    ? sleepRecords.slice(-7)
    : null;

  const previousWeeklySleepRecords = hasEnoughSleepRecords
    ? sleepRecords.slice(-14, -7)
    : null;

  const heightWeeklyDifference = hasEnoughGrowthRecords
    ? latestGrowthRecord.height - previousGrowthRecord.height
    : null;

  const weightWeeklyDifference = hasEnoughGrowthRecords
    ? latestGrowthRecord.weight - previousGrowthRecord.weight
    : null;

  const latestSleepDurationsSum = hasEnoughSleepRecords
    ? latestWeeklySleepRecords.reduce((totalDuration, sleepRecord) => {
        return totalDuration + sleepRecord.duration;
      }, 0)
    : null;

  const previousWeeklySleepDurationsSum = hasEnoughSleepRecords
    ? previousWeeklySleepRecords.reduce((totalDuration, sleepRecord) => {
        return totalDuration + sleepRecord.duration;
      }, 0)
    : null;

  const latestWeekAverageDuration = hasEnoughSleepRecords
    ? latestSleepDurationsSum / latestWeeklySleepRecords.length
    : null;
  const previousWeekAverageDuration = hasEnoughSleepRecords
    ? previousWeeklySleepDurationsSum / previousWeeklySleepRecords.length
    : null;

  const weeklySleepDurationDifference = hasEnoughSleepRecords
    ? latestWeekAverageDuration - previousWeekAverageDuration
    : null;

  const formattedLatestWeekAverageDuration = hasEnoughSleepRecords
    ? formatDecimalHours(latestWeekAverageDuration)
    : null;

  const formattedWeeklySleepDurationDifference = hasEnoughSleepRecords
    ? formatDecimalHours(Math.abs(weeklySleepDurationDifference))
    : null;

  const weeklySleepDifferenceSign =
    weeklySleepDurationDifference > 0
      ? "+"
      : weeklySleepDurationDifference < 0
        ? "-"
        : "";

  const heightSign = heightWeeklyDifference > 0 ? "+" : "";
  const weightSign = weightWeeklyDifference > 0 ? "+" : "";

  return (
    <div className="dashboard-card weekly-summary-card">
      <div className="card-header">
        <h3 className="card-title">Weekly Summary</h3>
        <button className="card-action-button">View Report</button>
      </div>
      <div className="summary-list">
        <div className="summary-item">
          <div className="summary-icon">👶</div>

          <div className="summary-info">
            <p className="summary-title">Growth</p>
            <p className="summary-description">
              Height {heightSign}
              {heightWeeklyDifference} in, Weight {weightSign}
              {weightWeeklyDifference} lbs
            </p>
          </div>
          <span className="summary-status-badge">On track</span>
        </div>
        <div className="summary-item">
          <div className="summary-icon">🌙</div>
          <div className="summary-info">
            <p className="summary-title">Sleep</p>
            <p className="summary-description">
              Avg {formattedLatestWeekAverageDuration},{" "}
              {weeklySleepDifferenceSign}
              {formattedWeeklySleepDurationDifference} vs last week
            </p>
          </div>
          <span className="summary-status-badge">Great</span>
        </div>
      </div>
    </div>
  );
}
export default WeeklySummaryCard;
