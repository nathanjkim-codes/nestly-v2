import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header.jsx";
import { useState, useEffect } from "react";

function App() {
  // useState
  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [childrenLoading, setChildrenLoading] = useState(true);
  const [growthRecords, setGrowthRecords] = useState([]);
  const [growthRecordsLoading, setGrowthRecordsLoading] = useState(false);
  const [growthRecordsError, setGrowthRecordsError] = useState(null);
  const [sleepRecords, setSleepRecords] = useState([]);
  const [sleepRecordsLoading, setSleepRecordsLoading] = useState(false);
  const [sleepRecordsError, setSleepRecordsError] = useState(null);
  const [childrenError, setChildrenError] = useState(null);

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
        setChildrenError("Failed to load children");
      } finally {
        setChildrenLoading(false);
      }
    };

    fetchChildren();
  }, []);

  // Keep the selected child valid when the children array changes
  useEffect(() => {
    const existingChild = children.find((child) => {
      return child.id === selectedChildId;
    });

    // If the selected child was deleted, select the first available child
    if (!existingChild) {
      setSelectedChildId(children[0]?.id ?? null);
    }
  }, [children]);

  //
  useEffect(() => {
    if (!selectedChildId) {
      return;
    }
    // Fetch growth records using selectedChildId
    const fetchGrowthRecords = async () => {
      try {
        setGrowthRecordsLoading(true);
        setGrowthRecordsError(null);
        const response = await fetch(
          `http://localhost:3000/api/children/${selectedChildId}/growthRecords`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setGrowthRecords(data);
      } catch (error) {
        console.error(error);
        setGrowthRecordsError("Failed to load growth records");
      } finally {
        setGrowthRecordsLoading(false);
      }
    };
    fetchGrowthRecords();
  }, [selectedChildId]);

  // Fetch sleep records using selectedChildId
  useEffect(() => {
    if (!selectedChildId) {
      return;
    }

    const fetchSleepRecords = async () => {
      try {
        setSleepRecordsLoading(true);
        setSleepRecordsError(null);
        const response = await fetch(
          `HTTP://localhost:3000/api/children/${selectedChildId}/sleepRecords`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log("Sleep records from server:", data);

        setSleepRecords(data);
      } catch (error) {
        console.error(error);
        setSleepRecordsError("Failed to load sleep records");
      } finally {
        setSleepRecordsLoading(false);
      }
    };

    fetchSleepRecords();
  }, [selectedChildId]);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <Header
          children={children}
          setSelectedChildId={setSelectedChildId}
          selectedChild={selectedChild}
          childrenLoading={childrenLoading}
        />
        <Outlet
          context={{
            selectedChild,
            selectedUnit,
            setSelectedUnit,
            children,
            setChildren,
            growthRecords,
            setGrowthRecords,
            growthRecordsLoading,
            growthRecordsError,
            sleepRecords,
            setSleepRecords,
            sleepRecordsLoading,
            sleepRecordsError,
            childrenLoading,
            childrenError,
          }}
        />
      </main>
    </div>
  );
}

export default App;
