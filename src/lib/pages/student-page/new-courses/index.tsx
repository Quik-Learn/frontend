'use client';

import {
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Box,
  Heading,
  Icon,
  Spinner,
  IconButton,
} from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';
import { IoIosClose } from 'react-icons/io';
import { FiClock } from 'react-icons/fi';
import { PiStudent } from 'react-icons/pi';
import ParentContainer from '~/lib/layout/ParentContainer';
import { useRouter } from 'next/navigation';
import useGetCourses from './getCourses';
import Pagination from '~/lib/components/ui/pagination';
import { useEffect, useState } from 'react';
import Loader from '~/lib/components/Loader';

const NewCourses = () => {
  const router = useRouter();
  const [text, setText] = useState('');
  const [baseSubject, setBaseSubject] = useState('');
  const {
    courses,
    next,
    previous,
    isLoading,
    getSubjects,
    total_pages,
    currentPage,
    fetchCourses,
    baseSubjectData,
  } = useGetCourses();
  console.log(courses, 'courses');

  useEffect(() => {
    // Fetch courses with default filters when the component mounts
    fetchCourses({ Name: text, base_subject: baseSubject });
  }, [text, baseSubject]); // Trigger fetch when filters change

  const CourseCard = ({
    title,
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
      onClick={() => router.push(`/student/book-session/${id}`)}
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
  console.log(baseSubjectData);
  return (
    <ParentContainer>
      <Text color={'black'} m={6} fontSize={'26px'} fontWeight={500}>
        Book A Session
      </Text>

      <Text mx={6} color={'#5F5F5F'} fontSize={20}>
        To book a Session, first Select a course!
      </Text>

      {isLoading ? (
        <Loader />
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
                  fontSize={14}
                  borderRadius={10}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
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
                  border="none"
                />

                <InputRightElement width="4.5rem">
                  {text?.length > 1 ? (
                    <IconButton
                      icon={<IoIosClose />}
                      aria-label="clear-text"
                      onClick={() => setText('')}
                    />
                  ) : (
                    <Icon as={CiSearch} />
                  )}
                </InputRightElement>
              </InputGroup>
            </GridItem>{' '}
            <GridItem borderRadius={10} flex={1} colSpan={1}>
              <InputGroup
                color="#1D2026"
                _placeholder={{ color: '#8C94A3' }}
                borderRadius={10}
                borderWidth={1}
                borderColor="#F1F1F3"
              >
                <Select
                  placeholder={'Select Base Subject'}
                  fontSize={14}
                  borderRadius={10}
                  width={'100%'}
                  value={baseSubject}
                  onChange={(e) => setBaseSubject(e.target.value)}
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
                  border="none"
                >
                  {baseSubjectData?.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
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
        onPageChange={(page: number) => getSubjects({ page_size: page })} // Optional: Callback if you need to handle page change externally
      />
    </ParentContainer>
  );
};

export default NewCourses;
