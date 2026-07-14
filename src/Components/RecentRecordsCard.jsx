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

  const formattedRecordTime = function (time) {
    const timeObject = new Date(time);
    const timeString = timeObject.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${timeString}`;
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
        timestamp: record.date,
        time: formattedRecordTime(record.date),
        value: `${record.height} in ${record.weight} lbs`,
        icon: "📏",
      };
    } else if (Object.hasOwn(record, "duration")) {
      return {
        type: "sleep",
        title: "Sleep",
        date: formattedRecordDate(record.date),
        timestamp: record.date,
        time: formattedRecordTime(record.date),
        value: formatDecimalHours(record.duration),
        icon: "🌙",
      };
    } else if (Object.hasOwn(record, "amount")) {
      return {
        type: "feeding",
        title: "Feeding",
        date: formattedRecordDate(record.date),
        timestamp: record.date,
        time: formattedRecordTime(record.date),
        value: `${record.amount} ${record.unit}`,
        icon: "🍼",
      };
    }
  });
  console.log(normalizedRecords);

  const recentRecordFirst = normalizedRecords.toSorted(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
  );
  console.log(recentRecordFirst);

  return (
    <div className="dashboard-card recent-records-card">
      <div className="chart-header">
        <h3 className="card-title">Recent Records</h3>
        <button className="card-action-button">View all</button>
      </div>

      <div className="records-list">
        {recentRecordFirst.map((record) => (
          <div key={record.type} className="record-item">
            <div className="record-icon">{record.icon}</div>

            <div className="record-info">
              <p className="record-title">{record.title}</p>
              <p className="record-time">
                {record.date} {record.time}
              </p>
            </div>
            <p className="record-value">{record.value}</p>
            <span className="record-chevron">&gt;</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default RecentRecordsCard;
