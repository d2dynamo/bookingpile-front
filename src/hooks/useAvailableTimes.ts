import { useState, useEffect } from 'react';
import {
  fetchAvailableTimes,
  ListAvailableRoomsResponse,
} from '@/server/rooms';
import { unixSec } from '@/util/date';

const useAvailableTimes = (startDay: Date, selectedRoom: number[]) => {
  const [availableTimes, setAvailableTimes] =
    useState<ListAvailableRoomsResponse>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const sd = new Date(startDay);
        const availableTimesData = await fetchAvailableTimes(
          unixSec(sd),
          unixSec(sd.setDate(sd.getDate() + 2)),
          selectedRoom
        );
        setAvailableTimes(availableTimesData);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDay, selectedRoom]);

  return { availableTimes, loading, error };
};

export default useAvailableTimes;
