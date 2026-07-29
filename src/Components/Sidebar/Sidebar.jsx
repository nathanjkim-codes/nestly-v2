import logo from "../../assets/logo.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo-area">
        <div className="logo-box">
          <img src={logo} alt="Nestly logo" className="logo-image" />
        </div>

        <div className="app-title">Nestly</div>
      </div>
      <div className="sidebar-menu">
        <div className="sidebar-list">
          <button className="sidebar-item active">
            <span className="sidebar-icon">🏠</span>
            <span className="sidebar-label">Dashboard</span>
          </button>

          <button className="sidebar-item">
            <span className="sidebar-icon">👶</span>
            <span className="sidebar-label">Children</span>
          </button>

          <button className="sidebar-item">
            <span className="sidebar-icon">📈</span>
            <span className="sidebar-label">Growth Records</span>
          </button>

          <button className="sidebar-item">
            <span className="sidebar-icon">🌙</span>
            <span className="sidebar-label">Sleep Records</span>
          </button>

          <button className="sidebar-item">
            <span className="sidebar-icon">🍼</span>
            <span className="sidebar-label">Feeding Records</span>
          </button>

          <button className="sidebar-item">
            <span className="sidebar-icon">📊</span>
            <span className="sidebar-label">Analytics</span>
          </button>

          <button className="sidebar-item">
            <span className="sidebar-icon">📄</span>
            <span className="sidebar-label">Reports</span>
          </button>

          <button className="sidebar-item">
            <span className="sidebar-icon">⚙️</span>
            <span className="sidebar-label">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
