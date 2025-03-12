import { fetchClient } from './api';
import { BookingStatus } from './types';

interface CreateBookingRequest {
  roomId: number;
  start: number;
}

interface CreateBookingResponse {
  bookingId: number;
}

interface UpdateBookingRequest {
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
    const body = await fetchClient<Booking>(`/booking/${bookingId}`);
    if (body.error) {
      throw new Error(body.message);
    }
    if (!body.payload) {
      throw new Error('Failed to get booking');
    }
    const booking = body.payload;
    return booking;
  } catch (error) {
    throw error;
  }
}

export async function createBooking(
  booking: CreateBookingRequest
): Promise<CreateBookingResponse> {
  try {
    const body = await fetchClient<CreateBookingResponse>('/booking/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    });
    if (body.error) {
      throw new Error(body.message);
    }
    if (!body.payload || typeof body.payload.bookingId !== 'number') {
      throw new Error('Failed to create booking');
    }
    return { bookingId: body.payload.bookingId };
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}
export async function updateBooking(
  input: UpdateBookingRequest
): Promise<void> {
  try {
    const body = await fetchClient('/booking/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    if (body.error) {
      throw new Error(body.message);
    }

    return;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
}
