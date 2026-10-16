import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header.jsx";
import { useState, useEffect } from "react";

function App() {
  // useState
  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // selectedChild
  const selectedChild = children.find((child) => child.id === selectedChildId);

  // selectedUnit
  const savedUnit = localStorage.getItem("selectedUnit") || "imperial";

  const [selectedUnit, setSelectedUnit] = useState(savedUnit);

  useEffect(() => {
    localStorage.setItem("selectedUnit", selectedUnit);
  }, [selectedUnit]);

  // GET CHILDREN ON APP LOAD
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/children");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setChildren(data);
        setSelectedChildId(data[0]?.id ?? null);
      } catch (error) {
        console.error(error);
        setError("Failed to load children");
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);
  //// Keep the selected child valid when the children array changes
  useEffect(() => {
    const existingChild = children.find((child) => {
      return child.id === selectedChildId;
    });

    // If the selected child was deleted, select the first available child
    if (!existingChild) {
      setSelectedChildId(children[0]?.id ?? null);
    }
  }, [children]);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <Header
          children={children}
          setSelectedChildId={setSelectedChildId}
          selectedChild={selectedChild}
          loading={loading}
        />
        <Outlet
          context={{
            selectedChild,
            selectedUnit,
            setSelectedUnit,
            children,
            setChildren,
            loading,
            error,
          }}
        />
      </main>
    </div>
  );
}

export default App;
