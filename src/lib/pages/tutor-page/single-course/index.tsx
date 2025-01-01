'use client';

import {
  Heading,
  HStack,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import Button from '~/lib/components/ui/button';
import TutorContainer from '~/lib/layout/TutorContainer';
import useSingleCourseHook from './useSingleCourse.hook';
import SuccessModal from '~/lib/components/ui/success-modal';
import AddTopic from '~/lib/components/AddTopic';
import { BsEasel } from 'react-icons/bs';
const SingleCourse = () => {
  const { id }: any = useParams();
  const router = useRouter();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    onOpen: onOpenn,
    isOpen: isOpenn,
    onClose: onClosee,
  } = useDisclosure();
  const {
    course,
    isLoading,
    fetchData,
    createTopicFunction,
    createLoading,
    isSuccess,
    subject,
  } = useSingleCourseHook(id, () => {
    onClose();
    onOpenn();
  });

  return (
    <TutorContainer>
      <Stack p={{ base: 4, md: 6 }}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Text
            fontSize={{ base: '16px', md: '20px' }}
            fontWeight={700}
            color={'#1D2026'}
          >
            {subject}
          </Text>
          <Button
            width={203}
            onClick={onOpen}
            bg={'#0177FB'}
            text="Create Topic"
          />
        </HStack>
        {isLoading ? (
          <Skeleton w={'100%'} h={'207px'}></Skeleton>
        ) : (
          <>
            {course?.length === 0 ? (
              <Stack
                w={'100%'}
                h={'60vh'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Heading
                  fontSize={{ base: 28, md: 37 }}
                  fontWeight={700}
                  color={'#4F4F4F'}
                >
                  Create a Topic
                </Heading>
                <Text fontSize={'16px'} fontWeight={400} color={'#4F4F4F'}>
                  You have no Topic under this course yet
                </Text>
              </Stack>
            ) : (
              <Stack mt={10}>
                <HStack
                  bg={'#DEDEDE'}
                  p={4}
                  mb={4}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  w={'100%'}
                >
                  <Text fontWeight={500} fontSize={{ base: 16, md: 20 }}>
                    Topics
                  </Text>
                  <Text fontWeight={500} fontSize={{ base: 16, md: 20 }}>
                    Action
                  </Text>
                </HStack>
                <Stack gap={4}>
                  {course?.map((topic: any) => (
                    <HStack
                      bg={'white'}
                      p={4}
                      key={topic?.id}
                      justifyContent={'space-between'}
                      borderRadius={5}
                      boxShadow={'sm'}
                    >
                      <Image src={'/images/topic.png'} />
                      <Text
                        fontSize={{ base: 16, md: 20 }}
                        flex={1}
                        color={'#5F5F5F'}
                      >
                        {topic?.title}
                      </Text>
                      <Button
                        width={140}
                        text="Resources"
                        bg="#979797"
                        onClick={() => {
                          router.push(`/tutor/resources/${id}/${topic?.id}`);
                        }}
                      />
                    </HStack>
                  ))}
                </Stack>
              </Stack>
            )}
          </>
        )}

        <SuccessModal
          onClose={() => {
            onClosee();
            fetchData();
          }}
          isOpen={isOpenn}
          title={'Successful'}
          description={'Topic created Successfully'}
          buttonText={'Close'}
        />
        <AddTopic
          isOpen={isOpen}
          onClose={onClose}
          createTopic={createTopicFunction}
          createLoading={createLoading}
          isSuccess={isSuccess}
        />
      </Stack>
    </TutorContainer>
  );
};

export default SingleCourse;
