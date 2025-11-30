import { LucideIcon } from 'lucide-react';

/**
 * Utility function to capitalize the first letter of a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalizeFirstLetter(str: string): string {
  if (!str) throw new Error('Input string cannot be empty');
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Utility function to format a date to a readable string.
 * @param date - The date to format.
 * @returns The formatted date string.
 */
export function formatDate(date: Date): string {
  if (!(date instanceof Date)) throw new Error('Invalid date object');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Utility function to safely parse JSON.
 * @param jsonString - The JSON string to parse.
 * @returns The parsed object or null if parsing fails.
 */
export function safeJsonParse<T>(jsonString: string): T | null {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('JSON parsing error:', error);
    return null;
  }
}

/**
 * Utility function to generate a unique identifier.
 * @returns A unique identifier string.
 */
export function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Utility function to create an icon component.
 * @param iconName - The name of the icon.
 * @returns The LucideIcon component.
 */
export function createIcon(iconName: string): LucideIcon {
  const IconComponent = LucideIcon[iconName];
  if (!IconComponent) throw new Error(`Icon "${iconName}" not found`);
  return IconComponent;
}

export {
  capitalizeFirstLetter,
  formatDate,
  safeJsonParse,
  generateUniqueId,
  createIcon,
};