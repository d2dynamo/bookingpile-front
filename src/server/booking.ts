import { fetchClient } from './api';
import { BookingStatus } from './types';

interface CreateBookingRequest {
  roomId: number;
  start: number;
}

interface CreateBookingResponse {
  bookingId: number;
}

interface UpdateBookingStatus {
  bookingId: number;
  status: BookingStatus;
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
    if (!response.ok) {
      throw new Error('Failed to create booking');
    }
    const { bookingId } = await response.json();
    return { bookingId };
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

export async function updateBookingStatus(
  booking: UpdateBookingStatus
): Promise<void> {
  try {
    const response = await fetchClient('/booking/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    });
    if (!response.ok) {
      throw new Error('Failed to update booking status');
    }
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
}
