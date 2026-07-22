export function FeedingQuickAdd() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="quick-add-form feeding-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="feeding-date">Date:</label>
        <input type="date" id="feeding-date" required />
      </div>

      <div className="form-group">
        <label htmlFor="feeding-time">Time:</label>
        <input type="time" id="feeding-time" required />
      </div>

      <div className="form-group">
        <label htmlFor="feeding-type">Feeding Type:</label>
        <select name="feeding-type" id="feeding-type" required>
          <option value="breast">Breast</option>
          <option value="bottle">Bottle</option>
          <option value="formula">Formula</option>
          <option value="solids">Solids</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="feeding-notes">Notes:</label>
        <textarea
          id="feeding-notes"
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

export default FeedingQuickAdd;
