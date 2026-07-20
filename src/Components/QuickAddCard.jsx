import { useState } from "react";
import { QuickAddModal } from "../QuickAddModal";

export function QuickAddCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="dashboard-card quick-add-card">
      <div className="card-header">
        <h3 className="card-title">Quick Add</h3>
      </div>

      <div className="quick-add-actions">
        <button
          className="quick-add-button"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="quick-add-icon">🌙</span>
          <span className="quick-add-label">Sleep</span>
        </button>

        <button className="quick-add-button">
          <span className="quick-add-icon">🍼</span>
          <span className="quick-add-label">Feeding</span>
        </button>

        <button className="quick-add-button">
          <span className="quick-add-icon">👶</span>
          <span className="quick-add-label">Growth</span>
        </button>

        <button className="quick-add-button">
          <span className="quick-add-icon">😊</span>
          <span className="quick-add-label">Mood</span>
        </button>

        <button className="quick-add-button">
          <span className="quick-add-icon">📝</span>
          <span className="quick-add-label">Note</span>
        </button>
      </div>

      <QuickAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default QuickAddCard;
