export function formatDuration(mins) {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;

  if (hours === 0) {
    return `${minutes} min`;
  } else if (minutes === 0) {
    return `${hours} hr`;
  } else {
    return `${hours} hr ${minutes} min`;
  }
}
