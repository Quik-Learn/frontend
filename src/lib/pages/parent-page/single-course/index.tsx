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
  Icon,
  IconButton,
  Skeleton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ParentContainer from '~/lib/layout/ParentContainer';
import Reviews from '~/lib/components/Reviews';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { FaCircleCheck } from 'react-icons/fa6';
import {
  useBookSessionParentMutation,
  useGetWardsQuery,
  useLazyGetACourseQuery,
  useLazyGetCourseTutorQuery,
  useLazyGetStudentCalenderQuery,
} from '~/lib/services/parent-mutation';
import Button from '~/lib/components/ui/button';
import ChooseWard from '~/lib/components/ChooseWard';
import BookLesson from '~/lib/components/BookLesson';
import BookSession from '~/lib/components/BookSession';
import BookError from '~/lib/components/BookError';
import { FiArrowLeft } from 'react-icons/fi';
import { Bars } from 'react-loader-spinner';

const SingleCourses = () => {
  const router = useRouter();
  const { id }: any = useParams();
  const [studentCalenderData, setStudentCalenderData] = useState<any>([]);
  const toast = useToast();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    onOpen: onOpenBook,
    isOpen: isOpenBook,
    onClose: onCloseBook,
  } = useDisclosure();
  const {
    onOpen: onOpenError,
    isOpen: isOpenError,
    onClose: onCloseError,
  } = useDisclosure();
  const [courseData, setCourseData] = useState<any>([]);
  const [selectedWard, setSelectedWard] = useState<any>(null);
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
  ] = useLazyGetStudentCalenderQuery();
  const [
    bookSession,
    {
      isLoading: isLoadingBook,
      isSuccess: isSuccessBook,
      isError: isErrorBook,
      error: errorBook,
    },
  ] = useBookSessionParentMutation();

  useEffect(() => {
    trigger(id);
  }, [id]);
  const handleSelectHandler = (ward: any) => {
    setSelectedWard(ward);
    getStudentCalender(ward?.id);
  };
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
      onCloseBook();
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
      onClose();
      onOpenBook();
    }
  }, [isSuccessCalender]);
  return (
    <ParentContainer>
      <Stack alignItems={'center'} position={'relative'}>
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
            fontSize={{ base: 20, md: 36 }}
            fontWeight={700}
            mb={2}
          >
            {courseData?.subject?.title}
          </Text>
          <Text
            color={'#4E5566'}
            fontSize={{ base: 16, md: 24 }}
            mb={2}
            fontWeight={300}
            textAlign={'left'}
            alignSelf={'flex-start'}
          >
            {courseData?.subject?.short_description}
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
                Reviews
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel py={{ base: 4, md: 8 }}>
                {isLoading ? (
                  <Bars height={200} width={200} />
                ) : (
                  <Stack>
                    <Heading
                      color={'#1D2026'}
                      fontSize={{ base: 16, md: 26 }}
                      fontWeight={700}
                      mb={2}
                    >
                      Description
                    </Heading>
                    <Text
                      color={'#4E5566'}
                      fontSize={{ base: 14, md: 16 }}
                      mb={2}
                    >
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

                      <List
                        spacing={2}
                        display={'flex'}
                        flexWrap={'wrap'}
                        w={'100%'}
                      >
                        {courseData?.subject?.achievements?.map((item: any) => (
                          <ListItem
                            key={item?.id}
                            color={'#4E5566'}
                            w={{ base: '100%', md: '45%' }}
                            fontSize={{ base: 14, md: 16 }}
                          >
                            <ListIcon as={FaCircleCheck} color="#009933" />
                            {item.description}
                          </ListItem>
                        ))}
                      </List>
                    </Stack>
                  </Stack>
                )}
                <Stack
                  justifyContent={'flex-end'}
                  alignItems={'flex-end'}
                  w={'100%'}
                  mt={30}
                >
                  <Button
                    text="Next"
                    bg="#02659C"
                    width={'279px'}
                    onClick={onOpen}
                  />
                </Stack>
              </TabPanel>
              <TabPanel py={8}>
                <Reviews />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <BookSession
            isOpen={isOpenBook}
            onClose={onCloseBook}
            id={selectedWard?.id}
            subject_id={id}
            bookSessionFunction={(data: any) => {
              if (selectedWard?.has_subscription) {
                bookSession(data);
              } else {
                onCloseBook();
                onOpenError();
              }
            }}
            isLoading={isLoadingBook}
            studentCalenderData={studentCalenderData}
            setStudentCalenderData={setStudentCalenderData}
          />
          <BookError
            isOpen={isOpenError}
            onClose={onCloseError}
            description="You need to subscribe for this ward to book a session for this course"
            hasAction={true}
            actionText="Activate Subscription"
            actionFunction={() => {
              router.push('/parent/payment');
            }}
          />
          <ChooseWard
            isOpen={isOpen}
            onOpen={onOpen}
            handleSelectHandler={handleSelectHandler}
            onClose={onClose}
          />
        </VStack>
      </Stack>
    </ParentContainer>
  );
};

export default SingleCourses;
