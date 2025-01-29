import React from 'react';

interface TimeSlotProps {
  roomName: string;
  startTime: number;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ roomName, startTime }) => {
  const formatTime = (hour: number) => {
    const start = `${hour.toString().padStart(2, '0')}:00`;
    const end = `${(hour + 1).toString().padStart(2, '0')}:00`;
    return `${start}-${end}`;
  };

  return (
    <div className="border border-gray-300 p-2 rounded shadow-sm">
      <p className="font-bold">{roomName}</p>
      <p>{formatTime(startTime)}</p>
    </div>
  );
};

export default TimeSlot;
