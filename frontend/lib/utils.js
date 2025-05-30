export function formatDate(date) {
  return date.toLocalDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numberic",
  })
}
