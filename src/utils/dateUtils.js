export const getStartOfWeekMonday = function getStartOfWeekMonday(date) {
  const dateObject = new Date(date);
  const dayOfWeek = dateObject.getDay();

  const mondayOffset =
    dateObject.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

  const startOfWeek = new Date(dateObject.setDate(mondayOffset));

  startOfWeek.setHours(0, 0, 0, 0);

  return startOfWeek;
};

export const getEndOfWeekSunday = function getEndOfWeekSunday(startOfWeek) {
  const dateObject = new Date(startOfWeek);

  const sundayOffset = dateObject.getDate() + 6;

  const endOfWeek = new Date(dateObject.setDate(sundayOffset));

  endOfWeek.setHours(23, 59, 59, 999);

  return endOfWeek;
};

export const getPreviousWeekStart = function (startOfWeek) {
  const dateObject = new Date(startOfWeek);

  const previousMonday = dateObject.getDate() - 7;

  const previousWeekStart = new Date(dateObject.setDate(previousMonday));

  return previousWeekStart;
};
