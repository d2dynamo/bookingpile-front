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

export async function fetchRooms(): Promise<ListRoomsResponseItem[]> {
  try {
    const body = await fetchClient<ListRoomsResponse>('/rooms/list');
    if (body.error) {
      throw new Error(body.message);
    }
    if (!body.payload) {
      throw new Error('Failed to get rooms');
    }
    return body.payload;
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

    if (from) {
      const fromStr = Math.floor(from).toString();
      if (fromStr.length !== 10) {
        console.warn(
          'Warning: "from" parameter should be a 10-digit Unix timestamp'
        );
      }
      params.append('from', fromStr);
    }

    if (to) {
      const toStr = Math.floor(to).toString();
      if (toStr.length !== 10) {
        console.warn(
          'Warning: "to" parameter should be a 10-digit Unix timestamp'
        );
      }
      params.append('to', toStr);
    }

    params.append(
      'roomIds',
      roomIds && roomIds.length > 0 ? roomIds.join(',') : ''
    );

    const body = await fetchClient<ListAvailableRoomsResponse>(
      `/rooms/available?${params.toString()}`
    );
    if (body.error) {
      throw new Error(body.message);
    }
    if (!body.payload) {
      throw new Error('Failed to get available times');
    }
    return body.payload;
  } catch (error) {
    throw error;
  }
}
