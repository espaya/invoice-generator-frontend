function formatDate(date) {
  const d = new Date(date);
  const day = d.getDate();
  const daySuffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const month = d.toLocaleString("default", { month: "long" });
  const year = d.getFullYear();

  return `${day}${daySuffix} ${month}, ${year}`;
}

export default formatDate;