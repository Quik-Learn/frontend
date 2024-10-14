import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Stack,
  HStack,
  Box,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import SuccessModal from './ui/success-modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from './ui/button';
import { IoChevronBackOutline } from 'react-icons/io5';
import { GrFormNext } from 'react-icons/gr';
import {
  convertTimeAndAddOneHour,
  convertTo12HourFormat,
  convertTo12HourFormatt,
  formatToDateString,
} from '../helpers/paths';

const BookLesson = ({
  isOpen,
  onClose,
  tutor,
  overview,
  bookSession,
  isLoading,
  tutorCalender,
}: any) => {
  const [selected, setSelected] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<any>(null); // Selected date from calendar
  const [successData, setSuccessData] = useState({
    title: '',
    description: '',
    buttonText: '',
  });

  // Tutor availability data
  const availability = overview?.general_availability || [];

  // Define time slots for morning, afternoon, and evening
  const timeSlots = {
    morning: ['9am', '10am', '11am'],
    afternoon: ['12pm', '1pm', '2pm'],
    evening: ['3pm', '4pm'],
  };

  // Convert availability into a more usable format
  const getDayAvailability = (day: string) => {
    const dayAvailability = availability.find(
      (av: any) => av.day.toLowerCase() === day.toLowerCase()
    );
    // console.log(dayAvailability);
    return dayAvailability || {};
  };

  // Convert availability into a more usable format
  const getTimeAvailability = (day: string) => {
    const dayAvailability = availability.find(
      (av: any) => av.day.toLowerCase() === day.toLowerCase()
    );
    // console.log(dayAvailability);
    return dayAvailability || {};
  };

  // Disable unavailable days on the calendar
  const isDayAvailable = (date: Date) => {
    const dayName = date
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase();
    const dayAvailability = getDayAvailability(dayName);
    // console.log(getDayAvailability(dayName));
    return (
      date > new Date() &&
      (dayAvailability?.morning ||
        dayAvailability?.afternoon ||
        dayAvailability?.evening)
    );
  };
  // Add class for available days and selected date
  const tileClassName = ({ date }: { date: Date }) => {
    let className = '';

    if (isDayAvailable(date)) {
      className += ' available-day'; // Available day class
    }

    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      className += ' selected-day'; // Selected day class
    }

    return className;
  };

  const isSlotBooked = (date: Date, timeSlot: string) => {
    const formattedDate = formatToDateString(date); // Format date to 'YYYY-MM-DD'
    console.log(
      formattedDate,
      date,
      timeSlot,
      convertTo12HourFormatt('16:00:00')
    );
    return tutorCalender.some(
      (session: any) =>
        session.date === formattedDate &&
        timeSlot === convertTo12HourFormatt(session.start_time)
    );
  };

  const tileDisabled = ({ date }: any) => {
    return date < new Date();
  };
  // Filter time slots based on the selected day
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return [];

    const dayName = selectedDate
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase();
    const dayAvailability = getDayAvailability(dayName);

    let availableTimes: string[] = [];

    if (dayAvailability.morning)
      availableTimes = availableTimes.concat(timeSlots.morning);
    if (dayAvailability.afternoon)
      availableTimes = availableTimes.concat(timeSlots.afternoon);
    if (dayAvailability.evening)
      availableTimes = availableTimes.concat(timeSlots.evening);

    // Filter out the booked time slots for the selected date
    availableTimes = availableTimes.filter(
      (timeSlot) => !isSlotBooked(selectedDate, timeSlot)
    );

    return availableTimes;
  };

  const availableTimes = getAvailableTimeSlots();
  console.log(selectedDate);
  return (
    <Stack w={'1000'}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size={'4xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={'black'} m={6} fontSize={'26px'} fontWeight={500}>
            Book an Introductory Session with {tutor?.user?.user?.firstname}{' '}
            {tutor?.user?.user?.lastname}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyContent={'center'} alignItems={'center'}>
            <Text mx={6} color={'#5F5F5F'} fontSize={20} mt={-10}>
              {tutor?.bio}
            </Text>
            <Text m={6} color={'#5F5F5F'} fontSize={24} fontWeight={700}>
              Select a Date
            </Text>
            <Stack w={'100%'} justifyContent={'center'} alignItems={'center'}>
              <Box
                w={'490px'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                  '.react-calendar': {
                    width: '100%',
                    background: 'white',
                    borderRadius: 'md',
                    border: 'none',
                  },
                  '.react-calendar__navigation': {
                    mb: 4, // Add margin to the bottom
                    fontSize: '17px',
                    color: '#7D8DA6',
                  },
                  '.react-calendar__tile': {
                    padding: '10px',

                    color: '#141736',
                    fontSize: '13px',
                    transition: 'background-color 0.3s',
                    _hover: {
                      bg: '#367BF5',
                    },
                  },
                  ' .react-calendar__tile.available-day ': {
                    backgroundColor: '#00bfff',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                  },
                  ' .react-calendar__tile.selected-day ': {
                    backgroundColor: '#0065FF',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                  },
                  ' .react-calendar__tile.available-day:hover': {
                    backgroundColor: '#004bbd',
                    color: '#fff',
                  },
                  '.react-calendar__tile--active': {
                    bg: '#E0CAE0',
                    color: '#141736',
                  },
                  '.react-calendar__tile--now': {
                    bg: '#367BF5',
                    color: '#141736',
                    borderRadius: '50%',
                  },
                  '.react-calendar__month-view__weekdays': {
                    color: '#141736',
                    fontSize: '13px',
                    textTransform: 'capitalize',
                    borderBottom: 'none',
                    fontWeight: '300',
                    paddingBottom: 2,
                    textDecoration: 'no-line',
                  },
                }}
              >
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  tileClassName={tileClassName}
                  tileDisabled={({ date }) => !isDayAvailable(date)}
                  prevLabel={<IoChevronBackOutline />}
                  nextLabel={<GrFormNext />}
                  next2Label={null}
                  prev2Label={null}
                  minDate={new Date()}
                />
              </Box>
            </Stack>
            {selectedDate && (
              <>
                <Text m={6} color={'#5F5F5F'} fontSize={24} fontWeight={700}>
                  Select a Time
                </Text>
                <HStack gap={4}>
                  {availableTimes?.map((item) => (
                    <Stack
                      bg={selected === item ? '#0065FF' : '#CDCDCD'}
                      px={4}
                      py={2}
                      borderRadius={8}
                      justifyContent={'center'}
                      alignItems={'center'}
                      onClick={() => {
                        setSelected(item);
                      }}
                    >
                      <Text
                        fontSize={14}
                        fontWeight={500}
                        color={selected === item ? '#fff' : '#121117'}
                      >
                        {item}
                      </Text>
                    </Stack>
                  ))}
                </HStack>
              </>
            )}
            <Stack
              justifyContent={'flex-end'}
              alignItems={'flex-end'}
              w={'100%'}
              mt={6}
            >
              <Button
                text="Confirm Booking"
                bg="#0177FB"
                isLoading={isLoading}
                width={'279px'}
                onClick={() => {
                  const { originalTime, oneHourLater } =
                    convertTimeAndAddOneHour(selected);
                  bookSession({
                    date: formatToDateString(selectedDate),
                    start_time: originalTime,
                    end_time: oneHourLater,
                  });
                }}
              />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default BookLesson;
