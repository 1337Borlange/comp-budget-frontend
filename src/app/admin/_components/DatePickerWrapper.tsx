'use client';
import { useEffect, useState } from 'react';
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
  console.log('DATE: ', date);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (date) {
      try {
        const parsed = new Date(date);
        if (parsed instanceof Date && !isNaN(parsed.getTime())) {
          setStartDate(parsed);
        } else {
          throw 'Invalid date';
        }
      } catch {
        setStartDate(new Date());
      }
    }
  }, [date]);
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
