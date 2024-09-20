'use client';

import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);

const CalenderComponent = () => {
  const myEventsList = [
    {
      start: moment().toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'Mathematics',
    },
  ];
  console.log(Views);

  return (
    <div>
      {' '}
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalenderComponent;
