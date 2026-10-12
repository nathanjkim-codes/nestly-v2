export function MoodQuickAdd() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="quick-add-form mood-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="mood-date">Date:</label>
        <input type="date" id="mood-date" required />
      </div>

      <div className="form-group">
        <label htmlFor="mood-time">Time:</label>
        <input type="time" id="mood-time" required />
      </div>

      <div className="form-group">
        <label htmlFor="mood-type">Mood:</label>
        <select id="mood-type" required>
          <option value="">Select mood</option>
          <option value="happy">😊 Happy</option>
          <option value="calm">😌 Calm</option>
          <option value="neutral">😐 Neutral</option>
          <option value="fussy">😠 Fussy</option>
          <option value="sad">😢 Sad</option>
          <option value="crying">😭 Crying</option>
          <option value="sleepy">😴 Sleepy</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="mood-notes">Notes:</label>
        <textarea
          id="mood-notes"
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

export default MoodQuickAdd;
