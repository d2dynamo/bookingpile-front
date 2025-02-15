import React, { useState, useEffect } from 'react';
import type { Rooms, SelectedRooms } from '@/pages/rooms';
import Button from './Button';

interface RoomSelectProps {
  rooms: Rooms;
  selectedRooms: SelectedRooms;
  setSelectedRooms: (selectedRooms: SelectedRooms) => void;
  setShowWindow: (v: boolean) => void;
}

const RoomSelect: React.FC<RoomSelectProps> = ({
  rooms,
  selectedRooms,
  setSelectedRooms,
  setShowWindow,
}) => {
  const [tempSelectedRooms, setTempSelectedRooms] =
    useState<SelectedRooms>(selectedRooms);

  useEffect(() => {
    setTempSelectedRooms(selectedRooms);
  }, [selectedRooms]);

  const handleCheckboxChange = (roomId: number) => {
    const updatedSelectedRooms = new Set(tempSelectedRooms);

    if (updatedSelectedRooms.has(roomId)) {
      updatedSelectedRooms.delete(roomId);
    } else {
      updatedSelectedRooms.add(roomId);
    }

    setTempSelectedRooms(Array.from(updatedSelectedRooms));
  };

  const handleSelectButton = () => {
    setSelectedRooms(tempSelectedRooms);
    setShowWindow(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="w-full max-w-md mx-3 bg-white border border-gray-300 p-4 rounded-xl shadow-lg transition-transform transform duration-300 dark:bg-slate-800 dark:border-gray-500 dark:text-white">
        <div className="flex flex-col">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="flex items-center justify-between mb-2 text-black dark:text-gray-300"
            >
              <span className="text-md">
                {room.name} ({room.capacity} personer)
              </span>
              <input
                type="checkbox"
                checked={tempSelectedRooms.includes(room.id)}
                onChange={() => handleCheckboxChange(room.id)}
                className="clean-checkbox ml-2 lg:[&:checked::after]:left-[1px]"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => handleSelectButton()}
            className="flex-1 bg-black text-white"
          >
            Välj
          </Button>
          <Button
            onClick={() => setShowWindow(false)}
            className="flex-1 bg-gray-800 dark:bg-black text-white"
          >
            Avbryta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomSelect;
