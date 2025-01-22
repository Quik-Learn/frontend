import {
  Box,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Stack,
  useDisclosure,
  VStack,
  Text,
  Image,
  ModalOverlay,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CiBellOn } from 'react-icons/ci';
import { GoClock } from 'react-icons/go';
import { IoVideocamOutline } from 'react-icons/io5';
import { TiGroupOutline } from 'react-icons/ti';
import Button from './ui/button';
import Rating from './Rating';
import { RiHomeSmile2Line } from 'react-icons/ri';
import { TiArrowForwardOutline } from 'react-icons/ti';
import { convertTo12HourFormat, getTimeFromToday } from '../helpers/paths';
import { events } from '../utils/data';
import moment from 'moment';
import { useJoinMeetingMutation } from '../services/student-mutation';
import FeedbackModal from './FeedbackModal';
import { setMeetingId } from '../store/reducers/meeting-id-slice';
import { useAppDispatch } from '../store';
import { useJoinMeetingTutorMutation } from '../services/tutor-mutation';

const EventsTutor = ({
  event,
  isOpen: isOpenJoin,
  onClose: onCloseJoin,
  type,
}: any) => {
  console.log('eee', event);
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useAppDispatch();
  const [selected, setSelceted] = useState<any>();
  const [joinMeeting, { data, isLoading, isSuccess, isError, error, reset }] =
    useJoinMeetingMutation();
  const [
    joinMeetingTutor,
    {
      data: dataTutor,
      isLoading: isLoadingTutor,
      isSuccess: isSuccessTutor,
      isError: isErrorTutor,
      error: errorTutor,
      reset: resetTutor,
    },
  ] = useJoinMeetingTutorMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const start = convertTo12HourFormat(event?.start);
  const end = convertTo12HourFormat(event?.end);
  const array = [
    { id: 1, name: `${start} to ${end}`, icon: GoClock },
    {
      id: 2,
      name: moment().isBefore(moment(event?.start, 'YYYYMMDD'))
        ? `Starts in ${moment(event?.start, 'YYYYMMDD').fromNow()}`
        : 'Ended',
      icon: CiBellOn,
    },
    {
      id: 3,
      name: `${event?.students?.length} students`,
      icon: TiGroupOutline,
    },
  ];
  useEffect(() => {
    const checkTimeDifference = () => {
      if (event?.meeting_link) {
        console.log(event?.meeting_link);

        setIsDisabled(true); // Enable the button
      } else {
        setIsDisabled(false); // Disable the button
      }
    };

    // Initial check when the component mounts
    checkTimeDifference();

    // Set up an interval to check continuously (e.g., every minute)
    const interval = setInterval(checkTimeDifference, 60 * 1000); // Every 1 minute

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [event?.meeting_link]); // Track both start and end times of the event
  console.log(event?.meeting_link);
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      onClose();
      window.open(data?.data, '_self');
      // dispatch(setMeetingId(event?.meeting_link?.meeting_id));
      localStorage.setItem('meetingId', event?.meeting_link?.meeting_id);
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
  }, [isSuccess, isError, error, data, event]);

  return (
    <Box
      bg={selected?.color}
      color="white"
      p={2}
      borderRadius="md"
      alignItems="center"
      justifyContent={'center'}
      fontWeight="bold"
      display={'flex'}
      flexDirection={'row'}
      gap={2}
      mb={5}
      height={'100%'}
      w={'100%'}
      onClick={() => {
        // trigger({});
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
            <VStack alignItems={'flex-start'} justifyContent={'flex-start'}>
              <Text fontWeight={900} fontSize="31px" color={'#00190B'}>
                {selected?.title}
              </Text>

              <Text fontSize="18px" color="#5F5F5FD1" mb={3}>
                {event?.desc}
              </Text>
              {array.map((item) => (
                <HStack gap={5}>
                  <Icon as={item.icon} size={30} color="#000" />
                  <Text fontSize={18} color={'#000'} fontWeight={300}>
                    {item.name}
                  </Text>
                </HStack>
              ))}

              <HStack gap={5}>
                <Icon as={IoVideocamOutline} size={30} color="#000" />
                <Button
                  width={127}
                  bg={selected?.color}
                  isDisabled={!event?.meeting_link}
                  isLoading={isLoading}
                  text="View"
                  onClick={() => {
                    if (type === 'tutor') {
                      joinMeetingTutor(event?.meeting_link?.meeting_id);
                    } else {
                      joinMeeting(event?.meeting_link?.meeting_id);
                    }
                  }}
                />
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Image src={event?.subject?.thumbnail} w={8} h={8} borderRadius={10} />
      <Text fontSize={10}>{event?.subject?.title}</Text>
      <FeedbackModal
        isOpen={isOpenJoin}
        onClose={onCloseJoin}
        session_id={event?.id}
        isJoinLoading={isLoading}
        isDisabled={isDisabled}
        joinMeeting={(id: string) => joinMeeting(id)}
      />
    </Box>
  );
};

export default EventsTutor;
