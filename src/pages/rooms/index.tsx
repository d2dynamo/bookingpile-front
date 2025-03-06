import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useRooms } from '@/hooks';
import TimeSlotGrid from '@/components/TimeSlotGrid';
import DateSelector from '@/components/DateSelector';
import Button from '@/components/Button';
import RoomSelect from '@/components/RoomSelect';
import {
  fetchAvailableTimes,
  fetchRooms,
  ListAvailableRoomsResponse,
  ListRoomsResponse,
} from '@/server/rooms';
import ErrorAlert from '@/components/ErrorAlert';
import { ErrorState, unixSec } from '@/util';
import { createBooking } from '@/server';

export type AvailableTimes = ListAvailableRoomsResponse;
export type Rooms = ListRoomsResponse;
export type SelectedRooms = Array<number>;

export interface SelectedTimeSlot {
  roomId: number;
  start: number; // unix seconds
}

// const serializeTimeSlot = (timeSlot: SelectedTimeSlot): string => {
//   return `${timeSlot.roomId}-${timeSlot.day}-${timeSlot.hour}`;
// };

const RoomsPage: React.FC = () => {
  const router = useRouter();
  const [selectedRooms, setSelectedRooms] = useState<SelectedRooms>([]);
  const [startDay, setStartDay] = useState(
    new Date(new Date().setHours(7, 0, 0, 0))
  );
  const [showRoomSelect, setShowRoomSelect] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] =
    useState<SelectedTimeSlot | null>(null);
  const [error, setError] = useState<ErrorState | null>(null);
  const [availableTimes, setAvailableTimes] =
    useState<ListAvailableRoomsResponse>({});
  const [rooms, setRooms] = useState<Rooms>([]);
  const [loading, setLoading] = useState(false);

  const startBooking = async () => {
    try {
      if (!selectedTimeSlot) {
        window.alert('No time slot selected');
        return;
      }

      const { roomId, start } = selectedTimeSlot;

      const result = await createBooking({
        roomId,
        start,
      });

      if (!result.bookingId) {
        throw new ErrorState('Failed to create booking');
      }

      return result.bookingId;
    } catch (e) {
      throw e;
    }
  };

  const handleRoomChange = (selected: Array<number | string>) => {
    try {
      const updatedSelectedRooms = new Set<number>();

      selected.forEach((id) => {
        if (typeof id === 'number') {
          updatedSelectedRooms.add(id);
        } else if (typeof id === 'string') {
          const numericId = parseInt(id, 10);

          if (isNaN(numericId)) {
            setError({
              name: 'invalid room',
              message: `Invalid room id: ${id}`,
            });
            return;
          }

          updatedSelectedRooms.add(numericId);
        } else {
          setError({ name: 'Invalid room id', message: 'Invalid room id' });
          console.error('Invalid select room id:', id);
        }
      });

      setSelectedRooms(Array.from(updatedSelectedRooms));
    } catch (er) {
      if (er instanceof Error) {
        setError(er);
        return;
      }
      setError({
        name: 'Unknown error',
        message: 'Unknown error ocurred, try again.',
      });
      console.error(er);
    }
  };

  const handleNextPage = async () => {
    try {
      if (!selectedTimeSlot) {
        throw new ErrorState('No time slot selected');
      }

      const bookingId = await startBooking();

      router.push(`/book?bookingId=${bookingId}`);
    } catch (er) {
      if (er instanceof Error) {
        setError(er);
        return;
      }
      setError({
        name: 'Unknown error',
        message: 'Unknown error ocurred, try again.',
      });
      console.error(er);
    }
  };

  // init
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const roomsData = await fetchRooms();
        setRooms(roomsData);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
          return;
        }
        setError({
          name: 'Unknown error',
          message: 'Unknown error ocurred, try again.',
        });
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const re = async () => {
      try {
        console.log('fetch availabletimes');
        setLoading(true);
        const sd = new Date(startDay);

        const availableTimesData = await fetchAvailableTimes(
          unixSec(sd),
          unixSec(sd.setDate(sd.getDate() + 2)),
          selectedRooms
        );
        console.log('availableTimesData', availableTimesData);
        setAvailableTimes(availableTimesData);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        } else {
          setError({
            name: 'Unknown error',
            message: 'Unknown error ocurred, try again.',
          });
          console.error(e);
        }
      } finally {
        setLoading(false);
        console.log('refreshed availableTimes');
      }
    };
    re();
  }, [selectedRooms]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <main className="flex flex-col justify-between items-stretch content-center bg-gray-200 dark:bg-slate-800 min-h-screen max-h-screen w-full">
      <h1 className="self-start text-5xl text-black dark:text-gray-100 my-5 mx-2">
        Välj en tid
      </h1>
      <div className="flex items-start mt-4 mb-4 mx-2">
        <Button
          onClick={() => setShowRoomSelect(true)}
          className="relative inline-flex items-stretch w-1/3 ml-0 justify-between px-2 py-2 bg-inherit border-gray-400 border shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
        >
          <span className="text-center text-black">
            {selectedRooms.length > 0
              ? `${selectedRooms.length} valda rum`
              : 'Mötes rum'}
          </span>
          <svg
            className="w-5 h-5 ml-2 -mr-1 text-black dark:text-gray-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
      <DateSelector
        startDay={startDay}
        setStartDay={setStartDay}
        className="mx-2"
      />
      <TimeSlotGrid
        startDay={startDay}
        availableTimes={availableTimes}
        rooms={rooms}
        selectedTimeSlot={selectedTimeSlot}
        setSelectedTimeSlot={setSelectedTimeSlot}
        className="flex-auto m-2"
      />
      <Button onClick={handleNextPage} className="mx-10 my-2">
        Nästa
      </Button>
      {showRoomSelect && (
        <RoomSelect
          rooms={rooms}
          selectedRooms={selectedRooms}
          setSelectedRooms={handleRoomChange}
          setShowWindow={setShowRoomSelect}
        />
      )}
      {error && (
        <ErrorAlert
          title={error.name}
          description={error.message}
          acknowledge={() => setError(null)}
        />
      )}
    </main>
  );
};

export default RoomsPage;
