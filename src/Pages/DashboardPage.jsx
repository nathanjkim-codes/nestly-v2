import { useOutletContext } from "react-router-dom";
import Dashboard from "../Components/Dashboard";

export function DashboardPage() {
  const {
    selectedChild,
    selectedUnit,
    childrenLoading,
    childrenError,
    growthRecords,
    growthRecordsLoading,
    growthRecordsError,
  } = useOutletContext();

  return (
    <Dashboard
      selectedChild={selectedChild}
      selectedUnit={selectedUnit}
      growthRecords={growthRecords}
      growthRecordsLoading={growthRecordsLoading}
      growthRecordsError={growthRecordsError}
      childrenLoading={childrenLoading}
      childrenError={childrenError}
    />
  );
}

export default DashboardPage;
