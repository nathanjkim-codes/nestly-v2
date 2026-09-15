import { useState } from "react";

export function GrowthRecordForm({ handleAddRecord }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const newGrowthRecord = {
      id: crypto.randomUUID(),
      date: dateInput,
      height: Number(heightInput),
      weight: Number(weightInput),
      note: noteInput,
    };
    handleAddRecord(newGrowthRecord);
  };

  const [dateInput, setDateInput] = useState("");
  const [heightInput, setHeightInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [noteInput, setNoteInput] = useState("");

  const handleDateChange = (e) => {
    setDateInput(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeightInput(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeightInput(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNoteInput(e.target.value);
  };

  return (
    <form className="quick-add-form growth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="growth-date">Date:</label>
        <input
          type="date"
          id="growth-date"
          value={dateInput}
          onChange={handleDateChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="growth-height">Height (in):</label>
        <input
          type="number"
          id="growth-height"
          value={heightInput}
          onChange={handleHeightChange}
          step="0.1"
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="growth-weight">Weight (lb):</label>
        <input
          type="number"
          id="growth-weight"
          value={weightInput}
          onChange={handleWeightChange}
          step="0.1"
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="growth-notes">Notes:</label>
        <textarea
          id="growth-notes"
          value={noteInput}
          onChange={handleNoteChange}
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

export default GrowthRecordForm;
