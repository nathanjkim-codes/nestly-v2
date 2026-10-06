import { formatDate } from "../utils/formatDate";
import { useOutletContext } from "react-router-dom";
import {
  heightConversion,
  weightConversion,
} from "../utils/measurementConversion";
import { measurementUnits } from "../utils/measurementUnits";
import { formatDecimal } from "../utils/formatDecimal";
import { useState } from "react";
import { GrowthRecordForm } from "../Components/QuickAdd/GrowthRecordForm";

export function GrowthRecordsPage() {
  const { selectedChild, selectedUnit, children, setChildren } =
    useOutletContext();

  const [isGrowthFormOpen, setIsGrowthFormOpen] = useState(false);
  const [editGrowthRecord, setEditGrowthRecord] = useState(null);

  if (!selectedChild) {
    return <div>Loading...</div>;
  }

  const units = measurementUnits(selectedUnit);

  const growthRecords = selectedChild.growthRecords;

  const sortedGrowthRecords = [...growthRecords].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const hasRecord = sortedGrowthRecords.length > 0;

  const latestHeightRecord = hasRecord ? sortedGrowthRecords[0].height : null;
  const latestDateRecord = hasRecord ? sortedGrowthRecords[0].date : null;
  const latestWeightRecord = hasRecord ? sortedGrowthRecords[0].weight : null;

  // CREATE
  const handleAddRecord = async (newRecord) => {
    console.log("handleAddRecord running:", newRecord);
    try {
      const response = await fetch(
        `http://localhost:3000/api/children/${selectedChild.id}/growthRecords`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRecord),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const createdRecord = await response.json();

      setChildren((currentChildren) => {
        const updatedChildren = currentChildren.map((child) => {
          if (child.id === selectedChild.id) {
            const updatedGrowthRecords = [
              ...child.growthRecords,
              createdRecord,
            ];

            const updatedChild = {
              ...child,
              growthRecords: updatedGrowthRecords,
            };

            return updatedChild;
          }

          return child;
        });

        return updatedChildren;
      });

      setIsGrowthFormOpen(false);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // DELETE
  const handleDeleteRecord = async (record) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/children/${selectedChild.id}/growthRecords/${record.id}`,
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
            const updatedGrowthRecords = child.growthRecords.filter(
              (currentRecord) => {
                return currentRecord.id !== record.id;
              },
            );

            const updatedChild = {
              ...child,
              growthRecords: updatedGrowthRecords,
            };

            return updatedChild;
          }

          return child;
        });

        return updatedChildren;
      });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // UPDATE
  const handleUpdateRecord = async (updatedGrowthRecord) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/children/${selectedChild.id}/growthRecords/${updatedGrowthRecord.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedGrowthRecord),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedRecord = await response.json();

      setChildren(
        children.map((child) => {
          if (child.id === selectedChild.id) {
            const updatedGrowthRecords = child.growthRecords.map((record) => {
              if (record.id === updatedRecord.id) {
                return updatedRecord;
              }

              return record;
            });

            const updatedChild = {
              ...child,
              growthRecords: updatedGrowthRecords,
            };

            return updatedChild;
          }

          return child;
        }),
      );

      setEditGrowthRecord(null);
      setIsGrowthFormOpen(false);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <section className="growth-records-page">
      <div className="page-top">
        <div className="page-title-group">
          <h1 className="page-heading">Growth Records</h1>
          <p className="page-description">
            Track your child's height and weight over time.
          </p>
        </div>

        <button
          className="page-add-btn"
          onClick={() => setIsGrowthFormOpen(true)}
        >
          + Add Growth Record
        </button>
      </div>

      {isGrowthFormOpen && (
        <div className="modal-back-drop">
          <div className="modal-box">
            <div className="modal-header">
              <h3 className="modal-title">Growth Record</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsGrowthFormOpen(false)}
              >
                ✕
              </button>
            </div>
            <GrowthRecordForm
              handleAddRecord={handleAddRecord}
              handleUpdateRecord={handleUpdateRecord}
              editGrowthRecord={editGrowthRecord}
            />
          </div>
        </div>
      )}

      <div className="page-stats">
        <div className="page-stat-card">
          <span className="page-stat-card-icon">📏</span>
          <div className="page-stat-card-content">
            <p className="page-stat-card-label">Latest Height</p>
            <h3 className="page-stat-card-value">
              {hasRecord
                ? `${formatDecimal(heightConversion(latestHeightRecord, selectedUnit))} ${units.height}`
                : "No data"}
            </h3>
            <p className="page-stat-card-time">
              {hasRecord ? formatDate(latestDateRecord) : "No records"}
            </p>
          </div>
        </div>

        <div className="page-stat-card">
          <span className="page-stat-card-icon">⚖️</span>
          <div className="page-stat-card-content">
            <p className="page-stat-card-label">Latest Weight</p>
            <h3 className="page-stat-card-value">
              {hasRecord
                ? `${formatDecimal(weightConversion(latestWeightRecord, selectedUnit))} ${units.weight}`
                : "No data"}
            </h3>
            <p className="page-stat-card-time">
              {hasRecord ? formatDate(latestDateRecord) : "No records"}
            </p>
          </div>
        </div>

        <div className="page-stat-card">
          <span className="page-stat-card-icon">📈</span>
          <div className="page-stat-card-content">
            <p className="page-stat-card-label">Total records</p>
            <h3 className="page-stat-card-value">{growthRecords.length}</h3>
            <p className="page-stat-card-time">All time</p>
          </div>
        </div>
      </div>

      <div className="table-container">
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
                    <td>
                      {`${formatDecimal(heightConversion(record.height, selectedUnit))} ${units.height}`}
                    </td>
                    <td>
                      {`${formatDecimal(weightConversion(record.weight, selectedUnit))} ${units.weight}`}
                    </td>
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
      </div>
      <p className="page-count">
        {growthRecords.length}{" "}
        {growthRecords.length === 1 ? "record" : "records"}
      </p>
    </section>
  );
}

export default GrowthRecordsPage;
