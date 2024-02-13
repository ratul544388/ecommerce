import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pluralize(singular: string, plural: string, length: number) {
  if (length === 1) {
    return singular;
  }
  return plural;
}
