import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { useState } from "react";

function App() {
  // Mock Data
  const children = [
    {
      id: 1,
      name: "Emma",
      birth: "6-3-2023",
      height: "22 in",
      weight: "7.5 lbs",
      sleep: "14 hrs",
    },

    {
      id: 2,
      name: "Evelyn",
      birth: "3-24-2026",
      height: "20in",
      weight: "7 lbs",
      sleep: "13 hrs",
    },
  ];

  // useState
  const [selectedChildId, setSelectedChildId] = useState(children[0].id);

  // selectedChild
  const selectedChild = children.find((child) => child.id === selectedChildId);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <Header />
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
