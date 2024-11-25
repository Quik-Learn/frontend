'use client';

import React, { useEffect, useState } from 'react';
import { useLazyGetPastSessionsQuery } from '../services/student-mutation';
import { Session } from '../types/data';
import { FaPlay } from 'react-icons/fa';
import { FaFileVideo } from 'react-icons/fa';
import {
  Stack,
  VStack,
  Text,
  Icon,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import { FcVideoFile } from 'react-icons/fc';
import { usePastSessions } from '../hooks/usePastSession';
const PastSessions = () => {
  const { pastSessions, isLoading } = usePastSessions();
  return (
    <div>
      <VStack spacing={4} align="stretch" w="100%">
        {isLoading && (
          <Stack align="center" justify="center" h="200px" w="100%">
            <Spinner size="xl" color="blue.500" />
          </Stack>
        )}
        {pastSessions?.map((session: Session) => (
          <Stack
            key={session.id}
            direction="row"
            align="center"
            spacing={4}
            p={4}
            bg={'white'}
            borderRadius="lg"
          >
            <Icon as={FcVideoFile} boxSize={6} color="gray.500" />
            <VStack align="flex-start" flex={1}>
              <Text fontWeight="bold">{session.title}</Text>
              <Text fontSize="sm" color="gray.600">
                {session.instructor.name}
              </Text>
            </VStack>
            {session?.meeting_link && (
              <IconButton
                aria-label="Play video"
                icon={<FaPlay />}
                colorScheme="blue"
                variant="ghost"
                onClick={() =>
                  session.meeting_link &&
                  window.open(session.meeting_link, '_blank')
                }
              />
            )}
          </Stack>
        ))}
      </VStack>
      {/* {pastSessions?.map((item: any) => (
        <div key={item?.id}>{item?.title}</div>
      ))} */}
    </div>
  );
};

export default PastSessions;
