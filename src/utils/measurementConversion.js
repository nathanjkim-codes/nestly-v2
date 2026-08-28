export function measurementConversion(inches, selectedUnit) {
  if (selectedUnit === "metric") {
    return inches * 2.54;
  } else {
    return inches;
  }
}
