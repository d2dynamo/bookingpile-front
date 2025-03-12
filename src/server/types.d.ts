export type ValidHour = 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17;
export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type DayOfMonth =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;
export type AvailableTimeKey = `${Month}-${DayOfMonth}`;
export type BookingStatus =
  | 'processing'
  | 'reserved'
  | 'cancelled'
  | 'confirmed';

export interface Booking {
  id: number;
  status: BookingStatus;
  reservationName?: string;
}
export interface APIResponseBody<T> {
  error: boolean;
  message: string;
  payload?: T;
}
