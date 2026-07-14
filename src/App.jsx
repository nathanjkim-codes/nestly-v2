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
          date: "2023-08-23T07:30:00",
          height: 29,
          weight: 20,
        },
      ],
      sleepRecords: [
        {
          date: "7-23-2023",
          day: "Sun",
          duration: 9.5,
        },
        {
          date: "7-24-2023",
          day: "Mon",
          duration: 10,
        },
        {
          date: "7-25-2023",
          day: "Tue",
          duration: 8.5,
        },
        {
          date: "7-26-2023",
          day: "Wed",
          duration: 9,
        },
        {
          date: "7-27-2023",
          day: "Thu",
          duration: 9.5,
        },
        {
          date: "7-28-2023",
          day: "Fri",
          duration: 8,
        },
        {
          date: "2023-08-23T09:15:00",
          day: "Sat",
          duration: 9,
        },
      ],
      feedingRecords: [
        {
          date: "2023-07-29T12:45:00",
          type: "Bottle",
          amount: 5,
          unit: "oz",
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
      sleepRecords: [
        {
          date: "4-15-2023",
          day: "Sat",
          duration: 8.5,
        },
        {
          date: "4-16-2023",
          day: "Sun",
          duration: 9,
        },
        {
          date: "4-17-2023",
          day: "Mon",
          duration: 10.5,
        },
        {
          date: "4-18-2023",
          day: "Tue",
          duration: 9.5,
        },
        {
          date: "4-19-2023",
          day: "Wed",
          duration: 9,
        },
        {
          date: "4-20-2023",
          day: "Thu",
          duration: 10,
        },
        {
          date: "4-21-2023",
          day: "Fri",
          duration: 8,
        },
      ],
      feedingRecords: [
        {
          date: "4-20-2023",
          type: "Bottle",
          amount: 4.5,
          unit: "oz",
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
