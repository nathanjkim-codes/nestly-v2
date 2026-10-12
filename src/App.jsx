import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header.jsx";
import { useState, useEffect } from "react";

function App() {
  // useState
  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);

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
      const response = await fetch("http://localhost:3000/api/children");
      const data = await response.json();

      setChildren(data);
      setSelectedChildId(data[0].id);
    };

    fetchChildren();
  }, []);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <Header
          children={children}
          setSelectedChildId={setSelectedChildId}
          selectedChild={selectedChild}
        />
        <Outlet
          context={{
            selectedChild,
            selectedUnit,
            setSelectedUnit,
            children,
            setChildren,
          }}
        />
      </main>
    </div>
  );
}

export default App;
