import { SleepQuickAdd } from "./SleepQuickAdd";

export function QuickAddModal({ isOpen, onClose, selectedQuickAdd }) {
  if (!isOpen) {
    return null;
  }

  const renderQuickAdd = () => {
    switch (selectedQuickAdd) {
      case "sleep":
        return <SleepQuickAdd />;
      default:
        return null;
    }
  };

  return (
    <div className="modal-back-drop">
      <div className="modal-box">
        <div className="modal-header">
          <h3 className="title">Sleep</h3>
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
