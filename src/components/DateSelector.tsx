import React from 'react';

interface DateSelectorProps {
  onChange: (date: Date) => void;
  selectedDate: Date;
}

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="border border-black bg-white text-black w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
    >
      {direction === 'left' ? '<' : '>'}
    </button>
  );
};

const DateSelector: React.FC<DateSelectorProps> = ({
  onChange,
  selectedDate,
}) => {
  const handlePrevious = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    onChange(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    onChange(newDate);
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

    return `${startStr} - ${endStr}`;
  };

  return (
    <div className="flex items-center justify-between w-full">
      <ArrowButton direction="left" onClick={handlePrevious} />
      <p>{formatDateRange(selectedDate)}</p>
      <ArrowButton direction="right" onClick={handleNext} />
    </div>
  );
};

export default DateSelector;
