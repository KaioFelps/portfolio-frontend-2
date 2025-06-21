export function getYearsFromNow(date: Date) {
  const now = new Date();

  // difference in days;
  const diff = (now.getTime() - date.getTime()) / 1000 / 60 / 60 / 24;

  const yearsDifference = Math.abs(Math.floor(diff / 365.25));
  return yearsDifference;
}
