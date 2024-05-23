import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export interface Project {
  _id: string;
  name: string;
  // Add other fields based on your collection structure
}
