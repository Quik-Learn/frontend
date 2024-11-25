'use client';

import {
  Box,
  VStack,
  Text,
  Image,
  HStack,
  Icon,
  Grid,
  GridItem,
  Progress,
  useDisclosure,
  Stack,
  Link,
  IconButton,
  SkeletonText,
  Skeleton,
} from '@chakra-ui/react';

import Button from '~/lib/components/ui/button';
import { BsThreeDots } from 'react-icons/bs';
import ParentContainer from '~/lib/layout/ParentContainer';
import useDashboardHook from './useDashboard';
import { useEffect, useState } from 'react';
import AddWardComponent from '~/lib/components/AddWardComponent';
import { useRouter } from 'next/navigation';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PieChartComponent from '~/lib/components/piechart';
import { IoChevronBackOutline } from 'react-icons/io5';
import { GrFormNext } from 'react-icons/gr';
import { addRandomSoftColorsToEvents } from '~/lib/helpers/paths';
import ActiveCourses from '~/lib/components/ActiveCourses';
import moment from 'moment';
import AddParent from '~/lib/components/AddParent';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const Dashboard = () => {
  const { data, isLoading, dashboardData } = useDashboardHook();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [value, onChange] = useState<any>(new Date());
  const [neww, setNew] = useState('');
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEmpty(false);
    }, 10000);
  }, []);
  useEffect(() => {
    if (data?.bio?.parent?.firstname) {
      onOpen();
    }
  }, [data]);

  // Helper function to check if a date has an event
  const isDateWithEvent = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD

    return dashboardData?.upcoming_events.some(
      (event: any) => event.date === formattedDate
    );
  };

  return (
    <ParentContainer>
      <Grid
        templateColumns="repeat(12, 1fr)"
        templateRows={'repeat(4, 1fr)'}
        bg={'#f0f0f0'}
        gap={6}
        my={6}
        px={6}
        maxH={'120vh'}
      >
        {/* Welcome Section */}
        <GridItem colSpan={[12, 12, 8]}>
          {isLoading ? (
            <Skeleton w={'100%'} h={'207px'}></Skeleton>
          ) : (
            <HStack
              bg="#FF8C00"
              color="white"
              px="6"
              py="10"
              h={'207px'}
              borderRadius="md"
              justifyContent={'space-between'}
            >
              <VStack alignItems={'flex-start'}>
                <Text fontSize="2xl">
                  Welcome, {data?.user?.firstname} {data?.user?.lastname}!
                </Text>
                <Text mb="4">Enroll in Courses and find the best Tutors!</Text>

                <Button
                  color="#5F5F5F"
                  fontWeight={500}
                  bg="white"
                  text="View our Offerings"
                  onClick={() => router?.push('/student/courses')}
                />
              </VStack>
              <HStack alignItems={'flex-end'} gap={0} justifyContent={'center'}>
                <HStack p={0}>
                  {isLoading ? (
                    <SkeletonText />
                  ) : (
                    <Text
                      color={'#fff'}
                      fontSize={180}
                      lineHeight={'50%'}
                      fontWeight={700}
                    >
                      {dashboardData?.streaks}
                    </Text>
                  )}
                </HStack>
                <VStack gap={0} mt={-30}>
                  <Text color={'#fff'} fontSize={24} fontWeight={700}>
                    Days
                  </Text>
                  <Text color={'#fff'} fontSize={24} fontWeight={700}>
                    STREAK🔥
                  </Text>
                </VStack>
              </HStack>
            </HStack>
          )}
          <Stack gap={3} mt={5}>
            {isLoading ? (
              <Skeleton
                bg={'#fff'}
                p={3}
                mb={3}
                w={'100%'}
                borderRadius={10}
                boxShadow={'base'}
                justifyContent={'space-between'}
                alignItems={'center'}
              ></Skeleton>
            ) : (
              <HStack
                w={'100%'}
                bg={'#fff'}
                p={3}
                mb={3}
                borderRadius={10}
                boxShadow={'base'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Text color={'#000000'} fontSize={18}>
                  Active Course
                </Text>
                <Text
                  color={'#5F5F5F'}
                  fontSize={17}
                  onClick={() => router.push('/student/courses')}
                >
                  View all
                </Text>
              </HStack>
            )}
            {isLoading ? (
              <>
                <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={0}>
                  {['', '', '']?.map((item, i) => (
                    <GridItem colSpan={1} display={'flex'} h={'177px'}>
                      <Skeleton key={i} h={'177px'} w={'100%'}></Skeleton>
                    </GridItem>
                  ))}
                </Grid>
              </>
            ) : (
              <ActiveCourses data={dashboardData?.active_courses} />

              // <Grid templateColumns="repeat(12, 1fr)" gap={6} mt={0}>
              //   {dashboardData?.active_courses?.length === 0 ? (
              //     <GridItem
              //       p="6"
              //       display={'flex'}
              //       flexDirection={'row'}
              //       h={'177px'}
              //       justifyContent={'center'}
              //       alignItems={'center'}
              //       borderWidth={1}
              //       borderStyle={'dashed'}
              //       borderRadius="25px"
              //       w={'238px'}
              //       borderColor={'rgba(0, 0, 0, 0.75)'}
              //       onClick={() => router.push(`/student/book-session`)}
              //     >
              //       <Icon as={GoPlus} />
              //       <Text
              //         fontSize="18px"
              //         textAlign={'center'}
              //         color={'rgba(0, 0, 0, 0.5)'}
              //       >
              //         Add Course
              //       </Text>
              //     </GridItem>
              //   ) : (
              //     <>
              //       {addRandomSoftColorsToEvents(
              //         dashboardData?.active_courses
              //       )?.map((item: any) => (
              //         <GridItem
              //           colSpan={[12, 6, 3]}
              //           bg={item?.color}
              //           p="6"
              //           display={'flex'}
              //           flexDirection={'column'}
              //           h={'177px'}
              //           justifyContent={'flex-start'}
              //           alignItems={'flex-start'}
              //           borderRadius="md"
              //         >
              //           <Image
              //             src="/images/two.svg"
              //             bg={'white'}
              //             w={6}
              //             h={6}
              //             p={1}
              //             borderRadius={'50%'}
              //             alt="active"
              //           />
              //           <Text
              //             mt={2}
              //             fontSize="16px"
              //             fontWeight={300}
              //             color={'#161736'}
              //           >
              //             {item?.title || ''}
              //           </Text>
              //           <HStack
              //             bg={'#FCF9FF'}
              //             borderRadius={'11px'}
              //             py={3}
              //             px={3}
              //             w={'126px'}
              //             mt={2}
              //           >
              //             <HStack gap={2}>
              //               <Icon as={BsBook} color={'#161736'} />
              //               <Text color={'#161736'}>0</Text>
              //             </HStack>
              //             <HStack>
              //               <Icon as={LuClock} color={'#161736'} />
              //               <Text color={'#161736'}>13h</Text>
              //             </HStack>
              //           </HStack>
              //         </GridItem>
              //       ))}
              //     </>
              //   )}
              // </Grid>
            )}
          </Stack>
        </GridItem>

        {/* Profile Card */}
        <GridItem colSpan={[12, 12, 4]}>
          {isLoading ? (
            <Skeleton mb={3} w={'100%'} p={3} borderRadius={10}></Skeleton>
          ) : (
            <HStack
              w={'100%'}
              bg={'#fff'}
              p={3}
              mb={3}
              borderRadius={10}
              boxShadow={'base'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Text color={'#000000'} fontSize={18}>
                My Schedule
              </Text>
              <BsThreeDots color={'#000000'} />
            </HStack>
          )}

          {isLoading ? (
            <Skeleton
              borderRadius={10}
              boxShadow={'base'}
              bg={'#fff'}
              w={'100%'}
              maxHeight={'300px'}
              height={'300px'}
            ></Skeleton>
          ) : (
            <Box
              boxShadow={'base'}
              bg={'#fff'}
              borderRadius={10}
              p={6}
              sx={{
                '.react-calendar': {
                  width: '100%',
                  background: 'white',
                  borderRadius: 'md',
                  border: 'none',
                },
                '.react-calendar__navigation': {
                  mb: 4, // Add margin to the bottom
                  fontSize: '17px',
                  color: '#7D8DA6',
                },
                '.react-calendar__tile': {
                  padding: '10px',

                  color: '#141736',
                  fontSize: '13px',
                  transition: 'background-color 0.3s',
                  _hover: {
                    bg: '#367BF5',
                  },
                },
                '.react-calendar__tile--active': {
                  bg: '#E0CAE0',
                  color: '#141736',
                },
                '.react-calendar__tile--now': {
                  bg: '#367BF5',
                  color: '#141736',
                  borderRadius: '50%',
                },
                '.react-calendar__month-view__weekdays': {
                  color: '#141736',
                  fontSize: '13px',
                  textTransform: 'capitalize',
                  borderBottom: 'none',
                  fontWeight: '300',
                  paddingBottom: 2,
                  textDecoration: 'no-line',
                },
                '.react-calendar__tile.event-date': {
                  backgroundColor: '#367BF5',
                  color: '#fff',
                  borderRadius: '8px' /* Optional: gives rounded corners */,
                },
              }}
            >
              <Calendar
                onChange={onChange}
                value={value}
                // Highlight tiles with events
                tileClassName={({ date, view }) => {
                  if (view === 'month' && isDateWithEvent(date)) {
                    return 'event-date'; // Custom class for event dates
                  }
                  return '';
                }}
                selectRange
                prevLabel={<IoChevronBackOutline />}
                nextLabel={<GrFormNext />}
                next2Label={<GrFormNext color="white" />}
                prev2Label={<IoChevronBackOutline color="white" />}
              />
            </Box>
          )}
        </GridItem>

        {/* Wards Engagements Section */}
        <GridItem
          colSpan={[12, 12, 8]}
          justifyItems={'center'}
          display={'flex'}
          flexDir={'row'}
          gap={6}
        >
          <VStack w={'266px'}>
            {isLoading ? (
              <Skeleton
                bg={'#fff'}
                p={3}
                mb={3}
                w={'100%'}
                borderRadius={10}
                boxShadow={'base'}
                justifyContent={'space-between'}
                alignItems={'center'}
              ></Skeleton>
            ) : (
              <HStack
                bg={'#fff'}
                p={3}
                mb={3}
                w={'100%'}
                borderRadius={10}
                boxShadow={'base'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Text color={'#000000'} fontSize={18}>
                  Study Time
                </Text>
                <BsThreeDots color={'#000000'} />
              </HStack>
            )}
            {isLoading ? (
              <Skeleton
                borderRadius={10}
                boxShadow={'base'}
                bg={'#fff'}
                w={'100%'}
                maxHeight={'300px'}
                height={'300px'}
              ></Skeleton>
            ) : (
              <Box
                borderRadius={10}
                boxShadow={'base'}
                bg={'#fff'}
                w={'100%'}
                maxHeight={'300px'}
                height={'300px'}
              >
                {dashboardData?.study_time?.total_time === 0 ? (
                  <Stack
                    w={'100%'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    maxHeight={'300px'}
                    height={'300px'}
                  >
                    <Text
                      my="4"
                      fontWeight={700}
                      textAlign={'center'}
                      color={'#5F5F5F'}
                      fontSize={25}
                    >
                      What are you Waiting for !
                    </Text>
                  </Stack>
                ) : (
                  <Stack
                    w={'100%'}
                    maxHeight={'300px'}
                    height={'300px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Stack w={'100%'} h={'100%'}>
                      <PieChartComponent
                        data={[
                          {
                            name: 'Total Time',
                            value: dashboardData?.study_time?.total_time,
                          },
                          {
                            name: 'Spent Time',
                            value:
                              dashboardData?.study_time?.total_time -
                              dashboardData?.study_time?.remaining_time,
                          },
                        ]}
                      />
                    </Stack>
                    <Text
                      fontSize={22}
                      fontWeight={700}
                      textAlign={'center'}
                      color={'#FF8C00'}
                    >
                      {dashboardData?.study_time?.remaining_time} Hours Left
                    </Text>
                  </Stack>
                )}
              </Box>
            )}
          </VStack>
          <VStack w={'712px'}>
            {isLoading ? (
              <Skeleton
                bg={'#fff'}
                p={3}
                mb={3}
                w={'100%'}
                borderRadius={10}
                boxShadow={'base'}
                justifyContent={'space-between'}
                alignItems={'center'}
              ></Skeleton>
            ) : (
              <HStack
                bg={'#fff'}
                p={3}
                mb={3}
                w={'100%'}
                borderRadius={10}
                boxShadow={'base'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Text color={'#000000'} fontSize={18}>
                  Recent Activities
                </Text>
                <BsThreeDots color={'#000000'} />
              </HStack>
            )}

            {isLoading ? (
              <Skeleton
                borderRadius={10}
                boxShadow={'base'}
                bg={'#fff'}
                w={'100%'}
                maxHeight={'300px'}
                height={'300px'}
              ></Skeleton>
            ) : (
              <Box
                borderRadius={10}
                boxShadow={'base'}
                bg={'#fff'}
                w={'100%'}
                maxHeight={'300px'}
                overflowY={'auto'}
                height={'300px'}
              >
                {dashboardData?.recent_activity?.length === 0 ? (
                  <Stack
                    w={'100%'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Text
                      my="4"
                      fontWeight={700}
                      textAlign={'center'}
                      color={'#5F5F5F'}
                      fontSize={25}
                    >
                      No Recent Activity !
                    </Text>
                  </Stack>
                ) : (
                  <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                    <Text fontSize="lg" fontWeight="bold" mb={4}>
                      Recent Activities
                    </Text>
                    <VStack align="start" spacing={4}>
                      {addRandomSoftColorsToEvents(
                        dashboardData?.recent_activity
                      )?.map((activity: any, index: number) => (
                        <Box
                          key={activity.id}
                          w="100%"
                          p={3}
                          borderBottomWidth={2}
                          borderBottomColor={'#ECECEC'}
                        >
                          <HStack spacing={4} align="start">
                            <IconButton
                              icon={
                                <Image
                                  src={
                                    index % 2
                                      ? '/images/aa.svg'
                                      : '/images/bb.svg'
                                  }
                                  alt="alt"
                                />
                              }
                              p={2}
                              bg={activity.color}
                              aria-label={'aria'}
                            />
                            <Box flex="1">
                              <Text
                                fontSize="15px"
                                color={'#333333'}
                                fontWeight="700"
                              >
                                {activity?.name}
                              </Text>
                              <Text
                                fontSize="10px"
                                color={'#8A8A8A'}
                                fontWeight="700"
                              >
                                {activity?.activity_type}
                              </Text>
                              {activity.course && (
                                <Text
                                  fontSize="10px"
                                  color={'#8A8A8A'}
                                  fontWeight="700"
                                >
                                  Course: {activity?.subject}
                                </Text>
                              )}
                              {activity.tutor && (
                                <Text
                                  fontSize="10px"
                                  color={'#8A8A8A'}
                                  fontWeight={700}
                                >
                                  Tutor: {activity?.tutor}
                                </Text>
                              )}
                              {activity.start && (
                                <Text fontSize="10px" color="#8A8A8A">
                                  From {moment(activity?.start).format('LL')}{' '}
                                  <Text as={'span'}>
                                    {' '}
                                    Due {moment(activity?.end).format('LL')}
                                  </Text>
                                </Text>
                              )}
                            </Box>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                )}
              </Box>
            )}
          </VStack>
        </GridItem>

        {/* Subscriptions Section */}
        <GridItem colSpan={[12, 12, 4]}>
          {isLoading ? (
            <Skeleton
              w={'100%'}
              bg={'#fff'}
              p={3}
              mb={3}
              borderRadius={10}
              boxShadow={'base'}
              justifyContent={'space-between'}
              alignItems={'center'}
            ></Skeleton>
          ) : (
            <HStack
              w={'100%'}
              bg={'#fff'}
              p={3}
              mb={3}
              borderRadius={10}
              boxShadow={'base'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Text color={'#000000'} fontSize={18}>
                Upcoming Event
              </Text>
              <BsThreeDots color={'#000000'} />
            </HStack>
          )}
          {isLoading ? (
            <Skeleton
              borderRadius={10}
              boxShadow={'base'}
              bg={'#fff'}
              w={'100%'}
              maxHeight={'300px'}
              height={'300px'}
            ></Skeleton>
          ) : (
            <VStack
              bg={'#fff'}
              px={3}
              py={6}
              mb={3}
              borderRadius={10}
              boxShadow={'base'}
              w={'100%'}
              maxHeight={'300px'}
              height={'300px'}
            >
              {dashboardData?.upcoming_events?.length === 0 ? (
                <Stack
                  w={'100%'}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Text
                    my="4"
                    fontWeight={700}
                    textAlign={'center'}
                    color={'#5F5F5F'}
                    fontSize={25}
                  >
                    No Upcoming Events
                  </Text>
                </Stack>
              ) : (
                <VStack
                  align="start"
                  width={'100%'}
                  overflowY={'auto'}
                  maxHeight={'280px'}
                  height={'280px'}
                >
                  {addRandomSoftColorsToEvents(
                    dashboardData?.upcoming_events
                  )?.map((event: any, i: number) => (
                    <HStack
                      key={i}
                      w="100%"
                      align="center"
                      borderRadius={6}
                      p={2}
                      bg="rgba(165, 180, 203, 0.2)"
                    >
                      <Box
                        bg={event?.color || '#118AB2'}
                        w={8}
                        h={8}
                        borderRadius="md"
                      />
                      <Box flex="1">
                        <Text fontSize="16px" color="#161736">
                          {event.title}
                        </Text>
                        <Text fontSize="14px" color="#7D8DA6">
                          • {event.date} • {event.start_time}
                        </Text>
                      </Box>
                    </HStack>
                  ))}
                </VStack>
              )}
            </VStack>
          )}
        </GridItem>
      </Grid>

      <AddParent
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        neww={neww}
        setNew={setNew}
      />
    </ParentContainer>
  );
};

export default Dashboard;
