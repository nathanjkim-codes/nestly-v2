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

  return (
    <div className="child-selector">
      <button className="child-selector-btn" onClick={toggleDropdown}>
        {selectedChild?.name} {isOpen ? "▲" : "▼"}
      </button>
    </div>
  );
}

export default ChildSelector;
