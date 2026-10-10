import { useOutletContext } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { formatTime } from "../utils/formatTime";
import { formatDecimal } from "../utils/formatDecimal";
import { measurementUnits } from "../utils/measurementUnits";
import { feedingConversion } from "../utils/measurementConversion";
import { useState } from "react";
import { FeedingRecordForm } from "../Components/QuickAdd/FeedingRecordForm";

export function FeedingRecordsPage() {
  const { selectedChild, selectedUnit, children, setChildren } =
    useOutletContext();
  const [isFeedingFormOpen, setIsFeedingFormOpen] = useState(false);
  const [editFeedingRecord, setEditFeedingRecord] = useState(null);

  if (!selectedChild) {
    return <div>Loading...</div>;
  }

  const units = measurementUnits(selectedUnit);

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

  // CREATE FEEDING RECORD
  const handleAddRecord = async (newRecord) => {
    const response = await fetch(
      `http://localhost:3000/api/children/${selectedChild.id}/feedingRecords`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status:${response.status}`);
    }

    const createdRecord = await response.json();

    setChildren((currentChildren) => {
      const updatedChildren = currentChildren.map((child) => {
        if (child.id === selectedChild.id) {
          const updatedFeedingRecords = [
            ...child.feedingRecords,
            createdRecord,
          ];
          const updatedChild = {
            ...child,
            feedingRecords: updatedFeedingRecords,
          };
          return updatedChild;
        }
        return child;
      });
      return updatedChildren;
    });
    setIsFeedingFormOpen(false);
  };

  // DELETE FEEDING RECORD
  const handleDeleteRecord = async (record) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/children/${selectedChild.id}/feedingRecords/${record.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setChildren((currentChildren) => {
        const updatedChildren = currentChildren.map((child) => {
          if (child.id === selectedChild.id) {
            const updatedFeedingRecords = child.feedingRecords.filter(
              (currentRecord) => {
                return currentRecord.id !== record.id;
              },
            );

            const updatedChild = {
              ...child,
              feedingRecords: updatedFeedingRecords,
            };

            return updatedChild;
          }

          return child;
        });

        return updatedChildren;
      });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // UPDATE FEEDING RECORD
  const handleUpdateRecord = (updatedFeedingRecord) => {
    const updatedChildren = children.map((child) => {
      if (child.id === selectedChild.id) {
        const updatedFeedingRecords = child.feedingRecords.map(
          (currentRecord) => {
            if (currentRecord.id === updatedFeedingRecord.id) {
              return updatedFeedingRecord;
            }
            return currentRecord;
          },
        );
        const updatedChild = {
          ...child,
          feedingRecords: updatedFeedingRecords,
        };
        return updatedChild;
      }
      return child;
    });
    setChildren(updatedChildren);
    setIsFeedingFormOpen(false);
    setEditFeedingRecord(null);
  };

  const handleOpenEditRecord = (record) => {
    setEditFeedingRecord(record);
    setIsFeedingFormOpen(true);
  };

  return (
    <section className="feeding-records-page">
      <div className="page-top">
        <div className="page-title-group">
          <h1 className="page-heading">Feeding Records</h1>
          <p className="page-description">
            Track your child's feeding details and patterns over time
          </p>
        </div>

        <button
          className="page-add-btn"
          onClick={() => {
            setEditFeedingRecord(null);
            setIsFeedingFormOpen(true);
          }}
        >
          + Add Feeding Record
        </button>
      </div>

      {isFeedingFormOpen && (
        <div className="modal-back-drop">
          <div className="modal-box">
            <div className="modal-header">
              <h3 className="modal-title">Feeding Record</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => {
                  setEditFeedingRecord(null);
                  setIsFeedingFormOpen(false);
                }}
              >
                ✕
              </button>
            </div>
            <FeedingRecordForm
              handleAddRecord={handleAddRecord}
              handleUpdateRecord={handleUpdateRecord}
              editFeedingRecord={editFeedingRecord}
            />
          </div>
        </div>
      )}

      <div className="page-stats">
        <div className="page-stat-card">
          <span className="page-stat-card-icon">🍼</span>

          <div className="page-stat-card-content">
            <p className="page-stat-card-label">Latest Feeding</p>
            <h3 className="page-stat-card-value">
              {hasRecord
                ? `${formatDecimal(feedingConversion(latestFeedingRecord, selectedUnit))} ${units.feeding}`
                : "No data"}
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
              {hasRecord
                ? `${formatDecimal(feedingConversion(averageFeedingAmount, selectedUnit))} ${units.feeding}`
                : "No data"}
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
                    {`${formatDecimal(
                      feedingConversion(record.amount, selectedUnit),
                    )} ${units.feeding}`}
                  </td>
                  <td>{record.duration} min</td>
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
