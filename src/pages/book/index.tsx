import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import LinkButton from '@/components/LinkButton';
import Button from '@/components/Button';
import { ErrorState } from '@/util';
import { getBooking, updateBooking } from '@/server/booking';
import { Booking } from '@/server/types';

const BookPage: React.FC = () => {
  const [error, setError] = useState<ErrorState | null>(null);
  const [bookSuccess, setBookSuccess] = useState(false);
  const [reservationName, setReservationName] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<Booking | null>(null);

  const router = useRouter();

  const doBooking = async () => {
    try {
      if (!bookingData || !bookingData.id) {
        throw new ErrorState('Booking not initialized');
      }

      if (!reservationName) {
        throw new ErrorState('Reservation name is required');
      }

      await updateBooking({
        bookingId: bookingData.id,
        reservationName,
        status: 'confirmed',
      });

      setBookSuccess(true);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
        return;
      }
      setError({
        name: 'Unknown error',
        message: 'Unknown error has ocurred, try again.',
      });
      console.error('Unknown error:', e);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        console.log(router.query);
        const bookingId = Number(router.query.bookingId);

        if (isNaN(bookingId) || typeof bookingId !== 'number') {
          console.error('Invalid bookingId:', bookingId, typeof bookingId);
          router.push('/rooms');
        }

        const result = await getBooking(bookingId);
        if (!result) {
          console.error('Failed to get booking:', bookingId);
          router.push('/rooms');
        }

        setBookingData(result);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
          return;
        }
        setError({
          name: 'Unknown error',
          message: 'Unknown error has ocurred, try again.',
        });
        console.error('Unknown error:', e);
      }
    };

    init();
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <LinkButton name="Tillbaka" href="/rooms" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between items-stretch content-center bg-gray-200 dark:bg-slate-800 min-h-screen max-h-screen w-full">
      <h1 className="text-3xl font-bold text-black dark:text-white m-4">
        Vem bokar?
      </h1>
      <div className="flex flex-col items-center gap-4 p-4">
        <input
          type="text"
          value={reservationName || ''}
          onChange={(e) => setReservationName(e.target.value)}
          placeholder="Ange namn..."
          className="w-full max-w-md px-4 py-2 text-lg border border-gray-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            bg-white dark:bg-slate-700 text-black dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500"
        />
        <Button onClick={() => doBooking()} className="w-full max-w-md">
          Boka
        </Button>
      </div>
      {bookSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl flex flex-col items-center">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
              Bokning bekräftad!
            </h2>
            <LinkButton
              href="/rooms"
              name="Tillbaka till rumöversikten"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPage;
