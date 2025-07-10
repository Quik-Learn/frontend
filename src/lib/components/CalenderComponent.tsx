'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, useToast, Flex, IconButton, Select } from '@chakra-ui/react';
import { IoChevronBackOutline } from 'react-icons/io5';
import { GrFormNext } from 'react-icons/gr';
import { calendarStyle } from '../styles/theme/config';
import {
  addRandomColorsToEvents,
  customDayPropGetter,
  customSlotPropGetter,
  eventStyleGetter,
} from '../helpers/paths';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '../store';
import { useLeaveMeetingMutation } from '../services/student-mutation';
import Events from './Events';
import { useLeaveMeetingTutorMutation } from '../services/tutor-mutation';

const localizer = momentLocalizer(moment);

interface CalenderComponentProps {
  events: any[];
  onOpen: any;
  setRange: ({ start, end }: { start: Date; end: Date }) => void;
  type: string;
  EventsComponent: React.ComponentType<any>;
  ToolbarComponent: React.ComponentType<any>;
}

const CalenderComponent: React.FC<CalenderComponentProps> = ({
  events,
  onOpen,
  setRange,
  EventsComponent,
  type,
  ToolbarComponent,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const [view, setView] = React.useState(Views.WEEK);
  const [currentDate, setCurrentDate] = useState(new Date());
  const id = localStorage.getItem('meetingId');
  console.log('event tneve', events, addRandomColorsToEvents(events));
  const [leaveMeeting, leaveMeetingData] = useLeaveMeetingMutation();
  const [leaveMeetingTutor, leaveMeetingDataTutor] =
    useLeaveMeetingTutorMutation();
  const leaveMeetingInfo = searchParams.get('leaveMeeting');
  const calenderRef = useRef(null);

  useEffect(() => {
    if (leaveMeetingInfo) {
      if (type === 'student') {
        leaveMeeting(id);
      } else {
        leaveMeetingTutor(id);
      }
    }
  }, [leaveMeetingInfo, type]);

  useEffect(() => {
    const { data, isError, error, isSuccess } = leaveMeetingData;
    if (isSuccess) {
      onOpen();
    }
    if (isError) {
      toast({
        title: 'Error',
        //@ts-ignore
        description: error?.data?.error?.message || 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [leaveMeetingData]);
  useEffect(() => {
    const { data, isError, error, isSuccess } = leaveMeetingDataTutor;
    if (isSuccess) {
      onOpen();
    }
    if (isError) {
      toast({
        title: 'Error',
        //@ts-ignore
        description: error?.data?.error?.message || 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [leaveMeetingDataTutor]);
  console.log(
    new Date(2025, 0, 20, 9, 30, 0, 0),
    'new Date(y, m, d, 9, 30, 0, 0)'
  );
  const handleNavigate = (newDate: Date, newView: string) => {
    setCurrentDate(newDate);

    // Calculate the start and end date based on the new view
    let start;
    let end;
    if (newView === Views.WEEK) {
      start = moment(newDate).startOf('week').toDate();
      end = moment(newDate).endOf('week').toDate();
    } else if (newView === Views.MONTH) {
      start = moment(newDate).startOf('month').toDate();
      end = moment(newDate).endOf('month').toDate();
    }
    //@ts-ignore
    setRange({ start, end });
    console.log(`Start: ${start}, End: ${end}`);
  };
  console.log(calenderRef?.current);

  return (
    <Box p={5} sx={calendarStyle}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '800px' }}
        eventPropGetter={eventStyleGetter}
        defaultView={Views.WEEK}
        allDayAccessor={'notAllDay'}
        showMultiDayTimes
        dayLayoutAlgorithm="overlap"
        views={[Views.WEEK, Views.MONTH]}
        date={currentDate}
        onNavigate={(newDate) => handleNavigate(newDate, view)}
        view={view}
        messages={{
          day: 'Day',
          week: 'Week',
          month: 'Month',
          today: 'Today',
          previous: 'Previous',
          next: 'Next',
          agenda: 'Agenda',
          event: 'Event',
          allDay: 'All Day',

          noEventsInRange: 'There are no events in this range.',
        }}
        showAllEvents={true}
        popup={true}
        onView={(e: any) => setView(e)}
        step={60}
        timeslots={1}
        formats={{
          timeGutterFormat: (date: any, culture: any, localizer: any) => {
            console.log(
              date,
              'date',
              culture,
              localizer?.format(date, 'hh:mm A', culture)
            );
            return localizer?.format(date, 'hh:mm A', culture);
          },
          dayFormat: 'ddd',
        }}
        dayPropGetter={customDayPropGetter}
        slotPropGetter={customSlotPropGetter}
        min={moment().set({ hour: 9, minute: 0 }).toDate()}
        max={moment().set({ hour: 18, minute: 0 }).toDate()}
        onSelectEvent={(e: any) => {
          console.log('e', e);
        }}
        onSelectSlot={(e: any) => {
          console.log('slot', e);
        }}
        components={{
          event: ({ event }) => {
            console.log('props', event);
            return <EventsComponent event={event} />;
          },
          toolbar: (props) => <ToolbarComponent Views={Views} {...props} />,
        }}
      />
    </Box>
  );
};

export default CalenderComponent;
