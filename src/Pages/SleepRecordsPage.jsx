import { useOutletContext } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { formatDecimalHours } from "../utils/formatDecimalHours";

export function SleepRecordsPage() {
  const { selectedChild } = useOutletContext();

  const sleepRecords = selectedChild.sleepRecords;

  console.log(sleepRecords);

  const sortedSleepRecords = [...sleepRecords].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const hasRecord = sortedSleepRecords.length > 0;

  const latestSleepRecord = hasRecord ? sortedSleepRecords[0].duration : null;
  const latestDateRecord = hasRecord ? sortedSleepRecords[0].date : null;
  const latestDayRecord = hasRecord ? sortedSleepRecords[0].day : null;
  const totalRecords = sortedSleepRecords.length;

  const sleepDurationSum = function (sleepRecords) {
    let durationSum = 0;
    for (let i = 0; i < sleepRecords.length; i++) {
      durationSum += sleepRecords[i].duration;
    }
    return durationSum;
  };

  const totalSleepDuration = sleepDurationSum(sleepRecords);

  const averageSleepDuration = hasRecord
    ? totalSleepDuration / sortedSleepRecords.length
    : null;

  const formattedAverageSleepDuration = hasRecord
    ? formatDecimalHours(averageSleepDuration)
    : null;

  return (
    <section className="sleep-records-page">
      <div className="page-top">
        <div className="page-title-group">
          <h1 className="page-heading">Sleep Records</h1>
          <p className="page-description">
            Track your child's sleep duration and patterns over time.
          </p>
        </div>

        <button className="page-add-btn">+ Add Sleep Record</button>
      </div>

      <div className="page-stats">
        <div className="page-stat-card">
          <span className="page-stat-card-icon">🌙</span>

          <div className="page-stat-card-content">
            <p className="page-stat-card-label">Latest Sleep</p>
            <h3 className="page-stat-card-value">
              {hasRecord ? formatDecimalHours(latestSleepRecord) : "No data"}
            </h3>
            <p className="page-stat-card-time">
              {hasRecord
                ? `${formatDate(latestDateRecord)} ${latestDayRecord}`
                : "No records"}
            </p>
          </div>
        </div>

        <div className="page-stat-card">
          <span className="page-stat-card-icon">⏱️</span>
          <div className="page-stat-card-content">
            <p className="page-stat-card-label">Average Duration</p>
            <h3 className="page-stat-card-value">
              {hasRecord ? formattedAverageSleepDuration : "No data"}
            </h3>
            <p className="page-stat-card-time">Across all records</p>
          </div>
        </div>

        <div className="page-stat-card">
          <span className="page-stat-card-icon">📊</span>
          <div className="page-stat-card-content">
            <p className="page-stat-card-label">Total Records</p>
            <h3 className="page-stat-card-value">{totalRecords}</h3>
            <p className="page-stat-card-time">All time</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="page-container">
          <thead className="page-header">
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Duration</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="page-data">
            {hasRecord ? (
              sortedSleepRecords.map((record) => (
                <tr key={record.id} className="page-row">
                  <td>{formatDate(record.date)}</td>
                  <td>{record.day}</td>
                  <td>{formatDecimalHours(record.duration)}</td>
                  <td>{record.note || "No note"}</td>
                  <td>
                    <div className="page-cell-actions">
                      <button className="page-view-btn">View</button>
                      <button className="page-edit-btn">Edit</button>
                      <button className="page-delete-btn">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="page-empty-state">
                  No sleep records yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="page-count">
        {sleepRecords.length} {sleepRecords.length === 1 ? "record" : "records"}
      </p>
    </section>
  );
}
export default SleepRecordsPage;
