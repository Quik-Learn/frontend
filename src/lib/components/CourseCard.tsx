import {
  Box,
  Heading,
  HStack,
  Icon,
  VStack,
  Text,
  Image,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { FiClock } from 'react-icons/fi';
import ProgressBar from './ui/progress-bar';
import { BsPersonVideo3 } from 'react-icons/bs';

const CourseCard = ({
  title,
  total_sessions,
  imageSrc,
  completed_sessions,
  instructor,
  router,
  id,
  activeTab,
}: any) => (
  <Box
    borderRadius="md"
    display={'flex'}
    boxShadow="md"
    overflow="hidden"
    bg="white"
    mb={10}
    h={176}
    gap={5}
    p={2}
    onClick={() => router.push(`/student/courses/${id}?activeTab=${activeTab}`)}
  >
    <Image src={imageSrc} alt={title} w="154px" h={'100%'} objectFit="cover" />
    <VStack justify={'center'} gap={4} h={'100%'}>
      <Heading fontSize={13} fontWeight="medium" color={'black'}>
        {title}
      </Heading>

      <HStack justifyContent="space-between" w={'100%'}>
        <HStack
          spacing={1}
          justifyContent={'center'}
          alignItems={'center'}
          w={'20%'}
        >
          <Icon as={FiClock} size={'sm'} color={'#4D4C5C'} />
          <Text fontSize={10} color="#4D4C5C" fontWeight="semibold">
            {completed_sessions}/{total_sessions}
          </Text>
        </HStack>
        <HStack
          spacing={1}
          justifyContent={'center'}
          alignItems={'center'}
          w={'80%'}
        >
          <Icon as={BsPersonVideo3} color={'#4D4C5C'} />

          <Text fontSize={8} color="#4D4C5C" fontWeight="semibold">
            {instructor}
          </Text>
        </HStack>
      </HStack>
      <Stack w={'100%'} justifyContent={'center'}>
        <ProgressBar
          firstPercentage={`${(completed_sessions / total_sessions) * 100}%`}
          secondPercentage={`${(total_sessions / total_sessions) * 100}%`}
          bg1="#D9D9D9"
        />
      </Stack>
    </VStack>
  </Box>
);

export default CourseCard;
