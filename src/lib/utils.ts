import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDate } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateInCalendarFormat(unixTimeStamp: number) {
  return formatDate(new Date(unixTimeStamp), 'dd MMM yyyy');
}
