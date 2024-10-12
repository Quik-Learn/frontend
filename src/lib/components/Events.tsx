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
} from '@chakra-ui/react';
import React, { useState } from 'react';
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

const Events = ({ event }: any) => {
  const [selected, setSelceted] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenJoin,
    onOpen: onOpenJoin,
    onClose: onCloseJoin,
  } = useDisclosure();

  const start = convertTo12HourFormat(event?.start);
  const end = convertTo12HourFormat(event?.end);
  const array = [
    { id: 1, name: `${start} to ${end}`, icon: GoClock },
    {
      id: 2,
      name: `Starts in ${moment(event?.start, 'YYYYMMDD').fromNow()}`,
      icon: CiBellOn,
    },
    { id: 3, name: 'Dr. James', icon: TiGroupOutline },
  ];
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
                {event.desc}
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
                  text="Join Session"
                  onClick={() => {
                    onClose();
                    onOpenJoin();
                  }}
                />
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Image src="/images/english-icon.svg" w={6} h={6} borderRadius={10} />
      <Text fontSize={10}>{event.title}</Text>
      <Modal isOpen={isOpenJoin} onClose={onCloseJoin} isCentered>
        <ModalOverlay />
        <ModalContent
          textAlign="center"
          bg="#fff"
          px={6}
          py={10}
          position={'absolute'}
          borderRadius={15}
          overflow={'hidden'}
        >
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems={'center'} justifyContent={'center'}>
              <Text fontWeight={900} fontSize="31px" color={'#00190B'} mb={3}>
                Session feedback
              </Text>

              <Text fontSize="18px" color="#5F5F5FD1" mb={3}>
                Please rate your experience with our Tutor below
              </Text>
              <Rating rate={4} />
              <Text
                mb="2px"
                textAlign={'left'}
                alignSelf={'flex-start'}
                color={'#6B7280'}
              >
                Additional feedback
              </Text>
              <Textarea
                value={''}
                onChange={() => {}}
                placeholder="My feedback!!"
                size="sm"
                w={'100%'}
              />

              <Button
                width={'100%'}
                bg={'#02659C'}
                text="Submit feedback"
                my={5}
                onClick={() => onCloseJoin()}
              />
              <Text color={'#6B7280'}>OR</Text>
              <HStack gap={5} my={0}>
                <Button
                  width={'100%'}
                  bg={'#fff'}
                  text="Home"
                  border="#D0D5DD"
                  color="#344054"
                  my={5}
                  variant="outline"
                  borderRadius={11}
                  icon={<RiHomeSmile2Line color="#9CA3AF" />}
                  onClick={() => onCloseJoin()}
                />
                <Button
                  width={'100%'}
                  bg={'#fff'}
                  text="Rejoin session"
                  my={5}
                  border="#D0D5DD"
                  icon={<TiArrowForwardOutline color="#9CA3AF" />}
                  color="#344054"
                  onClick={() => onCloseJoin()}
                  borderRadius={11}
                  variant="outline"
                />
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Events;
