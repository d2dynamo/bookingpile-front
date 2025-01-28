import { ValidHour } from './types';

interface ListRoomsResponseItem {
  id: number;
  name: string;
  capacity: number;
}

export type ListRoomsResponse = ListRoomsResponseItem[];

interface ListAvailableRoomsResponseItem {
  roomId: number;
  [key: string]: ValidHour[] | number;
}

export type ListAvailableRoomsResponse = ListAvailableRoomsResponseItem[];

export async function fetchRooms() {
  try {
    const response = await fetch('localhost:300/rooms/list');
    if (!response.ok) {
      throw new Error('Failed to fetch rooms');
    }
    const rooms = await response.json();
    return rooms;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
}

export async function fetchAvailableTimes(
  from?: number,
  to?: number,
  roomIds?: number[]
) {
  try {
    const params = new URLSearchParams();
    if (from) params.append('from', from.toString());
    if (to) params.append('to', to.toString());
    if (roomIds && roomIds.length > 0)
      params.append('roomIds', roomIds.join(','));

    const response = await fetch(`/rooms/available?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch available times');
    }
    const availableTimes = await response.json();
    return availableTimes;
  } catch (error) {
    console.error('Error fetching available times:', error);
    throw error;
  }
}
