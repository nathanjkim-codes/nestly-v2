import { createBrowserRouter } from "react-router";
import App from "./App";
import DashboardPage from "./Pages/DashboardPage";
import ChildrenPage from "./Pages/ChildrenPage";
import GrowthRecordsPage from "./Pages/GrowthRecordsPage";
import SleepRecordsPage from "./Pages/SleepRecordsPage";
import FeedingRecordsPage from "./Pages/FeedingRecordsPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import ReportsPage from "./Pages/ReportsPage";
import SettingsPage from "./Pages/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },

      {
        path: "children",
        element: <ChildrenPage />,
      },

      {
        path: "growth",
        element: <GrowthRecordsPage />,
      },

      {
        path: "sleep",
        element: <SleepRecordsPage />,
      },

      {
        path: "feeding",
        element: <FeedingRecordsPage />,
      },

      {
        path: "analytics",
        element: <AnalyticsPage />,
      },

      {
        path: "reports",
        element: <ReportsPage />,
      },

      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

export default router;
