import { SleepRecordForm } from "./SleepRecordForm";
import { FeedingRecordForm } from "./FeedingRecordForm";
import { GrowthRecordForm } from "./GrowthRecordForm";
import { MoodQuickAdd } from "./MoodQuickAdd";
import { NoteQuickAdd } from "./NoteQuickAdd";

export function QuickAddModal({ isOpen, onClose, selectedQuickAdd }) {
  if (!isOpen) {
    return null;
  }

  const renderQuickAdd = () => {
    switch (selectedQuickAdd) {
      case "sleep":
        return <SleepRecordForm />;
      case "feeding":
        return <FeedingRecordForm />;
      case "growth":
        return <GrowthRecordForm />;
      case "mood":
        return <MoodQuickAdd />;
      case "note":
        return <NoteQuickAdd />;
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
          <h3 className="modal-title">{selectedQuickAddTitle}</h3>
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
