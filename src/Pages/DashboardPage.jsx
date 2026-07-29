import { useOutletContext } from "react-router";
import Dashboard from "../Components/Dashboard";

export function DashboardPage() {
  const { selectedChild } = useOutletContext();

  return <Dashboard selectedChild={selectedChild} />;
}

export default DashboardPage;
