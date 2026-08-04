import { formatDate } from "../utils/formatDate";
import { useOutletContext } from "react-router-dom";

export function GrowthRecordsPage() {
  const { selectedChild } = useOutletContext();
  const growthRecords = selectedChild.growthRecords;

  const sortedGrowthRecords = [...growthRecords].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const hasRecord = sortedGrowthRecords.length > 0;

  const latestHeightRecord = hasRecord ? sortedGrowthRecords[0].height : null;
  const latestDateRecord = hasRecord ? sortedGrowthRecords[0].date : null;
  const latestWeightRecord = hasRecord ? sortedGrowthRecords[0].weight : null;

  return (
    <section className="growth-records-page">
      <div className="page-top">
        <div className="page-title-group">
          <h1 className="page-heading">Growth Records</h1>
          <p className="page-description">
            Track your child's height and weight over time.
          </p>
        </div>

        <button className="page-add-btn">+ Add Growth Record</button>
      </div>

      <div className="page-stats">
        <div className="page-stat-card">
          <span className="page-stat-card-icon">📏</span>
          <p className="page-stat-card-title">Latest Height</p>
          <h3 className="page-stat-card-data">
            {hasRecord ? `${latestHeightRecord} in` : "No data"}
          </h3>
          <p className="page-stat-card-time">
            {hasRecord ? formatDate(latestDateRecord) : "No records"}
          </p>
        </div>

        <div className="page-stat-card">
          <span className="page-stat-card-icon">⚖️</span>
          <p className="page-stat-card-title">Latest Weight</p>
          <h3 className="page-stat-card-data">
            {hasRecord ? `${latestWeightRecord} lbs` : "No data"}
          </h3>
          <p className="page-stat-card-time">
            {hasRecord ? formatDate(latestDateRecord) : "No records"}
          </p>
        </div>

        <div className="page-stat-card">
          <span className="page-stat-card-icon">📈</span>
          <p className="page-stat-card-title">Total records</p>
          <h3 className="page-stat-card-data">{growthRecords.length}</h3>
          <p className="page-stat-card-time">All time</p>
        </div>
      </div>

      <table className="page-container">
        <thead className="page-header">
          <tr>
            <th>Date</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="page-data">
          {hasRecord ? (
            sortedGrowthRecords.map((record) => {
              return (
                <tr key={record.id} className="page-row">
                  <td>{formatDate(record.date)}</td>
                  <td>{record.height} in</td>
                  <td>{record.weight} lbs</td>
                  <td>{record.note || "No note"}</td>
                  <td className="page-cell-actions">
                    <button className="page-view-btn">View</button>
                    <button className="page-edit-btn">Edit</button>
                    <button className="page-delete-btn">Delete</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="page-empty-state">
                No growth records yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <p className="page-count">
        {growthRecords.length}{" "}
        {growthRecords.length === 1 ? "record" : "records"}
      </p>
    </section>
  );
}

export default GrowthRecordsPage;
