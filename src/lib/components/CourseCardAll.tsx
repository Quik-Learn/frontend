import {
  Box,
  Heading,
  HStack,
  Icon,
  VStack,
  Text,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import { FiClock } from 'react-icons/fi';
import { PiStudent } from 'react-icons/pi';

const CourseCardAll = ({
  title,
  description,
  imageSrc,
  duration,
  learners,
  router,
  id,
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
    onClick={() => router.push(`/student/courses/${id}`)}
  >
    <Image src={imageSrc} alt={title} w="154px" h={'100%'} objectFit="cover" />
    <VStack p={4} align="center" justify={'center'} gap={4} h={'100%'}>
      <Heading fontSize={13} fontWeight="medium" color={'black'}>
        {title}
      </Heading>

      <HStack justifyContent="space-between" w={'100%'}>
        <HStack spacing={1} justifyContent={'center'} alignItems={'center'}>
          <Icon as={FiClock} size={'sm'} color={'#4D4C5C'} />
          <Text fontSize={10} color="#4D4C5C" fontWeight="semibold">
            {duration}
          </Text>
        </HStack>
        <HStack spacing={1} justifyContent={'center'} alignItems={'center'}>
          <Icon as={PiStudent} color={'#4D4C5C'} />

          <Text fontSize={10} color="#4D4C5C" fontWeight="semibold">
            {learners} Students
          </Text>
        </HStack>
      </HStack>
    </VStack>
  </Box>
);

export default CourseCardAll;
