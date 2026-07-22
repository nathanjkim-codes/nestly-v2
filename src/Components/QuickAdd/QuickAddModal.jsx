import { SleepQuickAdd } from "./SleepQuickAdd";
import { FeedingQuickAdd } from "./FeedingQuickAdd";
import { GrowthQuickAdd } from "./GrowthQuickAdd";
import { MoodQuickAdd } from "./MoodQuickAdd";

export function QuickAddModal({ isOpen, onClose, selectedQuickAdd }) {
  if (!isOpen) {
    return null;
  }

  const renderQuickAdd = () => {
    switch (selectedQuickAdd) {
      case "sleep":
        return <SleepQuickAdd />;
      case "feeding":
        return <FeedingQuickAdd />;
      case "growth":
        return <GrowthQuickAdd />;
      case "mood":
        return <MoodQuickAdd />;
      default:
        return null;
    }
  };

  const selectedQuickAddTitle = selectedQuickAdd
    ? selectedQuickAdd.charAt(0).toUpperCase() + selectedQuickAdd.slice(1)
    : "";

  return (
    <div className="modal-back-drop">
      <div className="modal-box">
        <div className="modal-header">
          <h3 className="title">{selectedQuickAddTitle}</h3>
          <span className="modal-close-btn" onClick={onClose}>
            ✕
          </span>
        </div>
        <div className="modal-content">{renderQuickAdd()}</div>
      </div>
    </div>
  );
}

export default QuickAddModal;
