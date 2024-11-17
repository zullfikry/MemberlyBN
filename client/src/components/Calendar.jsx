import React, { useState, useContext } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../css/Calendar.css';
import { UserContext } from '../context/userContext'; 

const CalendarComponent = () => {
  const { user } = useContext(UserContext);
  const [selected, setSelected] = useState(null);
  const expirationDate = user?.expirationDate ? new Date(user.expirationDate) : null;

  return (
    <div className="calendar-container">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        modifiers={{
          highlighted: expirationDate,
        }}
        modifiersStyles={{
          highlighted: { backgroundColor: '#007bff', color: 'white', borderRadius: '50%' },
        }}
      />
      <div className="calendar-message text-center mt-3">
        {expirationDate ? (
          <p>Your membership expires on {expirationDate.toLocaleDateString()}</p>
        ) : (
          <p>Please select a date.</p>
        )}
        {selected && <p>You selected {selected.toLocaleDateString()}</p>}
      </div>
    </div>
  );
};

export default CalendarComponent;
