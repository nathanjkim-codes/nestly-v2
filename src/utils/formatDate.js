export const formatDate = function (date) {
  const dateObject = new Date(date);
  const dateString = dateObject.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${dateString}`;
};
