import React from 'react';
import TimeSlot from './TimeSlot';
import type { AvailableTimes, Rooms } from '@/pages/rooms';
import { DayOfMonth } from '@/server/types';

interface TimeSlotGridProps {
  startDay: Date;
  availableTimes: AvailableTimes;
  rooms: Rooms;
  className?: string;
}

const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({
  startDay,
  availableTimes,
  rooms,
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

  const renderTimeSlotColumn = (date: Date, index: number) => (
    console.log(`rendering timeslot column for day ${date.getDate()}`),
    (
      <div
        key={index}
        className="flex flex-col items-stretch p-2 border-r border-gray-400"
      >
        {Object.entries(availableTimes).map(([roomId, days]) => {
          const hours = days[date.getDate() as DayOfMonth];
          console.log(
            `creating timeslots for room ${roomId} with hours ${hours}`
          );
          if (!hours) return null;
          const room = rooms.find((room) => room.id === parseInt(roomId, 10));
          return hours.map((hour) => (
            <TimeSlot
              key={`${roomId}-${date.getDate()}-${hour}`}
              roomName={room?.name || ''}
              roomCapacity={room?.capacity || 0}
              startTime={hour}
            />
          ));
        })}
      </div>
    )
  );

  const dates = getDates(startDay);
  console.log(`startDay: ${startDay.getDate()} | dates: ${dates}`);

  return (
    <div
      className={`bg-gray-200 text-black border border-gray-400 rounded-lg dark:border-gray-500 ${className}`}
    >
      {/* Header row for dates */}
      <div className="grid grid-cols-3">
        {dates.map((date, index) => renderHeaderColumn(date, index))}
      </div>
      {/* Grid for TimeSlots */}
      <div className="grid grid-cols-3">
        {dates.map((date, index) => renderTimeSlotColumn(date, index))}
      </div>
    </div>
  );
};

export default TimeSlotGrid;
