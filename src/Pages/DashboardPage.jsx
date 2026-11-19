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
    sleepRecords,
    sleepRecordsLoading,
    sleepRecordsError,
    feedingRecords,
    feedingRecordsLoading,
    feedingRecordsError,
  } = useOutletContext();

  return (
    <Dashboard
      selectedChild={selectedChild}
      selectedUnit={selectedUnit}
      growthRecords={growthRecords}
      growthRecordsLoading={growthRecordsLoading}
      growthRecordsError={growthRecordsError}
      sleepRecords={sleepRecords}
      sleepRecordsLoading={sleepRecordsLoading}
      sleepRecordsError={sleepRecordsError}
      feedingRecords={feedingRecords}
      feedingRecordsLoading={feedingRecordsLoading}
      feedingRecordsError={feedingRecordsError}
      childrenLoading={childrenLoading}
      childrenError={childrenError}
    />
  );
}

export default DashboardPage;
