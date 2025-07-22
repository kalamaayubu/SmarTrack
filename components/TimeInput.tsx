// components/TimeInput.tsx
'use client';

import React from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  name?: string;
};

const TimeInput = ({ label, value, onChange, name }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-300">{label}</label>}
      <TimePicker
        onChange={onChange}
        value={value}
        name={name}
        disableClock={false} // keep dropdown/clock visible
        clearIcon={null}
        className="custom-timepicker"
      />
    </div>
  );
};

export default TimeInput;
