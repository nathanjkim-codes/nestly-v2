import { useOutletContext } from "react-router-dom";
import Dashboard from "../Components/Dashboard";

export function DashboardPage() {
  const { selectedChild, selectedUnit, loading, error } = useOutletContext();

  return (
    <Dashboard
      selectedChild={selectedChild}
      selectedUnit={selectedUnit}
      loading={loading}
      error={error}
    />
  );
}

export default DashboardPage;
