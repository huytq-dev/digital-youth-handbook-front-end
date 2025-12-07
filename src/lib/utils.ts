import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parse date string từ backend (nhiều format) và convert về yyyy-MM-dd cho input type="date"
 * Hỗ trợ các format:
 * - ISO 8601: "2024-01-15T00:00:00Z" hoặc "2024-01-15T00:00:00"
 * - yyyy-MM-dd: "2024-01-15"
 * - dd/MM/yyyy: "15/01/2024"
 * - MM/dd/yyyy: "01/15/2024"
 * 
 * @param dateString - Date string từ backend (có thể là nhiều format)
 * @returns string format yyyy-MM-dd hoặc undefined nếu không parse được
 */
export function parseDateForInput(dateString: string | undefined | null): string | undefined {
  if (!dateString) return undefined;

  try {
    // Trường hợp 1: ISO 8601 format (có "T" hoặc "Z")
    if (dateString.includes("T")) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split("T")[0];
      }
    }

    // Trường hợp 2: yyyy-MM-dd format (đã đúng format cho input)
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return dateString;
      }
    }

    // Trường hợp 3: dd/MM/yyyy format
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split("/");
      const date = new Date(`${year}-${month}-${day}`);
      if (!isNaN(date.getTime())) {
        return `${year}-${month}-${day}`;
      }
    }

    // Trường hợp 4: MM/dd/yyyy format
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      const [month, day, year] = dateString.split("/");
      const date = new Date(`${year}-${month}-${day}`);
      if (!isNaN(date.getTime())) {
        return `${year}-${month}-${day}`;
      }
    }

    // Fallback: Thử parse bằng Date constructor
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split("T")[0];
    }
  } catch (error) {
    console.warn("Failed to parse date:", dateString, error);
  }

  return undefined;
}
