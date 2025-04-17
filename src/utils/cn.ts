import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with tailwind merge for cleaner class combinations
 * @param inputs Class names to combine
 * @returns Combined class name string
 */
export function classNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
