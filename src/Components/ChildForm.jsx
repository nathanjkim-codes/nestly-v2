export function ChildForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="quick-add-form Child-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="child-name">Name:</label>
        <input type="text" id="child-name" required />
      </div>

      <div className="form-group">
        <label htmlFor="birth-date">Birth Date:</label>
        <input type="date" id="birth-date" required />
      </div>

      <div className="form-group">
        <label htmlFor="gender-select">Gender:</label>
        <select id="gender-select">
          <option value="boy">Boy</option>
          <option value="girl">Girl</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="profile-image">Profile Image:</label>
        <input type="file" id="profile-image" accept="image/*" />
      </div>

      <button type="submit" className="save-btn">
        + Add Child
      </button>
    </form>
  );
}

export default ChildForm;
