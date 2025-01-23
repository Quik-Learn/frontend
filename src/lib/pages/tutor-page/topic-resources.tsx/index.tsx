'use client';
import React from 'react';

import {
  Heading,
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  VStack,
  Image,
  Card,
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import Button from '~/lib/components/ui/button';
import TutorContainer from '~/lib/layout/TutorContainer';
import SuccessModal from '~/lib/components/ui/success-modal';
import AddTopic from '~/lib/components/AddTopic';
import { BsEasel } from 'react-icons/bs';
import useGetResources from './getResources';
import { PiFileArrowUpLight } from 'react-icons/pi';
import { TbFileSearch } from 'react-icons/tb';
import AddResources from '~/lib/components/AddResources';

const TopicResources = () => {
  const { topicId }: any = useParams();
  const router = useRouter();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    onOpen: onOpenn,
    isOpen: isOpenn,
    onClose: onClosee,
  } = useDisclosure();
  const {
    resources,
    isLoading,
    topic,
    createResource,
    createLoading,
    isSuccess,
  } = useGetResources(topicId, () => {
    onClose();
    onOpenn();
  });
  const onOpenHandler = (topic: any) => {
    if (topic?.attachment) {
      // Create a direct link to download
      const link = document.createElement('a');
      link.href = topic.attachment;

      // Get filename from URL or use topic name
      const fileName =
        topic.topic || topic.attachment.split('/').pop() || 'document';
      link.setAttribute('download', fileName);

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('No attachment available');
    }
  };
  return (
    <TutorContainer>
      <Stack p={{ base: 4, md: 6 }}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Text
            fontSize={{ base: '16px', md: '20px' }}
            fontWeight={700}
            color={'#1D2026'}
          >
            {topic}
          </Text>
        </HStack>
        {isLoading ? (
          <Skeleton w={'100%'} h={'207px'}></Skeleton>
        ) : (
          <>
            {resources?.length === 0 ? (
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
                  NO DATA
                </Heading>
                <Text fontSize={'16px'} fontWeight={400} color={'#4F4F4F'}>
                  You have no Resources under this topic yet
                </Text>
              </Stack>
            ) : (
              <Stack mt={10}>
                <SimpleGrid
                  spacing={4}
                  columns={{ base: 1, md: 2, lg: 4 }}
                  alignItems={'center'}
                  justifyContent={'center'}
                  w={'100%'}
                >
                  <Card
                    boxShadow={'0px 0px 10px 0px rgba(0, 0, 0, 0.1)'}
                    cursor={'pointer'}
                    onClick={onOpen}
                    bg="white"
                    p={4}
                    alignItems={'center'}
                    justifyContent={'center'}
                    maxWidth={'230px'}
                    h={'230px'}
                    w={{ base: '100%', md: '230px' }}
                  >
                    <Image
                      src={'/images/addres.png'}
                      width={'100px'}
                      height={'100px'}
                      objectFit="contain"
                    />
                    <Text mt={4} fontSize={'16px'} fontWeight={500}>
                      Upload New Resources
                    </Text>
                  </Card>
                  {resources?.map((topic: any) => (
                    <VStack
                      alignItems={'center'}
                      justifyContent={'center'}
                      key={topic?.id}
                      onClick={() => window.open(topic?.attachment, '_blank')}
                      maxWidth={'250px'}
                      boxShadow={'0px 0px 10px 0px rgba(0, 0, 0, 0.1)'}
                      w={{ base: '100%', md: '230px' }}
                      h={'230px'}
                      cursor="pointer"
                    >
                      <VStack
                        alignItems={'center'}
                        bg="#EFEFEF"
                        p={4}
                        w={'100%'}
                        justifyContent={'center'}
                        gap={2}
                        h={'190px'}
                      >
                        <Image src={'/images/filesearch.png'} />
                        <Text>{topic?.media_type}</Text>
                      </VStack>
                      <Text>{topic?.title || ' No Topic'}</Text>
                    </VStack>
                  ))}
                </SimpleGrid>
              </Stack>
            )}
          </>
        )}
      </Stack>
      <SuccessModal
        onClose={() => {
          onClosee();
          // fetchData();
        }}
        isOpen={isOpenn}
        title={'Successful'}
        description={'Resource added Successfully'}
        buttonText={'Close'}
      />
      <AddResources
        isOpen={isOpen}
        onClose={onClose}
        createResource={createResource}
        createLoading={createLoading}
        isSuccess={isSuccess}
      />
    </TutorContainer>
  );
};

export default TopicResources;
