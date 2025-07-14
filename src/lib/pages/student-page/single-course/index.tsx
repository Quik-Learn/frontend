'use client';

import {
  Stack,
  Text,
  VStack,
  Heading,
  List,
  ListItem,
  ListIcon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast,
  useDisclosure,
  Spinner,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ParentContainer from '~/lib/layout/ParentContainer';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { FaCircleCheck } from 'react-icons/fa6';
import {
  useLazyGetACourseQuery,
  useLazyGetStudentCalenderQuery,
} from '~/lib/services/parent-mutation';
import PastSessions from '~/lib/components/PastSessions';
import Resources from '~/lib/components/Resources';
import Reviews from '~/lib/components/Reviews';
import Button from '~/lib/components/ui/button';
import {
  useBookSessionStudentMutation,
  useLazyGetAnCompletedCourseQuery,
  useLazyGetAnActiveCourseQuery,
  useLazyGetCalendarQuery,
} from '~/lib/services/student-mutation';
import BookSession from '~/lib/components/BookSession';
import { useAppSelector } from '~/lib/store';
import { FiArrowLeft } from 'react-icons/fi';
import { userState } from '~/lib/store/reducers/user-slice';
import CourseSessions from '~/lib/components/CourseSessions';
import Loader from '~/lib/components/Loader';

const SingleCourses = () => {
  const router = useRouter();
  const { id }: any = useParams();
  const searchParams = useSearchParams();
  const type = searchParams?.get('activeTab');
  const toast = useToast();
  const [studentCalenderData, setStudentCalenderData] = useState<any>([]);
  const [courseData, setCourseData] = useState<any>([]);
  const user = useAppSelector(userState);
  const [trigger, { data, isLoading, isError, error, isSuccess }] =
    useLazyGetACourseQuery();
  const [
    triggerActive,
    {
      data: activeData,
      isLoading: activeLoading,
      isError: isactiveError,
      error: activeError,
      isSuccess: activeSuccess,
    },
  ] = useLazyGetAnActiveCourseQuery();
  const [
    triggerCompleted,
    {
      data: completedData,
      isLoading: completedLoading,
      isError: iscompletedError,
      error: completedError,
      isSuccess: completedSuccess,
    },
  ] = useLazyGetAnCompletedCourseQuery();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [
    bookSession,
    {
      isLoading: isLoadingBook,
      isError: isErrorBook,
      error: errorBook,
      isSuccess: isSuccessBook,
    },
  ] = useBookSessionStudentMutation();
  const [
    getStudentCalender,
    {
      data: studentCalender,
      isSuccess: isSuccessCalender,
      isError: isErrorCalender,
      isLoading: isLoadingCalender,
    },
  ] = useLazyGetCalendarQuery();
  useEffect(() => {
    if (type === 'all') {
      trigger(id);
    } else if (type === 'active') {
      triggerActive(id);
    } else if (type === 'completed') {
      triggerCompleted(id);
    }
    getStudentCalender(id);
  }, [id, type]);
  useEffect(() => {
    if (isSuccess) {
      setCourseData(data?.data);
    }

    if (isError || isactiveError || iscompletedError) {
      toast({
        title:
          //@ts-ignore
          error?.data?.error?.message ||
          //@ts-ignore
          activeError?.data?.error?.message ||
          //@ts-ignore
          completedError?.data?.error?.message ||
          'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      router.back();
    }
  }, [isSuccess, data, isError, error, activeError, , completedError]);
  useEffect(() => {
    if (activeSuccess) {
      setCourseData(activeData?.data);
    }
  }, [activeSuccess, activeData]);

  useEffect(() => {
    if (completedSuccess) {
      setCourseData(completedData?.data);
    }
  }, [completedSuccess, completedData]);

  useEffect(() => {
    if (isSuccessBook) {
      toast({
        title: 'Session Booked Successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      onClose();
      trigger(id);
    }
    if (isErrorBook) {
      toast({
        //@ts-ignore
        title: errorBook?.data?.error?.message || 'An error occured',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isSuccessBook, isErrorBook, errorBook]);
  useEffect(() => {
    if (isSuccessCalender) {
      const transformedData = studentCalender?.data.map((item: any) => ({
        date: item.date,
        start_time: item.start_time,
        end_time: item.end_time,
        title: item.title,
      }));

      setStudentCalenderData(transformedData);
    }
  }, [isSuccessCalender]);
  console.log(user);
  const Overview = (data: any) => {
    console.log(data, 'overview date', courseData);
    return (
      <>
        <Stack>
          <Heading color={'#1D2026'} fontSize={'26px'} fontWeight={700} mb={2}>
            Description
          </Heading>
          <Text color={'#4E5566'} fontSize={'16px'} mb={2}>
            {courseData?.subject?.description}
          </Text>

          <Stack
            mt={4}
            justify={'space-between'}
            align={'center'}
            padding={4}
            bg="rgba(225, 247, 227, 0.4)"
          >
            <Text
              color="#1D2026"
              fontSize={28}
              fontWeight={600}
              alignSelf={'flex-start'}
              textAlign={'left'}
              mb={2}
            >
              Topics covered
            </Text>
            <VStack
              justifyContent={'space-between'}
              alignItems={'center'}
              w={'100%'}
            >
              <List spacing={2} display={'flex'} flexWrap={'wrap'} w={'100%'}>
                {courseData?.subject?.achievements?.map((item: any) => (
                  <ListItem
                    key={item?.id}
                    color={'#4E5566'}
                    w={'45%'}
                    fontSize={{ base: 14, md: 16 }}
                  >
                    <ListIcon as={FaCircleCheck} color="#009933" />
                    {item.description}
                  </ListItem>
                ))}
              </List>
            </VStack>
          </Stack>
        </Stack>
      </>
    );
  };
  return (
    <ParentContainer>
      <Stack position={'relative'}>
        <IconButton
          icon={<Icon as={FiArrowLeft} />}
          onClick={() => router.back()}
          bg={'#02659C'}
          color={'white'}
          size={'sm'}
          aria-label="back"
          position={'absolute'}
          top={5}
          left={10}
          zIndex={1000}
        />
        <VStack py={9} px={9} w={{ lg: '100%' }} mt={10}>
          <Text
            color={'#1D2026'}
            textAlign={'left'}
            alignSelf={'flex-start'}
            fontSize={'36px'}
            fontWeight={700}
            mb={2}
          >
            {courseData?.subject?.title}
          </Text>
          <Text
            color={'#4E5566'}
            fontSize={'24px'}
            mb={2}
            alignSelf={'flex-start'}
          >
            {courseData?.subject?.short_description}
          </Text>

          {type === 'all' ? (
            <Tabs w={'100%'}>
              <TabList border={'none'}>
                <Tab
                  fontSize={{
                    base: 16,
                    sm: 18,
                    md: 18,
                  }}
                  _selected={{
                    color: '#1D2026',
                    borderBottomWidth: 2,
                    borderColor: '#FF6636',
                  }}
                  fontFamily="heading"
                  fontWeight="500"
                  color={'#4E5566'}
                >
                  Overview
                </Tab>
                <Tab
                  fontSize={{
                    base: 16,
                    sm: 18,
                    md: 18,
                  }}
                  _selected={{
                    color: '#1D2026',
                    borderBottomWidth: 2,
                    borderColor: '#FF6636',
                  }}
                  fontFamily="heading"
                  fontWeight="500"
                  color={'#4E5566'}
                >
                  Reviews
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel py={8}>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <Overview data={courseData?.subject} />
                  )}
                </TabPanel>
                <TabPanel py={8}>
                  <Reviews id={id} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          ) : type === 'completed' ? (
            <Tabs w={'100%'}>
              <TabList border={'none'}>
                <Tab
                  fontSize={{
                    base: 16,
                    sm: 18,
                    md: 18,
                  }}
                  _selected={{
                    color: '#1D2026',
                    borderBottomWidth: 2,
                    borderColor: '#FF6636',
                  }}
                  fontFamily="heading"
                  fontWeight="500"
                  color={'#4E5566'}
                >
                  Overview
                </Tab>
                <Tab
                  fontSize={{
                    base: 16,
                    sm: 18,
                    md: 18,
                  }}
                  _selected={{
                    color: '#1D2026',
                    borderBottomWidth: 2,
                    borderColor: '#FF6636',
                  }}
                  fontFamily="heading"
                  fontWeight="500"
                  color={'#4E5566'}
                >
                  Session
                </Tab>
                <Tab
                  fontSize={{
                    base: 16,
                    sm: 18,
                    md: 18,
                  }}
                  _selected={{
                    color: '#1D2026',
                    borderBottomWidth: 2,
                    borderColor: '#FF6636',
                  }}
                  fontFamily="heading"
                  fontWeight="500"
                  color={'#4E5566'}
                >
                  Resources
                </Tab>
                <Tab
                  fontSize={{
                    base: 16,
                    sm: 18,
                    md: 18,
                  }}
                  _selected={{
                    color: '#1D2026',
                    borderBottomWidth: 2,
                    borderColor: '#FF6636',
                  }}
                  fontFamily="heading"
                  fontWeight="500"
                  color={'#4E5566'}
                >
                  Reviews
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel py={8}>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <Overview data={courseData?.subject} />
                  )}
                </TabPanel>
                <TabPanel py={8}>
                  <CourseSessions
                    data={courseData?.sessions}
                    isLoading={activeLoading}
                  />
                </TabPanel>
                <TabPanel py={8}>
                  <Resources
                    data={courseData?.resources}
                    isLoading={activeLoading}
                  />
                </TabPanel>
                <TabPanel py={8}>
                  <Reviews id={id} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          ) : (
            <Tabs w={'100%'}>
              <TabList border={'none'}>
                <Tab
                  fontSize={{
                    base: 16,
                    sm: 18,
                    md: 18,
                  }}
                  _selected={{
                    color: '#1D2026',
                    borderBottomWidth: 2,
                    borderColor: '#FF6636',
                  }}
                  fontFamily="heading"
                  fontWeight="500"
                  color={'#4E5566'}
                >
                  Overview
                </Tab>
                <Tab
                  fontSize={{
                    base: 16,
                    sm: 18,
                    md: 18,
                  }}
                  _selected={{
                    color: '#1D2026',
                    borderBottomWidth: 2,
                    borderColor: '#FF6636',
                  }}
                  fontFamily="heading"
                  fontWeight="500"
                  color={'#4E5566'}
                >
                  Session
                </Tab>
                <Tab
                  fontSize={{
                    base: 16,
                    sm: 18,
                    md: 18,
                  }}
                  _selected={{
                    color: '#1D2026',
                    borderBottomWidth: 2,
                    borderColor: '#FF6636',
                  }}
                  fontFamily="heading"
                  fontWeight="500"
                  color={'#4E5566'}
                >
                  Resources
                </Tab>
                <Tab
                  fontSize={{
                    base: 16,
                    sm: 18,
                    md: 18,
                  }}
                  _selected={{
                    color: '#1D2026',
                    borderBottomWidth: 2,
                    borderColor: '#FF6636',
                  }}
                  fontFamily="heading"
                  fontWeight="500"
                  color={'#4E5566'}
                >
                  Assessment
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel py={8}>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <Overview data={courseData?.subject} />
                  )}
                </TabPanel>
                <TabPanel py={8}>
                  <CourseSessions
                    data={courseData?.sessions}
                    isLoading={activeLoading}
                  />
                </TabPanel>
                <TabPanel py={8}>
                  <Resources
                    data={courseData?.resources}
                    isLoading={activeLoading}
                  />
                </TabPanel>
                <TabPanel py={8}>
                  <Stack align="center" justify="center" h="200px" w="100%">
                    <Heading>No Assessment yet</Heading>
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
          {type !== 'active' && (
            <Stack align={'flex-end'} w={'100%'} mt={4}>
              <Button
                width={'279px'}
                bg={'#02659C'}
                onClick={onOpen}
                text="Next"
              />
            </Stack>
          )}
        </VStack>
        <BookSession
          isOpen={isOpen}
          onClose={onClose}
          id={user?.id}
          subject_id={id}
          bookSessionFunction={bookSession}
          isLoading={isLoadingBook}
          studentCalenderData={studentCalenderData}
          setStudentCalenderData={setStudentCalenderData}
        />
      </Stack>
    </ParentContainer>
  );
};

export default SingleCourses;
