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
          Here's how {selectedChild.name} is doing today.
        </p>
      </div>
      <div className="header-actions">
        <button className="add-record-button">+ Add Record</button>
        <button className="child-selector">{selectedChild.name} ▼</button>
        <button className="notification-button">🔔</button>
      </div>
    </div>
  );
}

export default Header;
