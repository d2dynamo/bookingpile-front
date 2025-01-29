import React, { useEffect, useState } from 'react';
import { fetchRooms, fetchAvailableTimes } from '@/server/rooms';
import TimeSlotGrid from '@/components/TimeSlotGrid';
import DateSelector from '@/components/DateSelector';
import Button from '@/components/Button';

const RoomsPage: React.FC = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [startDay, setStartDay] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsData = await fetchRooms();
        setRooms(roomsData);

        const availableTimesData = await fetchAvailableTimes(
          startDay.getTime() / 1000,
          startDay.setDate(startDay.getDate() + 2)
        );
        setAvailableTimes(availableTimesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [startDay]);

  const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoom(event.target.value);
  };

  const handleDateChange = (date: Date) => {
    setStartDay(date);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1>Välj en tid</h1>
      <select
        value={selectedRoom}
        onChange={handleRoomChange}
        className="w-full max-w-md"
      >
        <option value="">Välj ett rum</option>
        {rooms.map((room: any) => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}
      </select>
      <DateSelector onChange={handleDateChange} selectedDate={startDay} />
      <TimeSlotGrid startDay={startDay} timeSlots={availableTimes} />
      <Button onClick={() => {}} text="Nästa" />
    </div>
  );
};

export default RoomsPage;
