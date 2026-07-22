export function GrowthQuickAdd() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="quick-add-form growth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="growth-date">Date:</label>
        <input type="date" id="growth-date" required />
      </div>

      <div className="form-group">
        <label htmlFor="growth-time">Time:</label>
        <input type="time" id="growth-time" required />
      </div>

      <div className="form-group">
        <label htmlFor="growth-height">Height (in):</label>
        <input type="number" id="growth-height" step="0.1" min="0" required />
      </div>

      <div className="form-group">
        <label htmlFor="growth-weight">Weight (lb):</label>
        <input type="number" id="growth-weight" step="0.1" min="0" required />
      </div>

      <div className="form-group">
        <label htmlFor="growth-head-circumference">
          Head Circumference (in):
        </label>
        <input
          type="number"
          id="growth-head-circumference"
          step="0.1"
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="growth-notes">Notes:</label>
        <textarea
          id="growth-notes"
          rows={4}
          placeholder="Add notes (optional)"
        ></textarea>
      </div>

      <button type="submit" className="save-btn">
        Save
      </button>
    </form>
  );
}
export default GrowthQuickAdd;
