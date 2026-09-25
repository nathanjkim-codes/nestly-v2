import { useState } from "react";

export function FeedingRecordForm({ handleAddRecord }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const dateTime = `${dateInput}T${timeInput}`;

    const newRecord = {
      id: crypto.randomUUID(),
      date: dateTime,
      type: typeInput,
      amount: Number(amountInput),
      note: noteInput,
    };
    handleAddRecord(newRecord);
  };

  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [noteInput, setNoteInput] = useState("");

  const handleDateChange = (e) => {
    setDateInput(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTimeInput(e.target.value);
  };

  const handleTypeChange = (e) => {
    setTypeInput(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmountInput(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNoteInput(e.target.value);
  };

  return (
    <form className="quick-add-form feeding-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="feeding-date">Date:</label>
        <input
          type="date"
          id="feeding-date"
          value={dateInput}
          onChange={handleDateChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="feeding-time">Time:</label>
        <input
          type="time"
          id="feeding-time"
          value={timeInput}
          onChange={handleTimeChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="feeding-type">Feeding Type:</label>
        <select
          name="feeding-type"
          id="feeding-type"
          value={typeInput}
          onChange={handleTypeChange}
          required
        >
          <option value="" disabled>
            Select feeding type
          </option>
          <option value="breast">Breast</option>
          <option value="bottle">Bottle</option>
          <option value="formula">Formula</option>
          <option value="solids">Solids</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="feeding-amount">Amount:</label>
        <input
          type="number"
          id="feeding-amount"
          value={amountInput}
          onChange={handleAmountChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="feeding-notes">Notes:</label>
        <textarea
          id="feeding-notes"
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

export default FeedingRecordForm;
