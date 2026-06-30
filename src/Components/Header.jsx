import ChildSelector from "./ChildSelector.jsx";

function Header({
  children,
  selectedChildId,
  setSelectedChildId,
  selectedChild,
}) {
  return (
    <div className="header">
      <div className="header-info">
        <h1 className="header-title">Good morning, Sarah! 👋</h1>
        <p className="header-subtitle">
          Here's how {selectedChild.profile.name} is doing today.
        </p>
      </div>
      <div className="header-actions">
        <button className="add-record-button">+ Add Record</button>

        <ChildSelector
          children={children}
          selectedChildId={selectedChildId}
          setSelectedChildId={setSelectedChildId}
          selectedChild={selectedChild}
        />

        <button className="notification-button">🔔</button>
      </div>
    </div>
  );
}

export default Header;
