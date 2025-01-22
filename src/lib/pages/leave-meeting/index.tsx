'use client';

import {
  Spinner,
  HStack,
  useDisclosure,
  Text,
  Stack,
  Heading,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useProfileHook from '~/lib/hooks/useProfile';
import { useRouter } from 'next/navigation';
import { GetServerSideProps } from 'next';
import { requireAuthentication } from '~/lib/helpers/auth';

const LeaveMeeting = () => {
  const router = useRouter();
  const { type, isLoading, isSuccess } = useProfileHook();

  useEffect(() => {
    if (isSuccess) {
      if (type?.toLowerCase() === 'student') {
        router.push('/student/my-sessions?leaveMeeting=true');
      } else if (type?.toLowerCase() === 'tutor') {
        router.push('/tutor/my-sessions?leaveMeeting=true');
      }
    }
  }, [type, isSuccess]);

  return (
    <HStack w={'100vw'} h={'100vh'} bg={'#fff'}>
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
      ) : (
        <Stack
          w={'100%'}
          h={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Heading textAlign={'center'} color="black">
            {' '}
            You will be redirected shortly...
          </Heading>
        </Stack>
      )}
    </HStack>
  );
};

export default LeaveMeeting;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {},
    };
  }
);
