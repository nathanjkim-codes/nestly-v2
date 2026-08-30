export function heightConversion(inches, selectedUnit) {
  if (selectedUnit === "metric") {
    return inches * 2.54;
  } else {
    return inches;
  }
}

export function weightConversion(lbs, selectedUnit) {
  if (selectedUnit === "metric") {
    return lbs * 0.45359237;
  } else {
    return lbs;
  }
}

export function feedingConversion(oz, selectedUnit) {
  if (selectedUnit === "metric") {
    return oz * 29.5735;
  } else {
    return oz;
  }
}
