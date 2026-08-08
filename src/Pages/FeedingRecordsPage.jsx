import { useOutletContext } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { formatTime } from "../utils/formatTime";

export function FeedingRecordsPage() {
  const { selectedChild } = useOutletContext();

  const feedingRecords = selectedChild.feedingRecords;

  const sortedFeedingRecords = [...feedingRecords].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const hasRecord = sortedFeedingRecords.length > 0;

  const latestFeedingRecord = hasRecord ? sortedFeedingRecords[0].amount : null;
  const latestFeedingTime = hasRecord ? sortedFeedingRecords[0].date : null;
  const totalFeedingRecords = sortedFeedingRecords.length;

  const feedingAmountSum = function (feedingRecords) {
    let amountSum = 0;
    for (let i = 0; i < feedingRecords.length; i++) {
      amountSum += feedingRecords[i].amount;
    }
    return amountSum;
  };

  const totalFeedingAmount = feedingAmountSum(feedingRecords);

  const averageFeedingAmount = hasRecord
    ? totalFeedingAmount / totalFeedingRecords
    : null;

  return (
    <section className="feeding-records-page">
      <div className="page-top">
        <div className="page-title-group">
          <h1 className="page-heading">Feeding Records</h1>
          <p className="page-description">
            Track your child's feeding details and patterns over time
          </p>
        </div>

        <button className="page-add-btn">+ Add Feeding Record</button>
      </div>

      <div className="page-stats">
        <div className="page-stat-card">
          <span className="page-stat-card-icon">🍼</span>

          <div className="page-stat-card-content">
            <p className="page-stat-card-label">Latest Feeding</p>
            <h3 className="page-stat-card-value">
              {hasRecord ? `${latestFeedingRecord} oz` : "No data"}
            </h3>
            <p className="page-stat-card-time">
              {hasRecord
                ? `${formatDate(latestFeedingTime)} • ${formatTime(latestFeedingTime)}`
                : "-"}
            </p>
          </div>
        </div>

        <div className="page-stat-card">
          <span className="page-stat-card-icon">📏</span>

          <div className="page-stat-card-content">
            <p className="page-stat-card-label">Average Amount</p>
            <h3 className="page-stat-card-value">
              {hasRecord ? `${averageFeedingAmount.toFixed(1)} oz` : "No data"}
            </h3>
            <p className="page-stat-card-time">Across all records</p>
          </div>
        </div>

        <div className="page-stat-card">
          <span className="page-stat-card-icon">📊</span>

          <div className="page-stat-card-content">
            <p className="page-stat-card-label">Total Records</p>
            <h3 className="page-stat-card-value">{totalFeedingRecords}</h3>
            <p className="page-stat-card-time">All time</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="page-container">
          <thead className="page-header feeding-header">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Duration</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="page-data">
            {hasRecord ? (
              sortedFeedingRecords.map((record) => (
                <tr key={record.id} className="page-row">
                  <td>{formatDate(record.date)}</td>
                  <td>{formatTime(record.date)}</td>
                  <td>{record.type}</td>
                  <td>
                    {record.amount} {record.unit}
                  </td>
                  <td>{record.duration} min</td>
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
                <td colSpan="7" className="page-empty-state">
                  No feeding records yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="page-count">
        {feedingRecords.length}{" "}
        {feedingRecords.length === 1 ? "record" : "records"}
      </p>
    </section>
  );
}

export default FeedingRecordsPage;
