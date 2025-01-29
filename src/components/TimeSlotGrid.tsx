import React from 'react';
import TimeSlot from './TimeSlot';

interface TimeSlotGridProps {
  startDay: Date;
  timeSlots: { roomName: string; startTime: number }[];
}

const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({ startDay, timeSlots }) => {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
    };
    return date.toLocaleDateString('sv-SE', options);
  };

  const getDates = (startDate: Date) => {
    const dates = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = getDates(startDay);

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {dates.map((date, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="font-bold">{formatDate(date)}</div>
          <div className="flex flex-col items-center">
            {timeSlots.map((slot, idx) => (
              <TimeSlot
                key={idx}
                roomName={slot.roomName}
                startTime={slot.startTime}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeSlotGrid;
