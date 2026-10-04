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

  useEffect(() => {
    fetch("http://localhost:3000/api/children")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setChildren(data);
        setSelectedChildId(data[0].id);
      });
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
