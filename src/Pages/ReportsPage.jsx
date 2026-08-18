import { useOutletContext } from "react-router-dom";
import { Download } from "lucide-react";
import { useState } from "react";

export function ReportsPage() {
  const { selectedChild } = useOutletContext();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };
  console.log("From", fromDate);
  console.log("To", toDate);

  return (
    <section className="reports-page">
      <div className="page-top">
        <div className="page-title-group">
          <h1 className="page-heading">Reports</h1>
          <p className="page-description">
            Create and share report of your child's records.
          </p>
        </div>

        <div className="reports-header-actions">
          <button className="reports-download-btn">
            <Download size={18} />
            Download Report
          </button>
          <select className="dropdown-range reports-dropdown">
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="180">Last 6 Months</option>
            <option value="all">All time</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      <div className="report-options-container">
        <h3 className="reports-heading">Report Options</h3>
        <div className="report-options">
          <div className="report-date-range">
            <p className="report-options-label">Date Range</p>
            <div className="date-range-input">
              <div className="date-input-wrapper">
                <p>From</p>
                <input
                  type="date"
                  className="date-input-from"
                  value={fromDate}
                  onChange={handleFromDateChange}
                />
              </div>
              <div className="date-input-wrapper">
                <p>To</p>
                <input
                  type="date"
                  className="date-input-to"
                  value={toDate}
                  onChange={handleToDateChange}
                />
              </div>
            </div>

            <div className="date-preset">
              <button className="preset-date">Last 30 Days</button>
              <button className="preset-date">Last 3 Months</button>
              <button className="preset-date">Last 6 Months</button>
              <button className="preset-date">Custom</button>
            </div>
          </div>

          <div className="include-report">
            <label className="report-options-label">Include in Report</label>
            <div className="include-records-wrapper">
              <input type="checkbox" className="include-check-box" />
              <label className="include-records-label">Growth records</label>
            </div>
            <div className="include-records-wrapper">
              <input type="checkbox" className="include-check-box" />
              <label className="include-records-label">Sleep Records</label>
            </div>
            <div className="include-records-wrapper">
              <input type="checkbox" className="include-check-box" />
              <label className="include-records-label">Feeding Records</label>
            </div>
          </div>

          <div className="report-title">
            <label className="report-options-label">
              Report Title (Optional)
            </label>
            <input
              type="text"
              className="report-title-input"
              placeholder="Doctor Visit Report"
            />
            <p className="report-title-description">
              This title will appear on the report.
            </p>
          </div>

          <div className="report-notes">
            <label className="report-options-label">Notes (Optional)</label>
            <textarea
              className="report-note-input"
              rows={4}
              maxLength={300}
              placeholder="Routine check-up."
            ></textarea>
          </div>
          <button type="button">Generate Report</button>
        </div>
      </div>

      <div className="report-preview-container">
        <div className="report-preview">
          <h3 className="reports-heading">Report Preview</h3>
          <p className="reports-description">
            This is how your report will look.
          </p>
        </div>

        <div className="preview-records">
          <div className="preview-growth-records">
            <span className="preview-records-icon">📏</span>
            <h3 className="preview-records-label">Growth Records</h3>

            <div className="table-container">
              <table className="records-table">
                <thead className="table-header">
                  <tr>
                    <th>Date</th>
                    <th>Height</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody className="table-data">
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="total-records">Total Records: 6</p>
          </div>

          <div className="preview-sleep-records">
            <span className="preview-records-icon">🌙</span>
            <h3 className="preview-records-label">Sleep Records</h3>

            <div className="table-container">
              <table className="records-table">
                <thead className="table-header">
                  <tr>
                    <th>Date</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody className="table-data">
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="total-records">Total Records: 28</p>
          </div>

          <div className="preview-feeding-records">
            <span className="preview-records-icon">🍼</span>
            <h3 className="preview-records-label">Feeding Records</h3>

            <div className="table-container">
              <table className="records-table">
                <thead className="table-header">
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody className="table-data">
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="total-records">Total Records: 56</p>
          </div>
        </div>

        <div className="export-report">
          <div className="export-content-group">
            <h3 className="reports-heading">Export Report</h3>
            <p className="reports-description">
              Download, print, or email this report.
            </p>
          </div>

          <div className="export-action-group">
            <button type="button" className="export-print-btn">
              Print Report
            </button>
            <button type="button" className="export-download-btn">
              Download PDF
            </button>
            <button type="button" className="export-email-btn">
              Email Report
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReportsPage;
