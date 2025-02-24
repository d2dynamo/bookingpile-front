import { useState, useEffect } from 'react';
import { createBooking, getBooking, updateBooking } from '@/server/booking';
import { unixSec } from '@/util/date';
import { BookingStatus } from '@/server/types';

interface Booking {
  bookingId: number;
  status: BookingStatus;
  reservationName?: string;
}
export interface UseBooking {
  data: Booking | null;
  update: (options: {
    reservationName?: string;
    status?: BookingStatus;
  }) => Promise<void>;
  create: (roomId: number, start: Date) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const useBooking = (bookingId?: number) => {
  const [data, setData] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorState | null>(null);

  const update = async (options: {
    reservationName?: string;
    status?: BookingStatus;
  }) => {
    setLoading(true);

    try {
      if (!data || !data.bookingId) {
        throw new Error('Booking not initialized');
      }

      await updateBooking({
        bookingId: data.bookingId,
        ...options,
      });

      setData({ ...data, ...options });
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  const create = async (roomId: number, start: Date) => {
    setLoading(true);
    try {
      const booking = await createBooking({
        roomId,
        start: unixSec(start),
      });

      if (booking) {
        setData({ bookingId: booking.bookingId, status: 'processing' });
      } else {
        throw new Error('Failed to create booking');
      }
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  const get = async (id: number) => {
    setLoading(true);

    try {
      const booking = await getBooking(id);
      setData(booking);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  if (bookingId) {
    useEffect(() => {
      setLoading(true);

      const fetchBooking = async () => {
        try {
          const booking = await getBooking(bookingId);
          setData(booking);
        } catch (e) {
          setError(e as Error);
        } finally {
          setLoading(false);
        }
      };

      fetchBooking();
    }, []);
  }

  return { data, update, create, get, loading, error };
};

export default useBooking;
