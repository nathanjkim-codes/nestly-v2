import { formatDate } from "../utils/formatDate";
import { calculateAge } from "../utils/calculateAge";

export function ChildrenPage() {
  const children = [
    {
      id: 1,
      name: "Emma",
      birthDate: "2023-06-3",
      gender: "Female",
      avatar: null,
    },

    {
      id: 2,
      name: "Evelyn",
      birthDate: "2023-3-23",
      gender: "Female",
      avatar: null,
    },
  ];

  return (
    <section className="children-page">
      <h1 className="children-page-heading">Children</h1>
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
                  <img src="" alt={child.name} />
                  <span>{child.name}</span>
                </td>

                <td>
                  {age.years} years {age.months} months
                </td>

                <td>{child.gender}</td>

                <td>{formatDate(child.birthDate)}</td>

                <td className="children-page-cell-actions">
                  <button>View</button>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
