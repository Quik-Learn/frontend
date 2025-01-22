'use client';
import {
  Avatar,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
  Box,
  Image,
  IconButton,
  SimpleGrid,
  GridItem,
  Grid,
  Skeleton,
} from '@chakra-ui/react';
import React from 'react';
import TutorContainer from '~/lib/layout/TutorContainer';
import useDashboardHook from './useDashboard';
import { PiCrownSimple } from 'react-icons/pi';
import { IoArrowDown } from 'react-icons/io5';
import OverallRating from '~/lib/components/OverallRating';
import RecentActivity from '~/lib/components/RecentActivity';
import ProfilevIew from '~/lib/components/ProfilevIew';
import ProgressBar from '~/lib/components/ui/progress-bar';
import Button from '~/lib/components/ui/button';
import { addRandomSoftColorsToEvents } from '~/lib/helpers/paths';
import { BsThreeDots } from 'react-icons/bs';
const Dashboard = () => {
  const {
    isLoading,
    dashboardData,
    ratingsData,
    activitiesData,
    ratingsLoading,
    activitiesLoading,
  } = useDashboardHook();
  const dashboardItems = [
    {
      id: 1,
      name: 'Active Courses',
      count: dashboardData?.statistics?.active_courses,
      icon: '/images/active-courses.svg',
      bg: '#EBEBFF',
    },

    {
      id: 2,
      name: 'Completed Sessions',
      count: dashboardData?.statistics?.completed_sessions,
      icon: '/images/completed-courses.svg',
      bg: '#E1F7E3',
    },
    {
      id: 3,
      name: 'Total Students',
      count: dashboardData?.statistics?.enrolled_students,
      icon: '/images/enrolled-student.svg',
      bg: '#FFF0F0',
    },
  ];
  return (
    <TutorContainer>
      <Stack p={'32px'}>
        {isLoading ? (
          <Skeleton w={'100%'} h={158}></Skeleton>
        ) : (
          <HStack
            bg={'#0A52A8'}
            height={158}
            borderRadius={'4px'}
            px={'32px'}
            py={'24px'}
            justifyContent={'space-between'}
          >
            <HStack>
              <Avatar
                name={`${dashboardData?.user?.firstname} ${dashboardData?.user?.lastname}`}
                src={dashboardData?.user?.profile_image}
                bg={'#fff'}
                color={'#0A52A8'}
                size="xl"
              />
              <VStack justifyContent={'flex-start'} alignItems={'flex-start'}>
                <HStack>
                  <Text color={'#fff'} fontSize={20} fontWeight={600}>
                    {dashboardData?.user?.firstname}{' '}
                    {dashboardData?.user?.lastname}
                  </Text>
                  {dashboardData?.user?.rating > 4.5 ? (
                    <HStack bg={'rgba(2, 101, 156, 0.3)'} gap={2} p={1}>
                      <Icon as={PiCrownSimple} color={'#FF8C00'} />
                      <Text color={'#fff'}>Top Rated</Text>
                    </HStack>
                  ) : null}
                </HStack>
                <Text color={'#fff'} fontSize={14} textAlign={'left'}>
                  {dashboardData?.user?.email}
                </Text>
              </VStack>
            </HStack>
            {/* <HStack w={'450px'}>
            <Text fontWeight={500} fontSize={14} color={'#fff'}>
              1/4 Steps
            </Text>
            <ProgressBar firstPercentage="25%" bg1="#F0F0F0" bg2="#23BD33" />
            <Text fontWeight={600} fontSize={16} color={'#fff'}>
              25% Completed
            </Text>
          </HStack> */}

            {/* <HStack>
            <Button text="Edit Profile" bg="#FF6636" width={'131px'} />
            <IconButton
              aria-label="icon"
              icon={<IoArrowDown />}
              bg={'#FFFFFF0D'}
              w={'48px'}
              h={'48px'}
              color={'#fff'}
              borderRadius={5}
            />
          </HStack> */}
          </HStack>
        )}

        {/* {isLoading ? (
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 5, md: 10 }}
            mt={7}
          >
            {['', '', ''].map((item, i) => (
              <HStack key={i} padding={'20px'} gap={5}>
                <Skeleton key={i} w={'100%'} h={'100%'}></Skeleton>
              </HStack>
            ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 5, md: 10 }}
            mt={7}
          >
            {dashboardItems?.map((item) => (
              <HStack key={item.id} bg={'#fff'} padding={'20px'} gap={5}>
                <IconButton
                  aria-label="aria"
                  icon={<Image src={item.icon} alt={item.name} />}
                  w={'60px'}
                  h={'60px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  bg={item.bg}
                  borderRadius={'1px'}
                />
                <VStack alignItems={'flex-start'}>
                  <Text color={'#1D2026'} fontSize={24}>
                    {item.count}
                  </Text>
                  <Text color={'#4E5566'} fontSize={14}>
                    {item.name}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>
        )} */}
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={{ base: 5, md: 10 }}
          mt={7}
        >
          {dashboardItems?.map((item) => (
            <HStack key={item.id} bg={'#fff'} padding={'20px'} gap={5}>
              <IconButton
                aria-label="aria"
                icon={<Image src={item.icon} alt={item.name} />}
                w={'60px'}
                h={'60px'}
                alignItems={'center'}
                justifyContent={'center'}
                bg={item.bg}
                borderRadius={'1px'}
              />
              <VStack alignItems={'flex-start'}>
                <Text color={'#1D2026'} fontSize={24}>
                  {item.count}
                </Text>
                <Text color={'#4E5566'} fontSize={14}>
                  {item.name}
                </Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
        {isLoading ? (
          <Grid
            templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(9, 1fr)' }}
            gap={6}
            mt={5}
          >
            <GridItem
              colSpan={{ base: 3, md: 4 }}
              h={'115px'}
              borderRadius="md"
            >
              <Skeleton w={'100%'} h={'115px'}></Skeleton>
            </GridItem>

            <GridItem colSpan={3} h={'115px'} borderRadius="md">
              <Skeleton w={'100%'} h={'115px'}></Skeleton>
            </GridItem>

            <GridItem
              colSpan={{ base: 3, md: 2 }}
              h={'115px'}
              borderRadius="md"
            >
              <Skeleton w={'100%'} h={'115px'}></Skeleton>
            </GridItem>
          </Grid>
        ) : (
          <Grid
            mt={10}
            gap={5}
            templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(9, 1fr)' }}
          >
            <GridItem colSpan={{ base: 3, md: 4 }}>
              {ratingsLoading ? (
                <Skeleton w={'100%'} h={'115px'}></Skeleton>
              ) : (
                <OverallRating ratingsData={ratingsData} />
              )}
            </GridItem>
            <GridItem colSpan={3}>
              {activitiesLoading ? (
                <Skeleton w={'100%'} h={'115px'}></Skeleton>
              ) : (
                <RecentActivity activitiesData={activitiesData} />
              )}
            </GridItem>
            <GridItem colSpan={{ base: 3, md: 2 }}>
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
                      overflowY={'scroll'}
                      maxHeight={'280px'}
                      height={'280px'}
                      sx={{
                        '::-webkit-scrollbar': {
                          display: 'none',
                        },
                      }}
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
        )}
      </Stack>
    </TutorContainer>
  );
};

export default Dashboard;
