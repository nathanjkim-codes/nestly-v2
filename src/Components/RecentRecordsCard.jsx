function RecentRecordsCard({ growthRecords, sleepRecords, feedingRecords }) {
  const hasGrowthRecords = growthRecords.length >= 1;
  const latestGrowthRecord = hasGrowthRecords
    ? growthRecords[growthRecords.length - 1]
    : null;

  const hasSleepRecords = sleepRecords.length >= 1;
  const latestSleepRecord = hasSleepRecords
    ? sleepRecords[sleepRecords.length - 1]
    : null;

  const hasFeedingRecords = feedingRecords.length >= 1;
  const latestFeedingRecord = hasFeedingRecords
    ? feedingRecords[feedingRecords.length - 1]
    : null;

  const recentRecords = [
    latestGrowthRecord,
    latestSleepRecord,
    latestFeedingRecord,
  ].filter((record) => record !== null);

  const formattedRecordDate = function (date) {
    const dateObject = new Date(date);
    const dateString = dateObject.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return `${dateString}`;
  };

  const formatDecimalHours = function (duration) {
    const sleepHours = Math.floor(duration);
    const sleepMinutes = Math.round((duration - sleepHours) * 60);
    return `${sleepHours} hr ${sleepMinutes} m`;
  };

  const normalizedRecords = recentRecords.map((record) => {
    if (Object.hasOwn(record, "height")) {
      return {
        type: "growth",
        title: "Growth",
        date: formattedRecordDate(record.date),
        value: `${record.height} in ${record.weight} lbs`,
        icon: "📏",
      };
    } else if (Object.hasOwn(record, "duration")) {
      return {
        type: "sleep",
        title: "Sleep",
        date: formattedRecordDate(record.date),
        value: formatDecimalHours(record.duration),
        icon: "🌙",
      };
    } else if (Object.hasOwn(record, "amount")) {
      return {
        type: "feeding",
        title: "Feeding",
        date: formattedRecordDate(record.date),
        value: `${record.amount} ${record.unit}`,
        icon: "🍼",
      };
    }
  });

  return (
    <div className="dashboard-card recent-records-card">
      <div className="chart-header">
        <h3 className="card-title">Recent Records</h3>
        <button className="card-action-button">View all</button>
      </div>

      <div className="records-list">
        <div className="record-item">
          <div className="record-icon">🌙</div>

          <div className="record-info">
            <p className="record-title">Sleep</p>
            <p className="record-time">May 26, 7:30 AM</p>
          </div>

          <p className="record-value">9h 10m</p>

          <span className="record-chevron">&gt;</span>
        </div>
      </div>
    </div>
  );
}
export default RecentRecordsCard;
