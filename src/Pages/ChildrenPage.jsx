import { formatDate } from "../utils/formatDate";
import { calculateAge } from "../utils/calculateAge";
import EmmaAvatar from "../assets/avatars/Emma.png";
import EvelynAvatar from "../assets/avatars/Evelyn.png";

export function ChildrenPage() {
  const children = [
    {
      id: 1,
      name: "Emma",
      birthDate: "2023-06-03",
      gender: "Female",
      avatar: EmmaAvatar,
    },

    {
      id: 2,
      name: "Evelyn",
      birthDate: "2023-03-23",
      gender: "Female",
      avatar: EvelynAvatar,
    },
  ];

  return (
    <section className="children-page">
      <div className="children-page-top">
        <div className="children-page-title-group">
          <h1 className="children-page-heading">Children</h1>
          <p className="children-page-description">
            Manage your children's profiles.
          </p>
        </div>

        <button className="children-page-add-btn">+ Add Child</button>
      </div>

      <table className="children-page-container">
        <thead className="children-page-header">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="children-page-data">
          {children.map((child) => {
            const age = calculateAge(child.birthDate);
            return (
              <tr key={child.id} className="children-page-row">
                <td className="children-page-cell-name">
                  <img src={child.avatar} alt={`${child.name} avatar`} />
                  <span>{child.name}</span>
                </td>

                <td>
                  {age.years} years {age.months} months
                </td>

                <td>{child.gender}</td>

                <td>{formatDate(child.birthDate)}</td>

                <td className="children-page-cell-actions">
                  <button className="children-page-view-btn">View</button>
                  <button className="children-page-edit-btn">Edit</button>
                  <button className="children-page-delete-btn">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="children-page-count">
        {children.length} {children.length === 1 ? "child" : "children"}
      </p>
    </section>
  );
}

export default ChildrenPage;
