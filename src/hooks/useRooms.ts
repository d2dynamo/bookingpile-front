import { useState, useEffect } from 'react';
import { fetchRooms, ListRoomsResponse } from '@/server/rooms';

export const useRooms = () => {
  const [rooms, setRooms] = useState<ListRoomsResponse>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('useRooms loading');
        setLoading(true);
        const roomsData = await fetchRooms();
        setRooms(roomsData);
        console.log('useRooms loaded');
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { rooms, loading, error };
};

export default useRooms;
