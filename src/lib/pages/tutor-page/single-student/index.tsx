'use client';

import {
  GridItem,
  Grid,
  HStack,
  Text,
  Icon,
  VStack,
  Box,
  Stack,
  Avatar,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { PiPencilSimpleLineFill } from 'react-icons/pi';
import CreateSession from '~/lib/components/CreateSession';
import Button from '~/lib/components/ui/button';
import useSingleStudent from './single-student';
import TutorContainer from '~/lib/layout/TutorContainer';
import {
  convertTo12HourFormat,
  convertTo12HourFormatt,
} from '~/lib/helpers/paths';
import moment from 'moment';
import { AiTwotoneDelete } from 'react-icons/ai';

const SingleStudent = () => {
  const { id }: { id: string } = useParams();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    onOpen: onEditOpen,
    isOpen: isEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    sessions,
    isLoading,
    createSession,
    createSessionLoading,
    editSession,
    editSessionLoading,
    deleteSession,
    deleteSessionLoading,
  } = useSingleStudent(id, onClose, onEditClose);

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const onOpenHandler = (day: string) => {
    setSelectedDay(day);

    onEditOpen();
  };
  console.log(sessions);
  return (
    <TutorContainer>
      <Stack p={[4, 8]}>
        <HStack justifyContent={'space-between'}>
          <HStack gap={2}>
            <Avatar size="md" />
            <Text color={'#303354'} fontSize={[16, 20]}>
              Kristin Watson
            </Text>
          </HStack>
          <Button
            text="Create New Session"
            bg="#0177FB"
            width={'242px'}
            onClick={onOpen}
          />
        </HStack>
        <Grid
          templateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']}
          gap={[4, 8]}
        >
          {sessions?.reverse()?.map((item: any) => (
            <GridItem key={item?.id} p={3} opacity={item?.isPast ? 0.5 : 1}>
              <HStack justifyContent="space-between" mb={2}>
                <Text fontSize={[12, 14]} color={'#303354'} fontWeight="bold">
                  {item?.day} - {moment(item?.date).format('ll')}
                </Text>
                <Icon as={BsThreeDots} />
              </HStack>
              <Box
                borderRadius={'10px'}
                bg={'white'}
                p={2}
                boxShadow={'0px 0px 10px 0px #0000000A'}
              >
                <HStack justifyContent="space-between" borderRadius="md">
                  <VStack>
                    <Text
                      fontSize={[12, 14]}
                      color={'#5F5F5F'}
                      fontWeight={700}
                    >
                      {convertTo12HourFormatt(item?.start_time)} -{' '}
                      {convertTo12HourFormatt(item?.end_time)}
                    </Text>
                    <Text fontSize={[12, 14]} color="#5F5F5F">
                      {item?.title}
                    </Text>
                  </VStack>
                  <VStack>
                    {!item?.isPast && (
                      <IconButton
                        icon={<PiPencilSimpleLineFill />}
                        color="#0A52A8"
                        bg="transparent"
                        variant="ghost"
                        aria-label="edit"
                        isLoading={editSessionLoading}
                        onClick={() => onOpenHandler(item)}
                      />
                    )}

                    {!item?.isPast && (
                      <IconButton
                        icon={<AiTwotoneDelete />}
                        color="#FF0002"
                        bg="transparent"
                        variant="ghost"
                        aria-label="delete"
                        isLoading={deleteSessionLoading}
                        onClick={() => deleteSession(item?.id)}
                      />
                    )}
                  </VStack>
                </HStack>
              </Box>
            </GridItem>
          ))}
        </Grid>
        <CreateSession
          isOpen={isOpen}
          onClose={onClose}
          createSession={createSession}
          createSessionLoading={createSessionLoading}
          id={id}
          type="Create"
        />
        <CreateSession
          isOpen={isEditOpen}
          onClose={onEditClose}
          createSession={editSession}
          createSessionLoading={editSessionLoading}
          id={id}
          data={selectedDay}
          type="Edit"
        />
      </Stack>
    </TutorContainer>
  );
};

export default SingleStudent;
