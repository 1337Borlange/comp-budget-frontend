'use client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';

const DatePickerWrapper = ({
  date,
  name,
  id,
}: {
  date?: string;
  name: string;
  id: string;
}) => {
  const [startDate, setStartDate] = useState(
    date ? new Date(date) : new Date()
  );
  return (
    <DatePicker
      required
      name={name}
      id={id}
      selected={startDate}
      dateFormat="yyyy-MM-dd"
      onChange={(date: Date) => setStartDate(date)}
    />
  );
};

export default DatePickerWrapper;
