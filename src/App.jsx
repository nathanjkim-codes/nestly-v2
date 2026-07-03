import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { useState } from "react";

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
          date: "7-23-2023",
          height: 22.5,
          weight: 11,
        },
        {
          date: "8-15-2023",
          height: 25,
          weight: 15,
        },
        {
          date: "9-20-2023",
          height: 29,
          weight: 20,
        },
      ],
      sleepRecords: [],
      feedingRecords: [],
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
          date: "4-15-2023",
          height: 26,
          weight: 18,
        },
        {
          date: "5-10-2023",
          height: 29,
          weight: 20,
        },
        {
          date: "6-7-2023",
          height: 32,
          weight: 25,
        },
      ],
      sleepRecords: [],
      feedingRecords: [],
      vaccinations: [],
      milestones: [],
      reports: [],
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
        <Header
          children={children}
          selectedChildId={selectedChildId}
          setSelectedChildId={setSelectedChildId}
          selectedChild={selectedChild}
        />
        <Dashboard selectedChild={selectedChild} />
      </main>
    </div>
  );
}

export default App;
