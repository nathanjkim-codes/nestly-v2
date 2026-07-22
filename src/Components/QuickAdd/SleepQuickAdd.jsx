export function SleepQuickAdd() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="quick-add-form sleep-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="sleep-date">Date:</label>
        <input type="date" id="sleep-date" required />
      </div>

      <div className="form-group">
        <label htmlFor="sleep-start-time">Start Time:</label>
        <input type="time" id="sleep-start-time" required />
      </div>

      <div className="form-group">
        <label htmlFor="sleep-end-time">End Time:</label>
        <input type="time" id="sleep-end-time" required />
      </div>

      <div className="form-group">
        <label htmlFor="sleep-notes">Notes:</label>
        <textarea
          id="sleep-notes"
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

export default SleepQuickAdd;
