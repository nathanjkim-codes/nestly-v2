import { useOutletContext } from "react-router-dom";
import Dashboard from "../Components/Dashboard";

export function DashboardPage() {
  const { selectedChild, selectedUnit } = useOutletContext();

  return (
    <Dashboard selectedChild={selectedChild} selectedUnit={selectedUnit} />
  );
}

export default DashboardPage;
