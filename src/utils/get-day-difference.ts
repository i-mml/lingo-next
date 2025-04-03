export function getDayDifference(targetDateTime: string): number {
  const targetDate = new Date(targetDateTime);
  const now = new Date();

  // Ensure both dates are in UTC
  targetDate.setUTCHours(0, 0, 0, 0);
  now.setUTCHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds
  const diffMs = Math.abs(now.getTime() - targetDate.getTime());

  // Convert milliseconds to days
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
}
