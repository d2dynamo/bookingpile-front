import React from 'react';
import TimeSlot from './TimeSlot';
import type { AvailableTimes, Rooms, SelectedTimeSlot } from '@/pages/rooms';
import { AvailableTimeKey } from '@/server/types';

interface TimeSlotGridProps {
  startDay: Date;
  availableTimes: AvailableTimes;
  rooms: Rooms;
  selectedTimeSlot: SelectedTimeSlot | null;
  setSelectedTimeSlot: (timeSlot: SelectedTimeSlot) => void;
  className?: string;
}

const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({
  startDay,
  availableTimes,
  rooms,
  selectedTimeSlot,
  setSelectedTimeSlot,
  className = '',
}) => {
  const getDates = (start: Date) => {
    const dates = [];
    for (let i = 0; i <= 2; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

  const renderHeaderColumn = (date: Date, index: number) => (
    <div
      key={index}
      className="flex items-center justify-center p-4 font-bold border-b border-r border-gray-400"
    >
      {formatDate(date)}
    </div>
  );

  const clickTimeSlot = (k: string) => {
    const [rid, s] = k.split('-');
    const roomId = parseInt(rid, 10);
    const start = parseInt(s, 10);
    setSelectedTimeSlot({ roomId, start });
  };

  const renderTimeSlotColumn = (date: Date, index: number) => (
    <div
      key={index}
      className="flex flex-col items-stretch p-2 border-r border-gray-400"
    >
      {Object.entries(availableTimes).map(([roomId, startTimes]) => {
        if (!startTimes || !startTimes.length) {
          return null;
        }
        const room = rooms.find((room) => room.id === parseInt(roomId, 10));
        return startTimes.map((t) => {
          if (new Date(t * 1000).getDate() !== date.getDate()) {
            return null;
          }
          return (
            <TimeSlot
              key={`${roomId}-${t}`} //same as sKey
              sKey={`${roomId}-${t}`} //same as key
              roomName={room?.name || ''}
              roomCapacity={room?.capacity || 0}
              isSelected={
                Number(roomId) === selectedTimeSlot?.roomId &&
                t === selectedTimeSlot?.start
              }
              onClick={clickTimeSlot}
            />
          );
        });
      })}
    </div>
  );

  const dates = getDates(startDay);

  return (
    <div
      className={`bg-gray-200 text-black border border-gray-400 rounded-lg dark:border-gray-500 ${className} overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400`}
    >
      <div className="grid grid-cols-3">
        {dates.map((date, index) => renderHeaderColumn(date, index))}
      </div>

      <div className="grid grid-cols-3">
        {dates.map((date, index) => renderTimeSlotColumn(date, index))}
      </div>
    </div>
  );
};

export default TimeSlotGrid;
