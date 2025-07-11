'use client';
import {
  Heading,
  HStack,
  VStack,
  Box,
  Text,
  Icon,
  Stack,
  useDisclosure,
  ModalHeader,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { TfiEmail } from 'react-icons/tfi';
import React, { useEffect, useState } from 'react';
import TutorContainer from '~/lib/layout/TutorContainer';
import {
  useLazyGetANotificationQuery,
  useLazyGetNotificationsQuery,
} from '~/lib/services/user-service';
import moment from 'moment';
import Button from '~/lib/components/ui/button';
import { FiBell } from 'react-icons/fi';
import { useToast } from '@chakra-ui/react';
import Loader from '~/lib/components/Loader';
const TutorNotifications = () => {
  const toast = useToast();
  const [selected, setSelected] = useState('All');
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [notifications, setNotifications] = useState<any[]>([]);

  const [getNotifications, { isLoading, isSuccess, data, isError, error }] =
    useLazyGetNotificationsQuery();
  const [
    getANotification,
    {
      isLoading: isLoadingNotification,
      isSuccess: isSuccessNotification,
      data: notificationData,
      isError: isErrorNotification,
      error: notificationError,
      reset: resetNotification,
    },
  ] = useLazyGetANotificationQuery();
  useEffect(() => {
    if (isSuccessNotification) {
      onOpen();
      setSelectedNotification(notificationData?.data);
      setTimeout(() => {
        resetNotification();
      }, 1000);
    }
    if (isErrorNotification) {
      toast({
        title: 'Error',
        description: error?.data?.message || 'Something went wrong',
        status: 'error',
      });
    }
  }, [isSuccessNotification, isErrorNotification, notificationError]);
  useEffect(() => {
    if (isSuccess) {
      setNotifications(data?.data);
    }

    if (isError) {
      toast({
        title: 'Error',
        description: error?.data?.message || 'Something went wrong',
        status: 'error',
      });
    }
  }, [isSuccess, isError, error]);
  useEffect(() => {
    getNotifications({});
  }, []);
  return (
    <TutorContainer>
      <Stack p={10}>
        <Heading mb={3} fontWeight={700} fontSize={['28px', '32px']}>
          Notifications
        </Heading>
        {(isLoadingNotification || isLoading) && <Loader />}
        {/* <HStack>
          <Button
            bg={selected === 'All' ? '#555555' : '#BDBDBD'}
            color={'white'}
            borderRadius={10}
            fontSize={['12px', '14px']}
            fontWeight={700}
            onClick={() => setSelected('All')}
          >
            All
          </Button>
          <Button
            bg={selected === 'Unread' ? '#555555' : '#BDBDBD'}
            color={'white'}
            borderRadius={10}
            fontWeight={700}
            fontSize={['12px', '14px']}
            onClick={() => setSelected('Unread')}
          >
            Unread
          </Button>
        </HStack> */}
        <VStack spacing={4} align="stretch" w="100%" mt={6}>
          {notifications.length === 0 && (
            <Stack align="center" justify="center" h="200px" w="100%">
              <Text fontSize={['16px', '28px']} color="#6E7485">
                No notifications found
              </Text>
            </Stack>
          )}
          {notifications.map((item) => (
            <HStack
              key={item?.id}
              p={4}
              bg="white"
              borderRadius="md"
              boxShadow="sm"
              spacing={4}
              onClick={() => {
                setSelectedNotification(item);

                getANotification(item?.id);
              }}
            >
              <Box w={6} h={6} borderRadius={'10px'} bg="#FF8C00"></Box>

              <VStack align="flex-start" flex={1}>
                <Text fontWeight={700} fontSize={['16px', '18px']}>
                  {item?.description}
                </Text>
                <Text fontSize={['20px', '24px']}>{item?.message}</Text>
              </VStack>

              <VStack align="flex-end" spacing={1}>
                <Text fontWeight={700} fontSize={['16px', '18px']}>
                  {moment(item?.created_at).utc().format('hh:mm A')}
                </Text>
                <Text fontSize={['14px', '16px', '18px']}>
                  {moment(item?.created_at).utc().format('MMM DD, YYYY')}
                </Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Notification</ModalHeader>
            <ModalBody>
              <Text>{selectedNotification?.description}</Text>
              <Text>{selectedNotification?.message}</Text>
              <Text>
                {moment(selectedNotification?.created_at)
                  .utc()
                  .format('MMM DD, YYYY')}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} text="Close" />
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>
    </TutorContainer>
  );
};

export default TutorNotifications;
