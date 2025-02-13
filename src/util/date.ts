/**
 * @param date Date object, Unix milliseconds or Unix seconds.
 * @returns unix seconds
 */
export const unixSec = (date: Date | number): number => {
  if (date instanceof Date) {
    return Math.floor(date.getTime() / 1000);
  } else if (typeof date === 'number') {
    if (date > 9999999999) {
      return Math.floor(date / 1000);
    } else if (date > 0) {
      return date;
    }
  }
  throw new Error(
    'Invalid input: expected a Date object, Unix milliseconds, or Unix seconds.'
  );
};
