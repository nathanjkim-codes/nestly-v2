import { useState, useEffect } from "react";

export function GrowthRecordForm({
  handleAddRecord,
  editGrowthRecord,
  handleUpdateRecord,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editGrowthRecord) {
      const updatedGrowthRecord = {
        id: editGrowthRecord.id,
        date: dateInput,
        height: Number(heightInput),
        weight: Number(weightInput),
        note: noteInput,
      };
      handleUpdateRecord(updatedGrowthRecord);
    } else {
      const newGrowthRecord = {
        id: crypto.randomUUID(),
        date: dateInput,
        height: Number(heightInput),
        weight: Number(weightInput),
        note: noteInput,
      };
      handleAddRecord(newGrowthRecord);
    }
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

  useEffect(() => {
    if (editGrowthRecord) {
      setDateInput(editGrowthRecord.date);
      setHeightInput(editGrowthRecord.height);
      setWeightInput(editGrowthRecord.weight);
      setNoteInput(editGrowthRecord.note);
    } else {
      setDateInput("");
      setHeightInput("");
      setWeightInput("");
      setNoteInput("");
    }
  }, [editGrowthRecord]);

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
          placeholder="Enter height"
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
          placeholder="Enter weight"
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
