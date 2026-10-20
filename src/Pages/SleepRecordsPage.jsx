import { useOutletContext } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { formatDecimalHours } from "../utils/formatDecimalHours";
import { useState } from "react";
import { SleepRecordForm } from "../Components/QuickAdd/SleepRecordForm";

export function SleepRecordsPage() {
  const {
    selectedChild,
    sleepRecords,
    setSleepRecords,
    sleepRecordsLoading,
    sleepRecordsError,
  } = useOutletContext();
  const [isSleepFormOpen, setIsSleepFormOpen] = useState(false);
  const [editSleepRecord, setEditSleepRecord] = useState(null);

  if (sleepRecordsLoading) {
    return <div>Loading sleep records...</div>;
  }

  if (sleepRecordsError) {
    return <div>{sleepRecordsError}</div>;
  }

  if (!selectedChild) {
    return <div>Loading...</div>;
  }

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

  // CREATE — Add a new sleep record
  const handleAddRecord = async (newRecord) => {
    try {
      // 1. Send new form data to Express → PostgreSQL
      const response = await fetch(
        `http://localhost:3000/api/children/${selectedChild.id}/sleepRecords`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRecord),
        },
      );

      // 2. Check if the POST request failed
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // 3. Receive the newly saved record from Express
      const createdRecord = await response.json();

      // 4. Update React state after successful creation
      setSleepRecords((currentRecords) => {
        // Keep existing records and add the new record
        return [...currentRecords, createdRecord];
      });

      // 5. Close the Add form after successful POST
      setIsSleepFormOpen(false);
    } catch (error) {
      // 6. Log any errors
      console.error("Fetch error:", error);
    }
  };

  // DELETE — Remove an existing sleep record
  const handleDeleteRecord = async (record) => {
    try {
      // 1. Send DELETE request to Express → PostgreSQL
      const response = await fetch(
        `http://localhost:3000/api/children/${selectedChild.id}/sleepRecords/${record.id}`,
        {
          method: "DELETE",
        },
      );

      // 2. Check if the DELETE request failed
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // 3. Update React state after successful deletion
      setSleepRecords((currentRecords) => {
        // 4. Create a new array without the deleted record
        return currentRecords.filter((currentRecord) => {
          // Keep records whose IDs do not match the deleted record
          return currentRecord.id !== record.id;
        });
      });
    } catch (error) {
      // 5. Log any errors
      console.error("Fetch error:", error);
    }
  };

  // UPDATE — Edit an existing sleep record
  const handleUpdateRecord = async (updatedRecord) => {
    try {
      // 1. Send updated form data to Express → PostgreSQL
      const response = await fetch(
        `http://localhost:3000/api/children/${selectedChild.id}/sleepRecords/${updatedRecord.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRecord),
        },
      );

      // 2. Check if the request failed
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // 3. Receive the saved record from Express
      const savedRecord = await response.json();

      // 4. Update React state with the saved record
      setSleepRecords((currentRecords) => {
        const updatedRecords = currentRecords.map((currentRecord) => {
          // Replace the record if the IDs match
          if (currentRecord.id === savedRecord.id) {
            return savedRecord;
          }

          // Keep other records unchanged
          return currentRecord;
        });

        // Return the new array to React
        return updatedRecords;
      });

      // 5. Clear the selected record for future editing
      setEditSleepRecord(null);

      // 6. Close the edit form
      setIsSleepFormOpen(false);
    } catch (error) {
      // 7. Log any errors
      console.error("Fetch error:", error);
    }
  };

  const handleOpenEditRecord = (record) => {
    setEditSleepRecord(record);
    setIsSleepFormOpen(true);
  };

  return (
    <section className="sleep-records-page">
      <div className="page-top">
        <div className="page-title-group">
          <h1 className="page-heading">Sleep Records</h1>
          <p className="page-description">
            Track your child's sleep duration and patterns over time.
          </p>
        </div>

        <button
          className="page-add-btn"
          onClick={() => {
            setEditSleepRecord(null);
            setIsSleepFormOpen(true);
          }}
        >
          + Add Sleep Record
        </button>
      </div>

      {isSleepFormOpen && (
        <div className="modal-back-drop">
          <div className="modal-box">
            <div className="modal-header">
              <h3 className="modal-title">Sleep Record</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => {
                  setEditSleepRecord(null);
                  setIsSleepFormOpen(false);
                }}
              >
                ✕
              </button>
            </div>
            <SleepRecordForm
              handleAddRecord={handleAddRecord}
              handleUpdateRecord={handleUpdateRecord}
              editSleepRecord={editSleepRecord}
            />
          </div>
        </div>
      )}

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
                      <button
                        className="page-edit-btn"
                        onClick={() => handleOpenEditRecord(record)}
                      >
                        Edit
                      </button>
                      <button
                        className="page-delete-btn"
                        onClick={() => handleDeleteRecord(record)}
                      >
                        Delete
                      </button>
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
