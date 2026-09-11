import { useState } from "react";

export function ChildForm({ handleAddChild }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const newChild = {
      id: crypto.randomUUID(),
      profile: {
        name: nameInput,
        birthDate: birthDateInput,
        gender: genderInput,
        profileImage: profileImage,
      },
    };
    handleAddChild(newChild);
  };

  const [nameInput, setNameInput] = useState("");
  const [birthDateInput, setBirthDateInput] = useState("");
  const [genderInput, setGenderInput] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleBirthDateChange = (e) => {
    setBirthDateInput(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGenderInput(e.target.value);
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  return (
    <form className="quick-add-form child-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="child-name">Name:</label>
        <input
          value={nameInput}
          onChange={handleNameChange}
          type="text"
          id="child-name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="birth-date">Birth Date:</label>
        <input
          value={birthDateInput}
          onChange={handleBirthDateChange}
          type="date"
          id="birth-date"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="gender-select">Gender:</label>
        <select
          value={genderInput}
          onChange={handleGenderChange}
          id="gender-select"
        >
          <option value="">Select Gender</option>
          <option value="boy">Boy</option>
          <option value="girl">Girl</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="profile-image">Profile Image:</label>
        <input
          onChange={handleProfileImageChange}
          type="file"
          id="profile-image"
          accept="image/*"
        />
      </div>

      <button type="submit" className="save-btn">
        + Add Child
      </button>
    </form>
  );
}

export default ChildForm;
