export function getNonRepetitiveItems(array: number[]): number[] {
  // Convert the array to a Set to remove duplicates
  const uniqueSet = new Set(array);

  // Convert the Set back to an array
  const uniqueArray = Array.from(uniqueSet);

  return uniqueArray;
}
