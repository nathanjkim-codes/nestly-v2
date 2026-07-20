function QuickAddModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-back-drop">
      <div className="modal-box">
        <div className="modal-header">
          <h3 className="title"></h3>
          <span className="modal-close-btn" onClick={onClose}>
            X
          </span>
        </div>
        <div className="modal-content"></div>
      </div>
    </div>
  );
}
