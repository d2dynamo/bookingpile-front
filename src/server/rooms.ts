import { AvailableTimeKey, ValidHour } from './types';
import { fetchClient } from './api';

interface ListRoomsResponseItem {
  id: number;
  name: string;
  capacity: number;
}

export type ListRoomsResponse = ListRoomsResponseItem[];

export type ListAvailableRoomsResponse = {
  // key: roomId. Value: Array of start times in unix seconds
  [key: number]: Array<number>;
};

export async function fetchRooms(): Promise<ListRoomsResponse> {
  try {
    const response = await fetchClient('/rooms/list');
    if (!response.ok) {
      throw new Error('Failed to fetch rooms');
    }
    const rooms = await response.json();
    return rooms;
  } catch (error) {
    throw error;
  }
}

export async function fetchAvailableTimes(
  from?: number,
  to?: number,
  roomIds?: number[]
): Promise<ListAvailableRoomsResponse> {
  try {
    const params = new URLSearchParams();
    if (from) params.append('from', from.toString());
    if (to) params.append('to', to.toString());
    if (roomIds && roomIds.length > 0)
      params.append('roomIds', roomIds.join(','));

    const response = await fetchClient(`/rooms/available?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch available times');
    }
    const availableTimes = await response.json();
    return availableTimes;
  } catch (error) {
    throw error;
  }
}
