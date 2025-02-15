import React from 'react';
import TimeSlot from './TimeSlot';
import type { AvailableTimes, Rooms, SelectedTimeSlot } from '@/pages/rooms';
import { DayOfMonth, ValidHour } from '@/server/types';

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
    const [rid, d, h] = k.split('-');
    const roomId = parseInt(rid, 10);
    const day = parseInt(d, 10) as DayOfMonth;
    const hour = parseInt(h, 10) as ValidHour;
    setSelectedTimeSlot({ roomId, day, hour });
  };

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
              sKey={`${roomId}-${date.getDate()}-${hour}`} //same as key
              roomName={room?.name || ''}
              roomCapacity={room?.capacity || 0}
              isSelected={
                Number(roomId) === selectedTimeSlot?.roomId &&
                date.getDate() === selectedTimeSlot?.day &&
                hour === selectedTimeSlot?.hour
              }
              onClick={clickTimeSlot}
              startTime={hour}
            />
          ));
        })}
      </div>
    )
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
