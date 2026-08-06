export function formatDecimalHours(decimalHours) {
  const sleepHours = Math.floor(decimalHours);
  const sleepMinutes = Math.round((decimalHours - sleepHours) * 60);
  if (sleepHours === 0) {
    return `${sleepMinutes} m`;
  } else if (sleepMinutes === 0) {
    return `${sleepHours} h`;
  } else {
    return `${sleepHours} h ${sleepMinutes} m`;
  }
}
