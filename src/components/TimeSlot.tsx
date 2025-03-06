import React from 'react';

interface TimeSlotProps {
  sKey: string; // roomId with unix seconds of startTime
  roomName: string;
  roomCapacity: number;
  onClick: (sk: string) => void;
  isSelected?: boolean;
  className?: string;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  sKey,
  roomName,
  roomCapacity,
  onClick,
  isSelected,
  className = '',
}) => {
  const fTime = () => {
    const startTime = parseInt(sKey.split('-')[1]);
    const startHour = new Date(startTime * 1000).getHours();
    return `${startHour}:00-${startHour + 1}:00`;
  };

  const bgClass = isSelected ? 'bg-blue-200' : 'bg-gray-50';

  return (
    <div
      onClick={() => onClick(sKey)}
      className={`cursor-pointer flex flex-col text-sm border border-green-800 rounded-md p-1 mb-2 mx-1 shadow-sm ${bgClass} text-black dark:bg-gray-600 dark:border-l-violet-900 dark:text-white ${className}`}
    >
      <div className="flex flex-row justify-between items-center">
        <p>{roomName}</p>
        <p>({roomCapacity})</p>
      </div>
      <p>{fTime()}</p>
    </div>
  );
};

export default TimeSlot;
