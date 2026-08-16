export function formatDateTime(date: Date) {
  return date.toLocaleDateString("pt-Br", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
