import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class values into a single string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date with the specified format
 */
export function formatDate(date: Date, format: string = "yyyy-MM-dd"): string {
  try {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    
    // Replace tokens with actual values
    let result = format;
    result = result.replace("yyyy", String(year));
    result = result.replace("MM", month);
    result = result.replace("dd", day);
    
    return result;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

/**
 * Gets the category color classes based on the category
 */
export function getCategoryColorClass(category: string): string {
  switch (category) {
    case 'blackbox':
      return 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:bg-opacity-20 dark:text-primary-300';
    case 'whitebox':
      return 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:bg-opacity-20 dark:text-accent-300';
    case 'experience':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:bg-opacity-20 dark:text-amber-300';
    case 'specialized':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-20 dark:text-purple-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
}

/**
 * Truncate text to a maximum length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
