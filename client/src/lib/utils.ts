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
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-300';
    case 'whitebox':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-300';
    case 'experience':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-20 dark:text-yellow-300';
    case 'specialized':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
}

/**
 * Gets the category card background classes
 */
export function getCategoryCardClass(category: string): string {
  switch (category) {
    case 'blackbox':
      return 'category-blackbox';
    case 'whitebox':
      return 'category-whitebox';
    case 'experience':
      return 'category-experience';
    case 'specialized':
      return 'category-specialized';
    default:
      return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
  }
}

/**
 * Gets the category icon classes
 */
export function getCategoryIconClass(category: string): string {
  switch (category) {
    case 'blackbox':
      return 'category-icon-blackbox';
    case 'whitebox':
      return 'category-icon-whitebox';
    case 'experience':
      return 'category-icon-experience';
    case 'specialized':
      return 'category-icon-specialized';
    default:
      return 'bg-gray-500';
  }
}

/**
 * Truncate text to a maximum length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
