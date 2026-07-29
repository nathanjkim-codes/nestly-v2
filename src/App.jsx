import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header.jsx";
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
          date: "2023-07-23T07:30:00",
          height: 22.5,
          weight: 11,
        },
        {
          date: "2023-08-15T07:30:00",
          height: 25,
          weight: 15,
        },
        {
          date: "2023-09-23T07:30:00",
          height: 29,
          weight: 20,
        },
        {
          date: "2023-10-15T07:30:00",
          height: 30,
          weight: 21,
        },
        {
          date: "2023-11-17T07:30:00",
          height: 31.5,
          weight: 21,
        },
        {
          date: "2023-12-15T07:30:00",
          height: 31.5,
          weight: 20,
        },
        {
          date: "2024-01-10T07:30:00",
          height: 32,
          weight: 21,
        },
        {
          date: "2024-02-09T07:30:00",
          height: 32,
          weight: 21,
        },
        {
          date: "2024-03-16T07:30:00",
          height: 32.25,
          weight: 22,
        },
        {
          date: "2024-04-19T07:30:00",
          height: 32.5,
          weight: 22,
        },
        {
          date: "2024-05-20T07:30:00",
          height: 32.5,
          weight: 21,
        },
        {
          date: "2024-06-16T07:30:00",
          height: 33,
          weight: 21,
        },
        {
          date: "2024-07-15T07:30:00",
          height: 33,
          weight: 22,
        },
      ],
      sleepRecords: [
        {
          date: "2023-07-09T09:00:00",
          day: "Sun",
          duration: 10,
        },
        {
          date: "2023-07-10T09:00:00",
          day: "Mon",
          duration: 11,
        },
        {
          date: "2023-07-11T09:00:00",
          day: "Tue",
          duration: 9,
        },
        {
          date: "2023-07-12T09:00:00",
          day: "Wed",
          duration: 10,
        },
        {
          date: "2023-07-13T09:00:00",
          day: "Thu",
          duration: 11,
        },
        {
          date: "2023-07-14T09:00:00",
          day: "Fri",
          duration: 12,
        },
        {
          date: "2023-07-15T09:00:00",
          day: "Sat",
          duration: 10,
        },
        {
          date: "2023-07-23T09:00:00",
          day: "Sun",
          duration: 9.5,
        },
        {
          date: "2023-07-24T09:00:00",
          day: "Mon",
          duration: 10,
        },
        {
          date: "2023-07-25T09:00:00",
          day: "Tue",
          duration: 8.5,
        },
        {
          date: "2023-07-26T09:00:00",
          day: "Wed",
          duration: 9,
        },
        {
          date: "2023-07-27T09:00:00",
          day: "Thu",
          duration: 9.5,
        },
        {
          date: "2023-07-28T09:00:00",
          day: "Fri",
          duration: 8,
        },
        {
          date: "2023-07-29T09:15:00",
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
        <Outlet context={{ selectedChild }} />
      </main>
    </div>
  );
}

export default App;
