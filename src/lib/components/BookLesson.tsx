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
const BookLesson = ({ isOpen, onClose }: any) => {
  const {
    isOpen: isOpenn,
    onOpen: onOpenn,
    onClose: onClosee,
  } = useDisclosure();
  const [selected, setSelected] = useState<string[]>([]);
  const [successData, setSuccessData] = useState({
    title: '',
    description: '',
    buttonText: '',
  });
  const time = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm'];
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
            Book an Introductory Session with Dr. James
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyContent={'center'} alignItems={'center'}>
            <Text mx={6} color={'#5F5F5F'} fontSize={20} mt={-10}>
              Dr. James is a specialist in Mathematics
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
                  onChange={() => {}}
                  value={''}
                  selectRange
                  prevLabel={<IoChevronBackOutline />}
                  nextLabel={<GrFormNext />}
                  next2Label={<GrFormNext color="white" />}
                  prev2Label={<IoChevronBackOutline color="white" />}
                />
              </Box>
            </Stack>
            <Text m={6} color={'#5F5F5F'} fontSize={24} fontWeight={700}>
              Select a Date
            </Text>
            <HStack gap={4}>
              {time?.map((item) => (
                <Stack
                  bg={
                    selected.find((itemm) => itemm === item)
                      ? '#0065FF'
                      : '#CDCDCD'
                  }
                  px={4}
                  py={2}
                  borderRadius={8}
                  justifyContent={'center'}
                  alignItems={'center'}
                  onClick={() => {
                    console.log(selected, item);
                    if (
                      selected?.length &&
                      selected?.find((itemm) => itemm === item)
                    ) {
                      const lastSelectedIndex = selected.lastIndexOf(item);
                      const updatedSelected = [...selected];
                      updatedSelected.splice(lastSelectedIndex, 1); // Remove the last selected item
                      setSelected(updatedSelected);
                    } else {
                      setSelected((prev) => [...prev, item]);
                    }
                  }}
                >
                  <Text
                    fontSize={14}
                    fontWeight={500}
                    color={
                      selected.find((itemm) => itemm === item)
                        ? '#fff'
                        : '#121117'
                    }
                  >
                    {item}
                  </Text>
                </Stack>
              ))}
            </HStack>
            <Stack
              justifyContent={'flex-end'}
              alignItems={'flex-end'}
              w={'100%'}
              mt={6}
            >
              <Button
                text="Confirm Booking"
                bg="#0177FB"
                width={'279px'}
                onClick={() => {
                  onClose();
                  onOpenn();
                  setSuccessData({
                    title: 'Successful',
                    description: 'Session successfully booked!',
                    buttonText: 'Close',
                  });
                }}
              />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <SuccessModal
        onClose={onClosee}
        isOpen={isOpenn}
        title={successData.title}
        description={successData.description}
        buttonText={successData.buttonText}
      />
    </Stack>
  );
};

export default BookLesson;
