export function NoteQuickAdd() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="quick-add-form note-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="note-date">Date:</label>
        <input type="date" id="note-date" required />
      </div>

      <div className="form-group">
        <label htmlFor="note-time">Time:</label>
        <input type="time" id="note-time" required />
      </div>

      <div className="form-group">
        <label htmlFor="note-category">Category:</label>

        <select id="note-category">
          <option value="">Select category (optional)</option>
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="milestone">Milestone</option>
          <option value="behavior">Behavior</option>
          <option value="medication">Medication</option>
          <option value="appointment">Appointment</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="note-text">Notes:</label>
        <textarea
          id="note-text"
          rows={8}
          placeholder="Add note details"
          required
        ></textarea>
      </div>

      <button type="submit" className="save-btn">
        Save
      </button>
    </form>
  );
}

export default NoteQuickAdd;
