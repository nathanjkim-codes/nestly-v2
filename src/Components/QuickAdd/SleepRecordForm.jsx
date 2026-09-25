import { useState, useEffect } from "react";

export function SleepRecordForm({ handleAddRecord, editSleepRecord }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const date = new Date(dateInput);
    const shortDayName = date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    const newSleepRecord = {
      id: crypto.randomUUID(),
      date: dateInput,
      day: shortDayName,
      duration: Number(durationInput),
      note: noteInput,
    };
    handleAddRecord(newSleepRecord);
  };

  const [dateInput, setDateInput] = useState("");
  const [durationInput, setDurationInput] = useState("");
  const [noteInput, setNoteInput] = useState("");

  const handleDateChange = (e) => {
    setDateInput(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDurationInput(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNoteInput(e.target.value);
  };

  useEffect(() => {
    if (editSleepRecord) {
      setDateInput(editSleepRecord.date);
      setDurationInput(editSleepRecord.duration);
      setNoteInput(editSleepRecord.note);
    }
  }, [editSleepRecord]);

  return (
    <form className="quick-add-form sleep-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="sleep-date">Date:</label>
        <input
          type="date"
          id="sleep-date"
          value={dateInput}
          onChange={handleDateChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="sleep-start-time">sleep Hours:</label>
        <input
          type="number"
          id="sleep-start-time"
          value={durationInput}
          onChange={handleDurationChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="sleep-notes">Notes:</label>
        <textarea
          id="sleep-notes"
          rows={4}
          value={noteInput}
          onChange={handleNoteChange}
          placeholder="Add notes (optional)"
        ></textarea>
      </div>

      <button type="submit" className="save-btn">
        Save
      </button>
    </form>
  );
}

export default SleepRecordForm;
