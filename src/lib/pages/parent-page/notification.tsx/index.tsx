'use client';
import {
  Button,
  Heading,
  HStack,
  VStack,
  Box,
  Text,
  Icon,
  Stack,
} from '@chakra-ui/react';
import { TfiEmail } from 'react-icons/tfi';
import React, { useEffect, useState } from 'react';
import ParentContainer from '~/lib/layout/ParentContainer';
import { useLazyGetNotificationsQuery } from '~/lib/services/user-service';
import moment from 'moment';

const Notifications = () => {
  const [selected, setSelected] = useState('All');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [getNotifications, { isLoading }] = useLazyGetNotificationsQuery();
  useEffect(() => {
    getNotifications({}).then((res) => {
      console.log(res.data);
      setNotifications(res.data?.data || []);
    });
  }, []);
  return (
    <ParentContainer>
      <Stack p={10}>
        <Heading mb={3} fontWeight={700} fontSize={['28px', '32px']}>
          Notifications
        </Heading>
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
          {notifications.map((item) => (
            <HStack
              key={item?.id}
              p={4}
              bg="white"
              borderRadius="md"
              boxShadow="sm"
              spacing={4}
            >
              <Box w={6} h={6} borderRadius={'10px'} bg="#FF8C00"></Box>

              <VStack align="flex-start" flex={1}>
                <Text fontSize={['20px', '24px']}>New Course Available</Text>
                <Text fontSize={['20px', '24px']}>{item?.description}</Text>
              </VStack>

              <VStack align="flex-end" spacing={1}>
                <Text fontSize={['14px', '16px', '18px']}>
                  {moment(item?.created_at).format('hh:mm A')}
                </Text>
                <Text fontSize={['14px', '16px', '18px']}>
                  {moment(item?.created_at).format('MMM DD, YYYY')}
                </Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </Stack>
    </ParentContainer>
  );
};

export default Notifications;
