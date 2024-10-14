'use client';

import { Spinner, HStack, useDisclosure, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import FeedbackModal from '~/lib/components/FeedbackModal';
import ParentContainer from '~/lib/layout/ParentContainer';
import useDashboardHook from '../parent-page/parent/useDashboard';
import useProfileHook from '~/lib/hooks/useProfile';

const LeaveMeeting = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { type, isLoading } = useProfileHook();

  useEffect(() => {}, []);

  return (
    <ParentContainer>
      {isLoading ? (
        <HStack
          gap={5}
          w={'100%'}
          h={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Spinner size="xl" />
          <Text>Loading...</Text>
        </HStack>
      ) : null}
    </ParentContainer>
  );
};

export default LeaveMeeting;
