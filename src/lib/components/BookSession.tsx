import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from './ui/button';
import { IoChevronBackOutline } from 'react-icons/io5';
import { GrFormNext } from 'react-icons/gr';
import {
  convertTimeAndAddOneHour,
  convertTo12HourFormattShort,
  formatToDateString,
} from '../helpers/paths';
import { useLazyGetStudentCalenderQuery } from '../services/parent-mutation';
import { StyledCalendarWrapper } from './styled/StyledCalendarWrapper';

interface BookSessionProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  subject_id: string;
  bookSessionFunction: (params: BookingParams) => void;
  isLoading: boolean;
  studentCalenderData: any[];
  setStudentCalenderData: (data: any[]) => void;
}

interface BookingParams {
  body: {
    date: string;
    start_time: string;
    end_time: string;
  };
  subject_id: string;
  ward_id: string;
}

interface CalendarSession {
  date: string;
  start_time: string;
  end_time: string;
  title: string;
}

const BookSession: React.FC<BookSessionProps> = ({
  isOpen,
  onClose,
  id,
  subject_id,
  bookSessionFunction,
  isLoading,
  studentCalenderData,
  setStudentCalenderData,
  hasSubscription,
  onOpenError,
}: any) => {
  const [selected, setSelected] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const TIME_SLOTS = {
    morning: ['9am', '10am', '11am'],
    afternoon: ['12pm', '1pm', '2pm'],
    evening: ['3pm', '4pm', '5pm', '6pm'],
  };

  const ALL_TIME_SLOTS = [...Object.values(TIME_SLOTS).flat()];

  const getAvailableTimeSlots = () => {
    if (!selectedDate) return [];

    const formattedDate = formatToDateString(selectedDate);
    const bookedSlots = studentCalenderData
      .filter((session: any) => session.date === formattedDate)
      .map((session: any) => convertTo12HourFormattShort(session.start_time));
    console.log(bookedSlots);

    return ALL_TIME_SLOTS.filter((slot) => !bookedSlots.includes(slot));
  };

  console.log(getAvailableTimeSlots(), 'getAvailableTimeSlots');
  const tileClassName = ({ date }: { date: Date }) => {
    const classes = [];

    if (date > new Date()) {
      classes.push('available-day');
    }

    if (selectedDate?.toDateString() === date.toDateString()) {
      classes.push('selected-day');
    }

    return classes.join(' ');
  };

  const isDayAvailable = (date: Date) => {
    return date > new Date();
  };

  const availableTimes = getAvailableTimeSlots();
  const handleClose = () => {
    setSelected('');
    setSelectedDate(null);
    setStudentCalenderData([]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      motionPreset="slideInBottom"
      size={'4xl'}
    >
      <ModalOverlay />
      <ModalContent bg={'#fff'}>
        <ModalHeader color={'black'} m={6} fontSize={'26px'} fontWeight={500}>
          Book an Introductory Session
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          justifyContent={'center'}
          alignItems={'center'}
          w={'100%'}
          display={'flex'}
          flexDirection={'column'}
        >
          <Text m={6} color={'#5F5F5F'} fontSize={24} fontWeight={700}>
            Select a Date
          </Text>
          <VStack
            maxW={{ base: '100%', md: '500px' }}
            w={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            alignSelf={'center'}
          >
            <StyledCalendarWrapper>
              <Calendar
                onChange={(value) => setSelectedDate(value as Date)}
                value={selectedDate}
                tileClassName={tileClassName}
                tileDisabled={({ date }) => !isDayAvailable(date)}
                prevLabel={<IoChevronBackOutline />}
                nextLabel={<GrFormNext />}
                next2Label={null}
                prev2Label={null}
                minDate={new Date()}
              />
            </StyledCalendarWrapper>
          </VStack>
          {selectedDate && (
            <>
              <Text m={6} color={'#5F5F5F'} fontSize={24} fontWeight={700}>
                Select a Time
              </Text>
              <HStack gap={4} flexWrap={'wrap'}>
                {availableTimes?.map((item) => (
                  <Stack
                    key={item}
                    bg={selected === item ? '#0065FF' : '#CDCDCD'}
                    px={4}
                    py={2}
                    borderRadius={8}
                    justifyContent={'center'}
                    alignItems={'center'}
                    cursor="pointer"
                    onClick={() => setSelected(item)}
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
                if (!selectedDate || !selected) return;
                const { originalTime, oneHourLater } =
                  convertTimeAndAddOneHour(selected);
                bookSessionFunction({
                  body: {
                    date: formatToDateString(selectedDate),
                    start_time: originalTime,
                    end_time: oneHourLater,
                  },
                  subject_id,
                  ward_id: id,
                });
              }}
            />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BookSession;
