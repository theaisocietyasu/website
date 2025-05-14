import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function downloadExcel(data: any[], filename: string) {
  // This is a placeholder for the Excel download functionality
  // The actual implementation would use a library like xlsx
  console.log(`Downloading ${filename} with data:`, data)
}

export function downloadPDF(data: any[], filename: string) {
  // This is a placeholder for the PDF download functionality
  // The actual implementation would use a library like jspdf
  console.log(`Downloading ${filename} with data:`, data)
}
