'use client';

import {
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  VStack,
  useDisclosure,
  HStack,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
  Box,
  Heading,
  Icon,
  Tooltip,
  List,
  ListItem,
  ListIcon,
  Button as ChakraButton,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FiClock } from 'react-icons/fi';
import * as yup from 'yup';
import { PiStudent } from 'react-icons/pi';
import { LuDot } from 'react-icons/lu';
import ParentContainer from '~/lib/layout/ParentContainer';
import { coursesArray } from '~/lib/utils/nav';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useGetSubjectsQuery } from '~/lib/services/user-service';
import useGetCourses from './getCourses';
import { baseUrl } from '~/lib/services/parent-mutation';
import Pagination from '~/lib/components/ui/pagination';

const Courses = () => {
  const router = useRouter();
  const {
    courses,
    count,
    next,
    previous,
    isLoading,
    getSubjects,
    total_pages,
    currentPage,
  } = useGetCourses();
  console.log(courses, 'courses');

  const CourseCard = ({
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
      onClick={() => router.push(`/parent/courses/${id}`)}
    >
      <Image
        src={imageSrc}
        alt={title}
        w="154px"
        h={'100%'}
        objectFit="cover"
      />
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

  return (
    <ParentContainer>
      <HStack p={4} bg={'#fff'} borderRadius={'14px'} m={6}>
        <Text color={'black'} fontSize={'26px'} fontWeight={500}>
          All Courses
        </Text>
      </HStack>
      {isLoading ? (
        <Stack
          w={'100%'}
          h={'350px'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Spinner size={'large'} />
        </Stack>
      ) : (
        <>
          <Grid templateColumns="repeat(4, 1fr)" w={'100%'} gap={4} m={6}>
            <GridItem borderRadius={10} flex={1} colSpan={2}>
              <InputGroup
                color="#1D2026"
                _placeholder={{ color: '#8C94A3' }}
                bg="#fff"
                borderRadius={10}
                borderWidth={1}
                borderColor="#F1F1F3"
              >
                <Input
                  placeholder={'Enter a course title'}
                  value={''}
                  fontSize={14}
                  borderRadius={10}
                  pl={10}
                  _active={{
                    border: 'none',
                    outlineColor: 'transparent',
                    outline: 0,
                  }}
                  _focus={{
                    border: 'none',
                    outlineColor: 'transparent',
                    outline: 0,
                  }}
                  onChange={(e) => {
                    console.log(e);
                  }}
                  border="none"
                />
                <InputRightElement width="4.5rem">
                  <Icon as={CiSearch} />
                </InputRightElement>
              </InputGroup>
            </GridItem>{' '}
            <GridItem borderRadius={10} flex={1} colSpan={1}>
              <InputGroup
                color="#1D2026"
                _placeholder={{ color: '#8C94A3' }}
                bg="#fff"
                borderRadius={10}
                borderWidth={1}
                borderColor="#F1F1F3"
              >
                <Select
                  placeholder={'Search'}
                  value={'K2 - K5'}
                  fontSize={14}
                  borderRadius={10}
                  pl={10}
                  _active={{
                    border: 'none',
                    outlineColor: 'transparent',
                    outline: 0,
                  }}
                  _focus={{
                    border: 'none',
                    outlineColor: 'transparent',
                    outline: 0,
                  }}
                  onChange={(e) => console.log(e)}
                  border="none"
                />
              </InputGroup>
            </GridItem>
          </Grid>
          <Box m={6}>
            <Grid
              templateColumns={{
                base: '90vw',
                lg: 'repeat(auto-fill, minmax(300px, 1fr))',
              }}
              gap={4}
            >
              {courses?.map((course: any, index: number) => (
                <GridItem key={index}>
                  <CourseCard
                    title={course?.title}
                    description={course?.short_description}
                    imageSrc={course?.thumbnail}
                    duration={course?.lesson_hours}
                    learners={course?.learners}
                    router={router}
                    id={course?.id}
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>
        </>
      )}

      <Pagination
        totalPages={total_pages}
        isLoading={isLoading}
        currentPage={currentPage}
        next={next}
        previous={previous}
        onPageChange={(page: number) => getSubjects(page)} // Optional: Callback if you need to handle page change externally
      />
    </ParentContainer>
  );
};

export default Courses;
