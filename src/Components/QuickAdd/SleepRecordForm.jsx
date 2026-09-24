import { useState } from "react";

export function SleepRecordForm({ handleAddRecord }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const date = new Date(dateInput);
    const shortDayName = date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    const sleepStartTime = (startTimeInput) => {
      const [startHours, startMinutes] = startTimeInput.split(":");
      const startHoursNumber = Number(startHours);
      const startMinutesNumber = Number(startMinutes);

      const startTimeTotalMinutes = startHoursNumber * 60 + startMinutesNumber;
      return startTimeTotalMinutes;
    };

    const sleepEndTime = (endTimeInput) => {
      const [endHours, endMinutes] = endTimeInput.split(":");
      const endHoursNumber = Number(endHours);
      const endMinutesNumber = Number(endMinutes);

      const endTimeTotalMinutes = endHoursNumber * 60 + endMinutesNumber;
      return endTimeTotalMinutes;
    };

    const startEndTotalMinutes = (
      startTimeTotalMinutes,
      endTimeTotalMinutes,
    ) => {
      if (endTimeTotalMinutes < startTimeTotalMinutes) {
        endTimeTotalMinutes += 24 * 60;
      }

      return endTimeTotalMinutes - startTimeTotalMinutes;
    };

    const startTimeTotalMinutes = sleepStartTime(startTimeInput);
    const endTimeTotalMinutes = sleepEndTime(endTimeInput);

    const sleepDurationMinutes = startEndTotalMinutes(
      startTimeTotalMinutes,
      endTimeTotalMinutes,
    );

    const sleepDecimalHours = sleepDurationMinutes / 60;

    const newSleepRecord = {
      id: crypto.randomUUID(),
      date: dateInput,
      day: shortDayName,
      duration: sleepDecimalHours,
      note: noteInput,
    };
    handleAddRecord(newSleepRecord);
  };

  const [dateInput, setDateInput] = useState("");
  const [startTimeInput, setStartTimeInput] = useState("");
  const [endTimeInput, setEndTimeInput] = useState("");
  const [noteInput, setNoteInput] = useState("");

  const handleDateChange = (e) => {
    setDateInput(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTimeInput(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTimeInput(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNoteInput(e.target.value);
  };

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
        <label htmlFor="sleep-start-time">Start Time:</label>
        <input
          type="time"
          id="sleep-start-time"
          value={startTimeInput}
          onChange={handleStartTimeChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="sleep-end-time">End Time:</label>
        <input
          type="time"
          id="sleep-end-time"
          value={endTimeInput}
          onChange={handleEndTimeChange}
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
