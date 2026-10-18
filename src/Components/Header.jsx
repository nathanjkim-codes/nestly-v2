import ChildSelector from "./ChildSelector.jsx";

function Header({
  children,
  setSelectedChildId,
  selectedChild,
  childrenLoading,
}) {
  // Show loading while fetching data
  if (childrenLoading) {
    return <div>Loading...</div>;
  }

  // Show empty state when no child is selected
  if (!selectedChild) {
    return null;
  }
  return (
    <div className="header">
      <div className="header-info">
        <h1 className="header-title">
          Good morning, {selectedChild.profile.name} 👋
        </h1>
        <p className="header-subtitle">
          Here's how {selectedChild.profile.name} is doing today.
        </p>
      </div>
      <div className="header-actions">
        <ChildSelector
          children={children}
          setSelectedChildId={setSelectedChildId}
          selectedChild={selectedChild}
        />

        <button className="notification-button">🔔</button>
      </div>
    </div>
  );
}

export default Header;
