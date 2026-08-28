import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header.jsx";
import { useState, useEffect } from "react";

function App() {
  // Mock Data
  const children = [
    {
      id: 1,

      profile: {
        name: "Emma",
        age: "2 months",
        gender: "Girl",
        birthDate: "6-3-2023",
        profileImage: "...",
      },

      currentStats: {
        height: "22 in",
        weight: "26 lbs",
        sleep: "12hrs",
        feeding: "2 times",
        mood: "Needs attention",
      },

      insight: {
        title: "✨ AI Insight",
        message: "Emma is growing well!🌱",
        description: "Her sleep and nutrition patterns look balanced.",
      },

      growthRecords: [
        {
          id: 1,
          date: "2023-07-23T07:30:00",
          height: 22.5,
          weight: 11,
        },
        {
          id: 2,
          date: "2023-08-15T07:30:00",
          height: 25,
          weight: 15,
        },
        {
          id: 3,
          date: "2023-09-23T07:30:00",
          height: 29,
          weight: 20,
        },
        {
          id: 4,
          date: "2023-10-15T07:30:00",
          height: 30,
          weight: 21,
        },
        {
          id: 5,
          date: "2023-11-17T07:30:00",
          height: 31.5,
          weight: 21,
        },
        {
          id: 6,
          date: "2023-12-15T07:30:00",
          height: 31.5,
          weight: 20,
        },
        {
          id: 7,
          date: "2024-01-10T07:30:00",
          height: 32,
          weight: 21,
        },
        {
          id: 8,
          date: "2024-02-09T07:30:00",
          height: 32,
          weight: 21,
        },
        {
          id: 9,
          date: "2024-03-16T07:30:00",
          height: 32.25,
          weight: 22,
        },
        {
          id: 10,
          date: "2024-04-19T07:30:00",
          height: 32.5,
          weight: 22,
        },
        {
          id: 11,
          date: "2024-05-20T07:30:00",
          height: 32.5,
          weight: 21,
        },
        {
          id: 12,
          date: "2024-06-16T07:30:00",
          height: 33,
          weight: 21,
        },
        {
          id: 13,
          date: "2024-07-15T07:30:00",
          height: 33,
          weight: 22,
        },
        {
          id: 14,
          date: "2026-05-01T07:30:00",
          height: 33.5,
          weight: 22.5,
        },
        {
          id: 15,
          date: "2026-06-01T07:30:00",
          height: 34,
          weight: 23,
        },
        {
          id: 16,
          date: "2026-07-15T07:30:00",
          height: 34.5,
          weight: 23.5,
        },
        {
          id: 17,
          date: "2026-08-03T07:30:00",
          height: 35,
          weight: 24,
        },
        {
          id: 18,
          date: "2026-08-08T07:30:00",
          height: 35.25,
          weight: 24.5,
        },
      ],
      sleepRecords: [
        {
          id: 1,
          date: "2023-07-09T09:00:00",
          day: "Sun",
          duration: 10,
          note: "Skipped afternoon nap.",
        },
        {
          id: 2,
          date: "2023-07-10T09:00:00",
          day: "Mon",
          duration: 11,
          note: "Slept through the night.",
        },
        {
          id: 3,
          date: "2023-07-11T09:00:00",
          day: "Tue",
          duration: 9,
          note: "Slept through the night.",
        },
        {
          id: 4,
          date: "2023-07-12T09:00:00",
          day: "Wed",
          duration: 10,
          note: "Skipped afternoon nap.",
        },
        {
          id: 5,
          date: "2023-07-13T09:00:00",
          day: "Thu",
          duration: 11,
          note: "Slept through the night.",
        },
        {
          id: 6,
          date: "2023-07-14T09:00:00",
          day: "Fri",
          duration: 12,
          note: "Long afternoon nap.",
        },
        {
          id: 7,
          date: "2023-07-15T09:00:00",
          day: "Sat",
          duration: 10,
          note: "Fell asleep later than usual.",
        },
        {
          id: 8,
          date: "2023-07-23T09:00:00",
          day: "Sun",
          duration: 9.5,
          note: "Skipped afternoon nap.",
        },
        {
          id: 9,
          date: "2023-07-24T09:00:00",
          day: "Mon",
          duration: 10,
          note: "Restless sleep due to teething.",
        },
        {
          id: 10,
          date: "2023-07-25T09:00:00",
          day: "Tue",
          duration: 8.5,
          note: "Fell asleep later than usual.",
        },
        {
          id: 11,
          date: "2023-07-26T09:00:00",
          day: "Wed",
          duration: 9,
          note: "Long afternoon nap.",
        },
        {
          id: 12,
          date: "2023-07-27T09:00:00",
          day: "Thu",
          duration: 9.5,
          note: "Slept through the night.",
        },
        {
          id: 13,
          date: "2023-07-28T09:00:00",
          day: "Fri",
          duration: 8,
          note: "Woke up twice during the night.",
        },
        {
          id: 14,
          date: "2023-07-29T09:15:00",
          day: "Sat",
          duration: 9,
          note: "",
        },
        {
          id: 15,
          date: "2026-07-20T20:00:00",
          duration: 9.2,
        },
        {
          id: 16,
          date: "2026-08-03T20:00:00",
          duration: 9.5,
        },
        {
          id: 17,
          date: "2026-08-06T20:00:00",
          duration: 8.8,
        },
        {
          id: 18,
          date: "2026-08-09T20:00:00",
          duration: 9.7,
        },
      ],
      feedingRecords: [
        {
          id: 1,
          date: "2023-05-18T08:00:00",
          type: "Formula",
          amount: 5.0,
          unit: "oz",
          duration: 20,
          note: "Drank everything",
        },
        {
          id: 2,
          date: "2023-05-18T12:30:00",
          type: "Breastmilk",
          amount: 4.0,
          unit: "oz",
          duration: 18,
          note: "After nap",
        },
        {
          id: 3,
          date: "2023-05-18T05:45:00",
          type: "Formula",
          amount: 5.5,
          unit: "oz",
          duration: 22,
          note: "Morning feeding",
        },
        {
          id: 4,
          date: "2023-05-17T07:15:00",
          type: "Breastmilk",
          amount: 3.5,
          unit: "oz",
          duration: 16,
          note: "Left side",
        },
        {
          id: 5,
          date: "2023-05-17T11:45:00",
          type: "Formula",
          amount: 4.5,
          unit: "oz",
          duration: 20,
          note: "Good appetite",
        },
        {
          id: 6,
          date: "2023-05-17T03:00:00",
          type: "Formula",
          amount: 5.0,
          unit: "oz",
          duration: 21,
          note: "Night feeding",
        },
        {
          id: 7,
          date: "2023-05-16T08:30:00",
          type: "Breastmilk",
          amount: 4.0,
          unit: "oz",
          duration: 19,
          note: "Both sides",
        },
        {
          id: 8,
          date: "2023-05-16T01:15:00",
          type: "Formula",
          amount: 4.5,
          unit: "oz",
          duration: 20,
          note: "Before bedtime",
        },
        {
          id: 9,
          date: "2026-05-10T08:00:00",
          type: "Formula",
          amount: 4.2,
          unit: "oz",
          duration: 20,
          note: "",
        },
        {
          id: 10,
          date: "2026-06-15T08:00:00",
          type: "Breastmilk",
          amount: 4.5,
          unit: "oz",
          duration: 18,
          note: "",
        },
        {
          id: 11,
          date: "2026-07-20T08:00:00",
          type: "Formula",
          amount: 4.8,
          unit: "oz",
          duration: 20,
          note: "",
        },
        {
          id: 12,
          date: "2026-08-04T08:00:00",
          type: "Breastmilk",
          amount: 5.0,
          unit: "oz",
          duration: 18,
          note: "",
        },
        {
          id: 13,
          date: "2026-08-08T08:00:00",
          type: "Formula",
          amount: 5.3,
          unit: "oz",
          duration: 20,
          note: "",
        },
      ],
      vaccinations: [],
      milestones: [],
      reports: [],
    },

    {
      id: 2,

      profile: {
        name: "Evelyn",
        age: "6 months",
        gender: "Girl",
        birthDate: "3-23-2023",
        profileImage: "...",
      },

      currentStats: {
        height: "25.75 in",
        weight: "18 lbs",
        sleep: "14hrs",
        feeding: "4 times",
        mood: "Positive",
      },

      insight: {
        title: "✨ AI Insight",
        message: "Evelyn is growing well!🌱",
        description: "Her sleep and nutrition patterns look balanced.",
      },

      growthRecords: [
        {
          id: 1,
          date: "2023-04-15T07:30:00",
          height: 26,
          weight: 18,
        },
        {
          id: 2,
          date: "2023-05-10T07:30:00",
          height: 29,
          weight: 20,
        },
        {
          id: 3,
          date: "2023-06-07T07:30:00",
          height: 32,
          weight: 25,
        },
        {
          id: 14,
          date: "2026-05-05T07:30:00",
          height: 32.5,
          weight: 21.5,
        },
        {
          id: 15,
          date: "2026-06-15T07:30:00",
          height: 33,
          weight: 22,
        },
        {
          id: 16,
          date: "2026-07-20T07:30:00",
          height: 33.5,
          weight: 22.5,
        },
        {
          id: 17,
          date: "2026-08-05T07:30:00",
          height: 34,
          weight: 23,
        },
        {
          id: 18,
          date: "2026-08-09T07:30:00",
          height: 34.25,
          weight: 23.3,
        },
      ],
      sleepRecords: [
        {
          id: 1,
          date: "2023-04-15T09:00:00",
          day: "Sat",
          duration: 8.5,
          note: "Woke up twice during the night.",
        },
        {
          id: 2,
          date: "2023-04-16T09:00:00",
          day: "Sun",
          duration: 9,
          note: "Slept through the night.",
        },
        {
          id: 3,
          date: "2023-04-17T09:00:00",
          day: "Mon",
          duration: 10.5,
          note: "Long afternoon nap.",
        },
        {
          id: 4,
          date: "2023-04-18T09:00:00",
          day: "Tue",
          duration: 9.5,
          note: "Fell asleep later than usual.",
        },
        {
          id: 5,
          date: "2023-04-19T09:00:00",
          day: "Wed",
          duration: 9,
          note: "Restless sleep due to teething.",
        },
        {
          id: 6,
          date: "2023-04-20T09:00:00",
          day: "Thu",
          duration: 10,
          note: "Skipped afternoon nap.",
        },
        {
          id: 7,
          date: "2023-04-21T09:00:00",
          day: "Fri",
          duration: 8,
          note: "",
        },
        {
          id: 15,
          date: "2026-07-22T20:30:00",
          day: "Wednesday",
          duration: 8.9,
        },
        {
          id: 16,
          date: "2026-08-02T20:30:00",
          day: "Sunday",
          duration: 9.1,
        },
        {
          id: 17,
          date: "2026-08-06T20:30:00",
          day: "Thursday",
          duration: 9.4,
        },
        {
          id: 18,
          date: "2026-08-09T20:30:00",
          day: "Sunday",
          duration: 9.0,
        },
      ],
      feedingRecords: [
        {
          id: 1,
          date: "2023-04-20T12:45:00",
          type: "Bottle",
          amount: 4.5,
          unit: "oz",
          duration: 20,
          note: "Finished the bottle",
        },
        {
          id: 2,
          date: "2023-04-20T07:30:00",
          type: "Breastmilk",
          amount: 3.5,
          unit: "oz",
          duration: 18,
          note: "Left side",
        },
        {
          id: 3,
          date: "2023-04-19T20:15:00",
          type: "Formula",
          amount: 5,
          unit: "oz",
          duration: 25,
          note: "Before bedtime",
        },
        {
          id: 4,
          date: "2026-05-15T08:00:00",
          type: "Formula",
          amount: 3.8,
          unit: "oz",
          duration: 19,
          note: "",
        },
        {
          id: 5,
          date: "2026-06-20T08:00:00",
          type: "Breastmilk",
          amount: 4.1,
          unit: "oz",
          duration: 18,
          note: "",
        },
        {
          id: 6,
          date: "2026-07-22T08:00:00",
          type: "Formula",
          amount: 4.4,
          unit: "oz",
          duration: 20,
          note: "",
        },
        {
          id: 7,
          date: "2026-08-05T08:00:00",
          type: "Breastmilk",
          amount: 4.6,
          unit: "oz",
          duration: 18,
          note: "",
        },
        {
          id: 8,
          date: "2026-08-09T08:00:00",
          type: "Formula",
          amount: 4.9,
          unit: "oz",
          duration: 20,
          note: "",
        },
      ],
      vaccinations: [],
      milestones: [],
      reports: [],
    },
  ];

  // useState
  const [selectedChildId, setSelectedChildId] = useState(children[0].id);

  // selectedChild
  const selectedChild = children.find((child) => child.id === selectedChildId);

  // selectedUnit
  const savedUnit = localStorage.getItem("selectedUnit") || "imperial";

  const [selectedUnit, setSelectedUnit] = useState(savedUnit);

  useEffect(() => {
    localStorage.setItem("selectedUnit", selectedUnit);
  }, [selectedUnit]);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <Header
          children={children}
          selectedChildId={selectedChildId}
          setSelectedChildId={setSelectedChildId}
          selectedChild={selectedChild}
        />
        <Outlet context={{ selectedChild, selectedUnit, setSelectedUnit }} />
      </main>
    </div>
  );
}

export default App;
