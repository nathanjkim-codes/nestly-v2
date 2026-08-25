export function SettingsPage() {
  return (
    <section className="settings-page">
      <div className="page-top">
        <div className="page-title-group">
          <h1 className="page-heading">Settings</h1>
          <p className="page-description">
            Manage your app preferences and data.
          </p>
        </div>
      </div>

      <div className="settings-preferences">
        <div className="preferences-heading">
          <span className="settings-section-icon">⚙️</span>

          <div className="preferences-content">
            <h3 className="settings-section-label">Preferences</h3>
            <p className="settings-section-description">
              Choose how Nestly displays information.
            </p>
          </div>
        </div>

        <div className="measurement-settings">
          <div className="measurement-content">
            <h4 className="settings-item-label">Measurement Units</h4>
            <p className="settings-item-description">
              Choose how height, weight, and feeding amounts are displayed.
            </p>
          </div>

          <div className="measurement-units-change">
            <select className="settings-unit-select">
              <option value="imperial">Imperial (in, lbs, oz)</option>
              <option value="metric">Metric (cm, kg, mL)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="data-settings">
        <div className="data-heading">
          <span className="settings-section-icon">📦</span>

          <div className="data-title-group">
            <h3 className="settings-section-label">Data</h3>
            <p className="settings-section-description">
              Manage and export your data.
            </p>
          </div>
        </div>

        <div className="export-data-settings">
          <div className="settings-action-row">
            <span className="settings-section-icon">📥</span>

            <div className="settings-action-content">
              <h3 className="settings-item-label">Export Data</h3>
              <p className="settings-item-description">
                Download a copy of all your child's records in JSON format.
              </p>
            </div>

            <div className="export-action">
              <button className="export-data-btn">Export Data</button>
            </div>
          </div>
        </div>

        <div className="delete-data-settings">
          <div className="settings-action-row">
            <span className="settings-section-icon">🗑️</span>

            <div className="settings-action-content">
              <h3 className="settings-item-label">Delete All Data</h3>
              <p className="settings-item-description">
                Permanently delete all your child's records.
              </p>
            </div>

            <div className="delete-action">
              <button className="delete-data-btn">Delete Data</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SettingsPage;
