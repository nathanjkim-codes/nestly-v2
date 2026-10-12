import { NavLink } from "react-router-dom";
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
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <span className="sidebar-icon">🏠</span>
            <span className="sidebar-label">Dashboard</span>
          </NavLink>

          <NavLink
            to="/children"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <span className="sidebar-icon">👶</span>
            <span className="sidebar-label">Children</span>
          </NavLink>

          <NavLink
            to="/growth"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <span className="sidebar-icon">📈</span>
            <span className="sidebar-label">Growth Records</span>
          </NavLink>

          <NavLink
            to="/sleep"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <span className="sidebar-icon">🌙</span>
            <span className="sidebar-label">Sleep Records</span>
          </NavLink>

          <NavLink
            to="/feeding"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <span className="sidebar-icon">🍼</span>
            <span className="sidebar-label">Feeding Records</span>
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <span className="sidebar-icon">📊</span>
            <span className="sidebar-label">Analytics</span>
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <span className="sidebar-icon">📄</span>
            <span className="sidebar-label">Reports</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <span className="sidebar-icon">⚙️</span>
            <span className="sidebar-label">Settings</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
