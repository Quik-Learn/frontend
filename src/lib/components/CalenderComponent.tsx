'use client';

import React, { useMemo, useState } from 'react';
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
const localizer = momentLocalizer(moment);

const myEventsLis = [
  // Biology: Recurring event from Monday to Sunday at 3 PM - 4 PM
  ...Array.from({ length: 7 }, (_, i) => ({
    start: moment()
      .day(i + 1)
      .set({ hour: 15, minute: 0 })
      .toDate(), // 3 PM start

    end: moment()
      .day(i + 1)
      .set({ hour: 16, minute: 0 })
      .toDate(), // 4 PM end
    title: 'Biology',
    color: 'blue',
    desc: 'Biology Year 6 to 7',
  })),
  // Mathematics: Recurring event from Tuesday to Thursday at 1 PM - 2 PM
  ...Array.from({ length: 3 }, (_, i) => ({
    start: moment()
      .day(i + 2)
      .set({ hour: 13, minute: 0 })
      .toDate(), // 1 PM start (Tuesday to Thursday)
    end: moment()
      .day(i + 2)
      .set({ hour: 14, minute: 0 })
      .toDate(), // 2 PM end
    title: 'Mathematics',
    color: 'red',
    desc: 'Mathematics Year 6 to 7',
  })),
  // Mathematics: Recurring event from Tuesday to Thursday at 1 PM - 2 PM
  ...Array.from({ length: 3 }, (_, i) => ({
    start: moment()
      .day(i + 2)
      .set({ hour: 9, minute: 0 })
      .toDate(), // 1 PM start (Tuesday to Thursday)
    end: moment()
      .day(i + 2)
      .set({ hour: 10, minute: 0 })
      .toDate(), // 2 PM end
    title: 'English',
    color: 'yellow',
    desc: 'English Year 6 to 7',
  })),
];

const CalenderComponent = () => {
  const [selected, setSelceted] = useState<any>();
  const [view, setView] = React.useState(Views.WEEK);
  const [currentDate, setCurrentDate] = useState(new Date()); // March 4, 2024
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSelectSlot = ({ start }: any) => {
    toast({
      title: `Clicked date: ${moment(start).format('MMMM Do YYYY')}`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const eventStyleGetter = (event: any) => {
    const backgroundColor = event.color;
    const style = {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      display: 'block',
      padding: '5px',
    };
    return {
      style,
    };
  };
  const customDayPropGetter = (date: any) => {
    if (date.getDay() === 6 || date.getDay() === 0) {
      return {
        style: {
          border: '',
        },
      };
    }
    return {};
  };
  const customSlotPropGetter = (date: any) => {
    return {
      style: {
        border: 'none',
        borderWidth: '0px !important',
        borderColor: 'transparent',
      },
    };
  };

  return (
    <Box
      p={5}
      sx={{
        '.rbc-month-view .rbc-month-row': {
          border: 'none',
          borderWidth: '0px',
          borderColor: 'transparent',
        },
        '.rbc-header': {
          padding: '24px',
          alignSelf: 'center',
          flex: 1,
          height: '100%',
          flexDirection: 'row',
          color: '#848585',
          fontSize: '20px',
          border: 'none',
          borderWidth: '0px',
          borderBottomWidth: '0px',
          borderColor: 'transparent',
        },
        '.rbc-time-slot ': {
          color: '#141736',
          fontSize: '18px',
          border: 'none',
          borderWidth: '0px',
          borderColor: 'transparent',
          padding: '18px',
        },
        '.rbc-day-slot .rbc-time-slow': {
          padding: '18px',
          border: 'none',
          borderWidth: '0px',
          borderColor: 'transparent',
        },
        '.rbc-time-content .rbc-day-slow': {
          padding: '18px',
          border: 'none',
          borderWidth: '0px',
          borderColor: 'transparent',
          borderTopWidth: '0px',
        },
        '.rbc-allday-cell': {
          backgroundColor: 'black',
          height: 0,
          display: 'none',
        },
        '.rbc-time-header-content': {
          height: '58px',
          border: 'none',
          borderWidth: '0px',
          borderColor: 'transparent',
        },
        '.rbc-timeslot-group': {
          // flexFlow: 'no-wrap',
          minHeight: '58px',
          border: 'none',
          borderWidth: '0px',
          borderColor: 'transparent',
        },
      }}
    >
      <BigCalendar
        localizer={localizer}
        // events={events}
        events={myEventsLis}
        startAccessor="start"
        endAccessor="end"
        // selectable
        style={{ height: '800px' }}
        onSelectSlot={handleSelectSlot} // Handle click on time slots
        eventPropGetter={eventStyleGetter} // Apply custom styles to events
        // defaultView={Views.WEEK} // Ensure we use the Week view with Time (Y-axis) and Days (X-axis)
        views={[Views.WEEK, Views.MONTH]}
        date={currentDate}
        onNavigate={(newDate) => setCurrentDate(newDate)}
        view={view}
        onView={(e: any) => setView(e)}
        step={60} // 30 minutes per time slot
        timeslots={1} // Two time slots per hour
        formats={{
          timeGutterFormat: (date: any, culture: any, localizer: any) =>
            localizer?.format(date, 'hh:mm A', culture),
          dayFormat: 'ddd',
        }}
        dayPropGetter={customDayPropGetter}
        slotPropGetter={customSlotPropGetter}
        min={moment().set({ hour: 9, minute: 0 }).toDate()} // Minimum time to display (8 AM)
        max={moment().set({ hour: 18, minute: 0 }).toDate()} // Maximum time to display (6 PM)
        components={{
          event: ({ event }) => (
            <Box
              bg={event.color}
              color="white"
              p={2}
              borderRadius="md"
              alignItems="center"
              justifyContent={'center'}
              fontWeight="bold"
              display={'flex'}
              flexDirection={'row'}
              gap={2}
              height={'58px'}
              w={'100%'}
              onClick={() => {
                onOpen();
                setSelceted(event);
              }}
            >
              <Modal isOpen={isOpen} onClose={onClose} isCentered>
                {/* <ModalOverlay /> */}
                <ModalContent
                  textAlign="center"
                  bg="#fff"
                  px={6}
                  py={10}
                  position={'absolute'}
                  borderRadius={15}
                  overflow={'hidden'}
                >
                  {/* <ModalHeader>{title}</ModalHeader> */}
                  <Stack
                    position={'absolute'}
                    width={'15px'}
                    height={'100%'}
                    left={0}
                    top={0}
                    bg={selected?.color}
                  />
                  <ModalCloseButton />
                  <ModalBody>
                    <VStack
                      alignItems={'flex-start'}
                      justifyContent={'flex-start'}
                    >
                      <Text fontWeight={900} fontSize="31px" color={'#00190B'}>
                        {selected?.title}
                      </Text>

                      <Text fontSize="18px" color="#5F5F5FD1" mb={3}>
                        {event.desc}
                      </Text>
                      <HStack gap={5}>
                        <Icon as={GoClock} size={30} color="#000" />
                        <Text fontSize={18} color={'#000'} fontWeight={300}>
                          11am to 12pm
                        </Text>
                      </HStack>
                      <HStack gap={5}>
                        <Icon as={CiBellOn} size={30} color="#000" />
                        <Text fontSize={18} color={'#000'} fontWeight={300}>
                          Starts in 30 minutes
                        </Text>
                      </HStack>
                      <HStack gap={5}>
                        <Icon as={TiGroupOutline} size={30} color="#000" />
                        <Text fontSize={18} color={'#000'} fontWeight={300}>
                          Dr. James
                        </Text>
                      </HStack>
                      <HStack gap={5}>
                        <Icon as={IoVideocamOutline} size={30} color="#000" />
                        <Button
                          width={127}
                          bg={selected?.color}
                          text="Join Session"
                        />
                      </HStack>
                    </VStack>
                  </ModalBody>
                </ModalContent>
              </Modal>
              <Image
                src="/images/english-icon.svg"
                w={6}
                h={6}
                borderRadius={10}
              />
              <Text fontSize={10}>{event.title}</Text>
            </Box>
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
                <Button width={'262px'} text="Book a session" bg="#0177FB" />
              </Flex>
            </Flex>
          ),
        }}
      />
    </Box>
  );
};

export default CalenderComponent;
