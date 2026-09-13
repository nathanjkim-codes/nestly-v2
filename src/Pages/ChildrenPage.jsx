import { formatDate } from "../utils/formatDate";
import { calculateAge } from "../utils/calculateAge";
import { ChildForm } from "../Components/ChildForm";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export function ChildrenPage() {
  const { children, setChildren } = useOutletContext();

  const [isChildFormOpen, setIsChildFormOpen] = useState(false);
  const [editChild, setEditChild] = useState(null);

  const hasChildren = children.length > 0;

  const handleAddChild = (newChild) => {
    const newChildArray = [...children, newChild];

    setChildren(newChildArray);
    setIsChildFormOpen(false);
  };

  const handleDeleteById = (id) => {
    setChildren((currentChild) =>
      currentChild.filter((child) => child.id !== id),
    );
  };

  const handleOpenEditChild = (child) => {
    setEditChild(child);
    setIsChildFormOpen(true);
  };

  const handleUpdateChild = (updatedProfile) => {
    setChildren(
      children.map((child) =>
        child.id === editChild.id
          ? {
              ...child,
              profile: {
                ...child.profile,
                ...updatedProfile,
              },
            }
          : child,
      ),
    );
    setEditChild(null);
    setIsChildFormOpen(false);
  };

  return (
    <section className="children-page">
      <div className="page-top">
        <div className="page-title-group">
          <h1 className="page-heading">Children</h1>
          <p className="page-description">Manage your children's profiles.</p>
        </div>

        <button
          className="page-add-btn"
          onClick={() => setIsChildFormOpen(true)}
        >
          + Add Child
        </button>
      </div>

      {isChildFormOpen && (
        <div className="modal-back-drop">
          <div className="modal-box">
            <div className="modal-header">
              <h3 className="modal-title">
                {editChild ? "Edit Child" : "Add Child"}
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsChildFormOpen(false)}
              >
                ✕
              </button>
            </div>
            <ChildForm
              handleAddChild={handleAddChild}
              handleUpdateChild={handleUpdateChild}
              editChild={editChild}
            />
          </div>
        </div>
      )}

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
              const age = calculateAge(child.profile.birthDate);

              return (
                <tr key={child.id} className="page-row">
                  <td className="page-cell-name">
                    <img
                      src={child.profile.profileImage}
                      alt={`${child.profile.name} avatar`}
                    />
                    <span>{child.profile.name}</span>
                  </td>

                  <td>
                    {age.years} years {age.months} months
                  </td>

                  <td>{child.profile.gender}</td>

                  <td>{formatDate(child.profile.birthDate)}</td>

                  <td>
                    <div className="page-cell-actions">
                      <button className="page-view-btn">View</button>
                      <button
                        className="page-edit-btn"
                        onClick={() => handleOpenEditChild(child)}
                      >
                        Edit
                      </button>
                      <button
                        className="page-delete-btn"
                        onClick={() => handleDeleteById(child.id)}
                      >
                        Delete
                      </button>
                    </div>
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
