'use client';

import {
  Stack,
  Text,
  VStack,
  useDisclosure,
  Heading,
  List,
  ListItem,
  ListIcon,
  Button as ChakraButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import ParentContainer from '~/lib/layout/ParentContainer';
import { useParams, useRouter } from 'next/navigation';
import { FaCircleCheck } from 'react-icons/fa6';
import Button from '~/lib/components/ui/button';
import Review from '~/lib/components/Review';
import {
  useLazyGetACourseQuery,
  useLazyGetCourseTutorQuery,
} from '~/lib/services/parent-mutation';

import Reviews from '~/lib/components/Reviews';
import { userState } from '~/lib/store/reducers/user-slice';
import { useAppSelector } from '~/lib/store';
import BookSession from '~/lib/components/BookSession';
import {
  useBookSessionStudentMutation,
  useLazyGetCalendarQuery,
} from '~/lib/services/student-mutation';

const SingleSession = () => {
  const router = useRouter();
  const { id }: any = useParams();
  const toast = useToast();
  const [studentCalenderData, setStudentCalenderData] = useState<any[]>([]);
  const user = useAppSelector(userState);
  const [courseData, setCourseData] = useState<any>([]);
  const [trigger, { data, isLoading, isError, error, isSuccess }] =
    useLazyGetACourseQuery();
  const [
    getStudentCalender,
    {
      data: studentCalender,
      isSuccess: isSuccessCalender,
      isError: isErrorCalender,
      isLoading: isLoadingCalender,
    },
  ] = useLazyGetCalendarQuery();
  const [
    bookSession,
    {
      isLoading: isLoadingBook,
      isError: isErrorBook,
      error: errorBook,
      isSuccess: isSuccessBook,
    },
  ] = useBookSessionStudentMutation();
  const { onOpen, isOpen, onClose } = useDisclosure();
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
                Review
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
                <Reviews />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Stack
            justifyContent={'flex-end'}
            alignItems={'flex-end'}
            w={'100%'}
            mt={30}
          >
            <Button text="Next" bg="#02659C" width={'279px'} onClick={onOpen} />
          </Stack>
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
        </VStack>
      </Stack>
    </ParentContainer>
  );
};

export default SingleSession;
