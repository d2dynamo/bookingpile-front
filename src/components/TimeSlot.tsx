import React from 'react';

interface TimeSlotProps {
  roomName: string;
  roomCapacity: number;
  startTime: number;
  className?: string;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  roomName,
  roomCapacity,
  startTime,
  className = '',
}) => {
  const formatTime = (hour: number) => {
    const start = `${hour.toString().padStart(2, '0')}:00`;
    const end = `${(hour + 1).toString().padStart(2, '0')}:00`;
    return `${start}-${end}`;
  };

  return (
    <div
      className={`flex flex-col text-sm border border-green-800 rounded-md p-1 mb-2 mx-1 shadow-sm bg-gray-50 text-black dark:bg-gray-600 dark:border-l-violet-900 dark:text-white ${className}`}
    >
      <div className="flex flex-row justify-between items-center">
        <p className="font-bold">{roomName}</p>
        <p>({roomCapacity})</p>
      </div>
      <p>{formatTime(startTime)}</p>
    </div>
  );
};

export default TimeSlot;
