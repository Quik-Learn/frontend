'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Box,
  useToast,
  Text,
  Image,
  Flex,
  IconButton,
  Select,
  useColorModeValue,
  background,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  VStack,
  Icon,
  HStack,
  Stack,
} from '@chakra-ui/react';
import { IoChevronBackOutline } from 'react-icons/io5';
import { GrFormNext } from 'react-icons/gr';
import { GoClock } from 'react-icons/go';
import { CiBellOn } from 'react-icons/ci';
import { TiGroupOutline } from 'react-icons/ti';
import { IoVideocamOutline } from 'react-icons/io5';
import Button from './ui/button';
import { calendarStyle } from '../styles/theme/config';
// import { events, myEventsList } from '../utils/data';
import Events from './Events';
import {
  addRandomColorsToEvents,
  customDayPropGetter,
  customSlotPropGetter,
  eventStyleGetter,
  getRandomColor,
} from '../helpers/paths';
import { useRouter } from 'next/navigation';
import { useJoinMeetingMutation } from '../services/student-mutation';
const localizer = momentLocalizer(moment);

const CalenderComponent = ({ events, trigger }: any) => {
  const router = useRouter();
  const [view, setView] = React.useState(Views.WEEK);
  const [currentDate, setCurrentDate] = useState(new Date());

  console.log(events);
  const toast = useToast();

  return (
    <Box p={5} sx={calendarStyle}>
      <BigCalendar
        localizer={localizer}
        events={addRandomColorsToEvents(events)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '800px' }}
        eventPropGetter={eventStyleGetter}
        defaultView={Views.WEEK}
        views={[Views.WEEK, Views.MONTH]}
        date={currentDate}
        onNavigate={(newDate) => setCurrentDate(newDate)}
        view={view}
        onView={(e: any) => setView(e)}
        step={60}
        timeslots={1}
        formats={{
          timeGutterFormat: (date: any, culture: any, localizer: any) =>
            localizer?.format(date, 'hh:mm A', culture),
          dayFormat: 'ddd',
        }}
        dayPropGetter={customDayPropGetter}
        slotPropGetter={customSlotPropGetter}
        min={moment().set({ hour: 9, minute: 0 }).toDate()}
        max={moment().set({ hour: 18, minute: 0 }).toDate()}
        components={{
          event: ({ event }) => <Events event={event} trigger={trigger} />,
          toolbar: ({ label, onNavigate, onView, view }: any) => (
            <Flex justify="space-between" align="center" mb={4}>
              <Flex>
                <Text mx={6} color={'#7D8DA6'} fontSize={18}>
                  {label}
                </Text>
                <IconButton
                  w={33}
                  h={33}
                  borderRadius={5}
                  onClick={() => onNavigate('PREV')}
                  mr={2}
                  icon={<IoChevronBackOutline color="#7D8DA6" />}
                  aria-label={''}
                ></IconButton>
                <IconButton
                  w={33}
                  h={33}
                  borderRadius={5}
                  onClick={() => onNavigate('NEXT')}
                  mr={4}
                  icon={<GrFormNext color="#7D8DA6" />}
                  aria-label={''}
                ></IconButton>
                <Select
                  value={view}
                  onChange={(e) => onView(e.target.value)}
                  width="120px"
                  backgroundColor={'transparent'}
                  borderColor={'transparent'}
                  color={'#7D8DA6'}
                  mr={4}
                >
                  <option value={Views.WEEK}>Weekly</option>
                  <option value={Views.MONTH}>Monthly</option>
                </Select>
              </Flex>
              <Flex align="center">
                <Button
                  width={'262px'}
                  text="Book a session"
                  bg="#0177FB"
                  onClick={() => router.push('/student/book-session')}
                />
              </Flex>
            </Flex>
          ),
        }}
      />
    </Box>
  );
};

export default CalenderComponent;
