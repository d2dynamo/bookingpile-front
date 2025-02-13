import React from 'react';
import { ArrowButton } from './ArrowButton';

interface DateSelectorProps {
  setStartDay: (date: Date) => void;
  startDay: Date;
  className?: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  setStartDay,
  startDay,
  className = '',
}) => {
  const handlePrevious = () => {
    const newDate = new Date(startDay);
    newDate.setDate(newDate.getDate() - 1);
    setStartDay(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(startDay);
    newDate.setDate(newDate.getDate() + 1);
    setStartDay(newDate);
  };

  const formatDateRange = (date: Date) => {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 2);

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
    };
    const startStr = startDate.toLocaleDateString('sv-SE', options);
    const endStr = endDate.toLocaleDateString('sv-SE', options);

    return `${startStr} - ${endStr}`.replace(/[,|.]/g, '');
  };

  return (
    <div
      className={`flex items-center justify-between text-black bg-inherit ${className}`}
    >
      <ArrowButton direction="left" size="1.25rem" onClick={handlePrevious} />
      <p>{formatDateRange(startDay)}</p>
      <ArrowButton direction="right" size="1.25rem" onClick={handleNext} />
    </div>
  );
};

export default DateSelector;
