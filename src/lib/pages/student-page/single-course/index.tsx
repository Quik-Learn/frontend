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
  useLazyGetCalendarQuery,
} from '~/lib/services/student-mutation';
import BookSession from '~/lib/components/BookSession';
import { useAppSelector } from '~/lib/store';
import { userState } from '~/lib/store/reducers/user-slice';

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
    trigger(id);
    getStudentCalender(id);
  }, [id]);
  useEffect(() => {
    if (isSuccess) {
      setCourseData(data?.data);
    }
    if (isError) {
      toast({
        //@ts-ignore
        title: error?.data?.error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      router.back();
    }
  }, [isSuccess, data, isError, error]);
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
  return (
    <ParentContainer>
      <Stack>
        <VStack py={9} px={9} w={{ lg: '100%' }}>
          <Text
            color={'#1D2026'}
            textAlign={'left'}
            alignSelf={'flex-start'}
            fontSize={'36px'}
            fontWeight={700}
            mb={2}
          >
            {courseData?.title}
          </Text>
          <Text
            color={'#4E5566'}
            fontSize={'24px'}
            mb={2}
            alignSelf={'flex-start'}
          >
            {courseData?.short_description}
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
                    <Spinner />
                  ) : (
                    <Stack>
                      <Heading
                        color={'#1D2026'}
                        fontSize={'26px'}
                        fontWeight={700}
                        mb={2}
                      >
                        Description
                      </Heading>
                      <Text color={'#4E5566'} fontSize={'16px'} mb={2}>
                        {courseData?.description}
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
                          <List
                            spacing={2}
                            display={'flex'}
                            flexWrap={'wrap'}
                            w={'100%'}
                          >
                            {courseData?.achievements?.map((item: any) => (
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
                  )}
                </TabPanel>
                <TabPanel py={8}>
                  <Reviews />
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
                  Reviews
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel py={8}>
                  <Stack>
                    <Heading
                      color={'#1D2026'}
                      fontSize={'26px'}
                      fontWeight={700}
                      mb={2}
                    >
                      Description
                    </Heading>
                    <Text color={'#4E5566'} fontSize={'16px'} mb={2}>
                      {courseData?.description}
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
                        <List
                          spacing={2}
                          display={'flex'}
                          flexWrap={'wrap'}
                          w={'100%'}
                        >
                          {courseData?.achievements?.map((item: any) => (
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
                </TabPanel>
                <TabPanel py={8}>
                  <PastSessions />
                </TabPanel>
                <TabPanel py={8}>
                  <Resources />
                </TabPanel>
                <TabPanel py={8}>
                  <Reviews />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
          <Stack align={'flex-end'} w={'100%'} mt={4}>
            <Button
              width={'279px'}
              bg={'#02659C'}
              onClick={onOpen}
              text="Next"
            />
          </Stack>
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
