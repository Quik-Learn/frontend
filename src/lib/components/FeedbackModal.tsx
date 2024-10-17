'use client';

import React, { useEffect, useState } from 'react';
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
import Rating from './Rating';
import Button from './ui/button';
import { RiHomeSmile2Line } from 'react-icons/ri';
import { TiArrowForwardOutline } from 'react-icons/ti';
import RatingInput from './RatingInput';
import { useFeedbackMutation } from '../services/student-mutation';
import { useRouter } from 'next/navigation';
const FeedbackModal = ({
  isOpen,
  onClose,
  joinMeeting,
  session_id,
  isJoinLoading,
  isDisabled,
}: any) => {
  const toast = useToast();
  const id = localStorage.getItem('meetingId');
  const router = useRouter();
  const [rate, setRate] = useState<number>(0); // Track the rating
  const [text, setText] = useState<string>(''); // Track the rating
  const [feedback, { data, isSuccess, isError, error, reset, isLoading }] =
    useFeedbackMutation();
  const handleClick = (rating: number) => {
    setRate(rating); // Update the rating when a star is clicked
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
      router.push('/student/my-sessions');
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
  }, [isSuccess, isError, error]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
            <RatingInput rate={rate} handleClick={handleClick} />
            <Text
              mb="2px"
              textAlign={'left'}
              alignSelf={'flex-start'}
              color={'#6B7280'}
            >
              Additional feedback
            </Text>
            <Textarea
              value={text}
              onChange={(e) => setText(e?.target?.value)}
              placeholder="My feedback!!"
              size="sm"
              w={'100%'}
              fontSize={14}
              color={'black'}
              bgColor={'#f2f2f2'}
            />

            <Button
              width={'100%'}
              bg={'#02659C'}
              text="Submit feedback"
              my={5}
              isLoading={isLoading}
              onClick={() =>
                feedback({ session_id, body: { rating: rate, review: text } })
              }
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
                onClick={() => router.push('/student')}
              />
              <Button
                width={'100%'}
                bg={'#fff'}
                text="Rejoin session"
                my={5}
                isLoading={isJoinLoading}
                isDisabled={false}
                border="#D0D5DD"
                icon={<TiArrowForwardOutline color="#9CA3AF" />}
                color="#344054"
                onClick={() => {
                  joinMeeting(id);
                  onClose();
                }}
                borderRadius={11}
                variant="outline"
              />
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FeedbackModal;
