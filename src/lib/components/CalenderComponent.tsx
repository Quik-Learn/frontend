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
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '../store';
import { meetingIdState } from '../store/reducers/meeting-id-slice';
import { useLeaveMeetingMutation } from '../services/student-mutation';
const localizer = momentLocalizer(moment);

const CalenderComponent = ({ events, trigger, setRange }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const [view, setView] = React.useState(Views.WEEK);
  const [currentDate, setCurrentDate] = useState(new Date());
  const id = localStorage.getItem('meetingId');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [leaveMeeting, leaveMeetingData] = useLeaveMeetingMutation();
  const leaveMeetingInfo = searchParams.get('leaveMeeting');

  useEffect(() => {
    if (leaveMeetingInfo) {
      leaveMeeting(id);
    }
  }, [leaveMeetingInfo]);

  useEffect(() => {
    const { data, isLoading, isError, error, isSuccess } = leaveMeetingData;
    if (isSuccess) {
      onOpen();
    }
    if (isError) {
      console.log(error);
      toast({
        //@ts-ignore
        title: error?.data?.error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [leaveMeetingData]);

  const handleNavigate = (newDate: Date, newView: string) => {
    setCurrentDate(newDate);

    // Calculate the start and end date based on the new view
    let start, end;
    if (newView === Views.WEEK) {
      start = moment(newDate).startOf('week').toDate();
      end = moment(newDate).endOf('week').toDate();
    } else if (newView === Views.MONTH) {
      start = moment(newDate).startOf('month').toDate();
      end = moment(newDate).endOf('month').toDate();
    }
    setRange({ start, end });
    console.log(`Start: ${start}, End: ${end}`);
  };

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
        onNavigate={(newDate) => handleNavigate(newDate, view)}
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
          event: ({ event }) => (
            <Events
              event={event}
              trigger={trigger}
              isOpen={isOpen}
              onClose={onClose}
            />
          ),
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
