export function measurementUnits(selectedUnit) {
  return selectedUnit === "imperial"
    ? { height: "in", weight: "lbs", feeding: "fl oz" }
    : { height: "cm", weight: "kg", feeding: "mL" };
}
