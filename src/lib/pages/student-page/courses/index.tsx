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
  Button as ChakraButton,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import { PiStudent } from 'react-icons/pi';
import ParentContainer from '~/lib/layout/ParentContainer';

import { useRouter } from 'next/navigation';
import useGetCourses from './getCourses';
import Pagination from '~/lib/components/ui/pagination';
import CourseCard from '~/lib/components/CourseCard';
import CourseCardAll from '~/lib/components/CourseCardAll';

const Courses = () => {
  const router = useRouter();
  const {
    courses,
    next,
    previous,
    isLoading,
    getSubjects,
    total_pages,
    current_page,
    getActiveCourses,
    getCompletedCourses,
    setCourses,
  } = useGetCourses();

  const [activeTab, setActiveTab] = useState('all'); // Default is all courses

  // Fetch courses based on the active tab
  const fetchCourses = useCallback((page: number, active: string) => {
    switch (active) {
      case 'active':
        getActiveCourses({ page_size: page });
        break;
      case 'completed':
        getCompletedCourses({ page_size: page });
        break;
      default:
        getSubjects({ page_size: page });
    }
  }, []);

  useEffect(() => {
    fetchCourses(1, activeTab); // Fetch the data when the tab changes
  }, [activeTab, fetchCourses]);

  console.log(courses);
  return (
    <ParentContainer>
      <Tabs
        w={'100%'}
        mt={8}
        onChange={(index) => {
          const tabs = ['all', 'active', 'completed'];
          setCourses([]);
          setActiveTab(tabs[index]);
        }}
      >
        <TabList border={'none'}>
          <Tab
            fontSize={{
              base: 16,
              sm: 18,
              md: 18,
            }}
            value="all"
            _selected={{
              color: '#FF8C00',
              borderBottomWidth: 2,
              borderColor: '#FF8C00',
            }}
            fontFamily="heading"
            fontWeight="500"
            color={'#5F5F5F'}
          >
            All Courses
          </Tab>
          <Tab
            fontSize={{
              base: 16,
              sm: 18,
              md: 18,
            }}
            _selected={{
              color: '#FF8C00',
              borderBottomWidth: 2,
              borderColor: '#FF8C00',
            }}
            value="active"
            fontFamily="heading"
            fontWeight="500"
            color={'#5F5F5F'}
          >
            Active Courses
          </Tab>
          <Tab
            fontSize={{
              base: 16,
              sm: 18,
              md: 18,
            }}
            _selected={{
              color: '#FF8C00',
              borderBottomWidth: 2,
              borderColor: '#FF8C00',
            }}
            value="completed"
            fontFamily="heading"
            fontWeight="500"
            color={'#5F5F5F'}
          >
            Completed Courses
          </Tab>
        </TabList>

        <TabPanels>
          <Box m={6}>
            {isLoading ? (
              <Stack w={'100%'} height={'50vh'}>
                {['', '', '', '', '', '', '', '', '', ''].map((item, index) => (
                  <Skeleton height="20px" key={index} />
                ))}
              </Stack>
            ) : (
              <Grid
                templateColumns={{
                  base: '90vw',
                  lg: 'repeat(auto-fill, minmax(300px, 1fr))',
                }}
                gap={4}
              >
                {courses?.length == 0 ? (
                  <Stack
                    w={'70vw'}
                    height={'50vh'}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <Heading>No Course Found!</Heading>
                  </Stack>
                ) : (
                  <>
                    {courses?.map((course: any, index: number) => (
                      <GridItem key={index}>
                        {activeTab === 'all' ? (
                          <CourseCardAll
                            title={course?.title}
                            description={course?.short_description}
                            imageSrc={course?.thumbnail}
                            duration={course?.lesson_hours}
                            learners={course?.learners}
                            router={router}
                            id={course?.id}
                          />
                        ) : (
                          <CourseCard
                            title={course?.title}
                            completed_sessions={course?.completed_sessions}
                            imageSrc={course?.thumbnail}
                            total_sessions={course?.total_sessions}
                            instructor={course?.instructor}
                            router={router}
                            id={course?.id}
                            activeTab={activeTab}
                          />
                        )}
                      </GridItem>
                    ))}
                  </>
                )}
              </Grid>
            )}
          </Box>
          <Pagination
            totalPages={total_pages}
            isLoading={isLoading}
            currentPage={current_page}
            next={next}
            previous={previous}
            onPageChange={(page: number) => fetchCourses(page, activeTab)}
          />
        </TabPanels>
      </Tabs>
    </ParentContainer>
  );
};

export default Courses;
