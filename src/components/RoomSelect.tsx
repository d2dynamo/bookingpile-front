import React, { useState, useEffect } from 'react';
import type { Rooms, SelectedRooms } from '@/pages/rooms';

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
      <div className="w-full max-w-md mx-3 bg-white border border-gray-300 p-8 rounded-xl shadow-lg transition-transform transform duration-300 dark:bg-slate-800 dark:border-gray-500 dark:text-white">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
          Select Rooms
        </h2>
        <div className="flex flex-col">
          {rooms.map((room) => (
            <label
              key={room.id}
              className="inline-flex items-center justify-between mb-2 text-black dark:text-gray-300"
            >
              <span className="font-bold">
                {room.name} ({room.capacity} personer)
              </span>
              <input
                type="checkbox"
                checked={tempSelectedRooms.includes(room.id)}
                onChange={() => handleCheckboxChange(room.id)}
                className="ml-2"
              />
            </label>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => handleSelectButton()}
            className="flex-1 bg-black text-white py-2 px-4 rounded"
          >
            Välj
          </button>
          <button
            onClick={() => setShowWindow(false)}
            className="flex-1 bg-gray-800 dark:bg-black text-white py-2 px-4 rounded"
          >
            Avbryta
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomSelect;
