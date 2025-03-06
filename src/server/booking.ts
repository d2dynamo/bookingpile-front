import { fetchClient } from './api';
import { BookingStatus } from './types';

interface CreateBookingRequest {
  roomId: number;
  start: number;
}

interface CreateBookingResponse {
  bookingId: number;
}

interface UpdateBooking {
  bookingId: number;
  status?: BookingStatus;
  reservationName?: string;
}

interface Booking {
  id: number;
  roomId: number;
  start: number;
  status: BookingStatus;
  reservationName?: string;
}

export async function getBooking(bookingId: number): Promise<Booking> {
  try {
    const response = await fetchClient(`/booking/get/${bookingId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch booking');
    }
    const booking = await response.json();
    return booking;
  } catch (error) {
    throw error;
  }
}

export async function createBooking(
  booking: CreateBookingRequest
): Promise<CreateBookingResponse> {
  try {
    const response = await fetchClient('/booking/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    });

    if (response.status < 200 || response.status >= 400) {
      throw new Error(await response.text());
    }
    const body = await response.json();

    if (!body.bookingId) {
      throw new Error('Failed to create booking, no bookingId returned');
    }

    return { bookingId: body.bookingId };
  } catch (error) {
    throw error;
  }
}

export async function updateBooking(input: UpdateBooking): Promise<void> {
  try {
    const response = await fetchClient('/booking/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      throw new Error('Failed to update booking status');
    }
  } catch (error) {
    throw error;
  }
}
