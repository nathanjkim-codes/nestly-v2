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

  const hasChildren = children.length > 0;

  return (
    <section className="children-page">
      <div className="page-top">
        <div className="page-title-group">
          <h1 className="page-heading">Children</h1>
          <p className="page-description">Manage your children's profiles.</p>
        </div>

        <button className="page-add-btn">+ Add Child</button>
      </div>

      <table className="page-container">
        <thead className="page-header">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="page-data">
          {hasChildren ? (
            children.map((child) => {
              const age = calculateAge(child.birthDate);

              return (
                <tr key={child.id} className="page-row">
                  <td className="page-cell-name">
                    <img src={child.avatar} alt={`${child.name} avatar`} />
                    <span>{child.name}</span>
                  </td>

                  <td>
                    {age.years} years {age.months} months
                  </td>

                  <td>{child.gender}</td>

                  <td>{formatDate(child.birthDate)}</td>

                  <td className="page-cell-actions">
                    <button className="page-view-btn">View</button>
                    <button className="page-edit-btn">Edit</button>
                    <button className="page-delete-btn">Delete</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="page-empty-state">
                No children added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <p className="page-count">
        {children.length} {children.length === 1 ? "child" : "children"}
      </p>
    </section>
  );
}

export default ChildrenPage;
