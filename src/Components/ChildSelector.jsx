import { useState } from "react";

function ChildSelector({
  children,
  selectedChildId,
  setSelectedChildId,
  selectedChild,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectChild = (childId) => {
    setSelectedChildId(childId);
    setIsOpen(false);
  };

  const childList = children.map((child) => (
    <button
      className="child-list-btn"
      key={child.id}
      onClick={() => handleSelectChild(child.id)}
    >
      {child.name}
    </button>
  ));

  return (
    <div className="child-dropdown-container">
      <button className="child-dropdown-btn" onClick={toggleDropdown}>
        {selectedChild?.name} {isOpen ? "▲" : "▼"}
      </button>

      <div className="child-dropdown-list">{isOpen && childList}</div>
    </div>
  );
}

export default ChildSelector;
