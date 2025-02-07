'use client';

import {
  Box,
  ModalOverlay,
  Modal,
  Stack,
  HStack,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalFooter,
  VStack,
  Image,
  Text,
  useDisclosure,
  ModalBody,
  Heading,
} from '@chakra-ui/react';

import React from 'react';
import TutorContainer from '~/lib/layout/TutorContainer';

import Button from '~/lib/components/ui/button';
import { IoCloseOutline } from 'react-icons/io5';
import { IoCheckmarkOutline } from 'react-icons/io5';
import useHomeMeet from './home-meet';
import { useParams } from 'next/navigation';
import FeedbackModal from '~/lib/components/FeedbackModal';
const index = () => {
  const { id }: { id: string } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const {
    isOpen: isOpenJoin,
    onOpen: onOpenJoin,
    onClose: onCloseJoin,
  } = useDisclosure();
  const {
    session,
    isLoading,
    checkIn,
    checkOut,
    isCheckInLoading,
    isCheckOutLoading,
    elapsedTime,
    remainingTime,
    isTimeUp,
    isNearingEnd,
    tutorCheckIn,
    isTutorCheckInLoading,
  } = useHomeMeet(id as string, onOpen, onOpen2, onClose2, onOpenJoin);
  console.log(session, 'session');
  return (
    <TutorContainer>
      <Stack mx={{ base: 5, md: 10 }}>
        <Heading fontSize={'24px'} my={5} color="#161736">
          Check In
        </Heading>
        <Box
          bg="#fff"
          borderRadius={'15px'}
          boxShadow={'0px 0px 10px 0px rgba(0, 0, 0, 0.1)'}
          p={5}
          display={'flex'}
          gap={5}
          mt={10}
        >
          <Image src="/images/first.svg" alt="five" width={5} height={5} />
          <VStack alignItems={'flex-start'}>
            <Text color="#000000" fontSize={'16px'} fontWeight={700}>
              Home Tutoring
            </Text>
            <Text color="#000000" fontSize={'14px'}>
              {session?.home_address}
            </Text>
          </VStack>
        </Box>
        <Box
          bg="#fff"
          borderRadius={'15px'}
          boxShadow={'0px 0px 10px 0px rgba(0, 0, 0, 0.1)'}
          p={5}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={5}
          mt={10}
        >
          <VStack gap={5}>
            <HStack alignItems={'flex-start'} gap={5}>
              <Image src="/images/second.svg" alt="five" width={5} height={5} />
              <VStack alignItems={'flex-start'}>
                <Text color="#000000" fontSize={'16px'} fontWeight={700}>
                  {session?.subject}
                </Text>
                <Text color="#000000" fontSize={'14px'}>
                  {session?.title}
                </Text>
              </VStack>
            </HStack>
            <HStack alignItems={'flex-start'} gap={5}>
              <Image src="/images/third.svg" alt="five" width={5} height={5} />
              <VStack alignItems={'flex-start'}>
                <Text color="#000000" fontSize={'16px'} fontWeight={700}>
                  Duration
                </Text>
                <Text color="#000000" fontSize={'14px'}>
                  {session?.start_time} - {session?.end_time}
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <Button
            text={session?.has_checked_in ? 'Mark as Completed' : 'Check In'}
            width={226}
            isLoading={isCheckInLoading || isCheckOutLoading}
            isDisabled={
              !session?.has_checked_in &&
              new Date().getTime() <
                new Date(session?.date + ' ' + session?.start_time).getTime()
            }
            bg={session?.has_checked_in ? '#048E12' : '#0065FF'}
            onClick={() => {
              if (session?.has_checked_in) {
                if (isNearingEnd) {
                  checkOut(session?.id);
                } else {
                  onOpen2();
                }
              } else {
                checkIn(session?.id);
              }
            }}
          />
        </Box>

        <Box
          bg="#fff"
          borderRadius={'15px'}
          boxShadow={'0px 0px 10px 0px rgba(0, 0, 0, 0.1)'}
          p={5}
          display={'flex'}
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          flexDirection={'column'}
          gap={10}
          mt={10}
        >
          <HStack alignItems={'flex-start'} gap={5}>
            <Image src="/images/four.svg" alt="five" width={5} height={5} />
            <VStack alignItems={'flex-start'}>
              <Text color="#000000" fontSize={'16px'} fontWeight={700}>
                Dr. James
              </Text>
              <Text color="#000000" fontSize={'14px'}>
                Is the Tutor available?
              </Text>
            </VStack>
          </HStack>
          <HStack gap={5} alignItems={'center'} w={'full'}>
            <HStack
              bg="#B5B5B5"
              borderRadius={'10px'}
              p={4}
              flexDirection={'row'}
              alignItems={'center'}
              gap={2}
              flex={1}
              justifyContent={'center'}
              onClick={() => {
                tutorCheckIn({
                  id: session?.id,
                  body: {
                    tutor_available: false,
                  },
                });
              }}
            >
              <IoCloseOutline color="#fff" />
              <Text color="#ffffff" fontSize={'16px'} fontWeight={700}>
                Waiting for Tutor
              </Text>
            </HStack>
            <HStack
              borderRadius={'10px'}
              p={4}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={2}
              bg="#0065FF"
              flex={1}
              cursor={'pointer'}
              onClick={() => {
                tutorCheckIn({
                  id: session?.id,
                  body: {
                    tutor_available: true,
                  },
                });
              }}
            >
              <IoCheckmarkOutline color="#fff" />
              <Text color="#ffffff" fontSize={'16px'} fontWeight={700}>
                Tutor has arrived
              </Text>
            </HStack>
          </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalBody
              alignItems={'center'}
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
              gap={5}
            >
              <Image
                src="/images/five.svg"
                alt="five"
                width={10}
                height={10}
                alignSelf={'center'}
              />
              <Text fontSize={'33px'} fontWeight={900} color="#00190B">
                {elapsedTime}
              </Text>
              <Text fontSize={'23px'} fontWeight={500} color="#000000">
                Tutor Availability
              </Text>
            </ModalBody>
            <ModalFooter>
              <HStack gap={10} w={'full'}>
                <Button
                  text="Absent"
                  borderRadius={10}
                  width={'full'}
                  border="#5F5F5F"
                  bg="#fff"
                  color="#5F5F5F"
                  onClick={() => {
                    tutorCheckIn({
                      id: session?.id,
                      body: {
                        tutor_available: false,
                      },
                    });
                  }}
                />
                <Button
                  text="Present"
                  borderRadius={10}
                  width={'full'}
                  bg="#0065FF"
                  onClick={() => {
                    tutorCheckIn({
                      id: session?.id,
                      body: {
                        tutor_available: true,
                      },
                    });
                  }}
                />
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpen2} onClose={onClose2} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalBody
              alignItems={'center'}
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
              gap={5}
            >
              <Text fontSize={'32px'} fontWeight={500} color="#00190B">
                {session?.title}
              </Text>
              <Text fontSize={'23px'} fontWeight={500} color="#000000">
                Dr. James
              </Text>
              <Image
                src="/images/five.svg"
                alt="five"
                width={10}
                height={10}
                alignSelf={'center'}
              />
              <Text fontSize={'33px'} fontWeight={900} color="#00190B">
                {remainingTime}
              </Text>
              <Text fontSize={'23px'} fontWeight={500} color="#000000">
                Time Left
              </Text>
            </ModalBody>
            <ModalFooter>
              <HStack gap={10} w={'full'}>
                <Button
                  text="Check Out"
                  borderRadius={10}
                  width={'full'}
                  onClick={() => {
                    if (isNearingEnd) {
                      checkOut(session?.id);
                    }
                  }}
                  isLoading={isCheckOutLoading}
                  isDisabled={!isNearingEnd}
                  border={
                    isNearingEnd ? '1px solid #5F5F5F' : '1px solid #5F5F5F'
                  }
                  bg={isNearingEnd ? '#048E12' : '#fff'}
                  color={isNearingEnd ? '#fff' : '#5F5F5F'}
                />
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <FeedbackModal
          isOpen={isOpenJoin}
          onClose={onCloseJoin}
          session_id={id}
          isJoinLoading={isLoading}
          isDisabled={false}
          type="home"
          joinMeeting={(id: string) => {
            console.log(id, 'id');
          }}
        />
      </Stack>
    </TutorContainer>
  );
};

export default index;
