'use client';

import {
  Box,
  SimpleGrid,
  VStack,
  Text,
  Image,
  HStack,
  Avatar,
  Grid,
  GridItem,
  Progress,
  useDisclosure,
  Skeleton,
  Icon,
  Stack,
} from '@chakra-ui/react';
import { TfiEmail } from 'react-icons/tfi';
import Button from '~/lib/components/ui/button';
import { HiOutlinePhone } from 'react-icons/hi2';
import { BsThreeDots } from 'react-icons/bs';
import ParentContainer from '~/lib/layout/ParentContainer';
import Linecharts from '~/lib/components/Linecharts';
import useDashboardHook from './useDashboard';
import { useEffect, useRef, useState } from 'react';
import AddWardComponent from '~/lib/components/AddWardComponent';
import { useRouter } from 'next/navigation';
import ProgressBar from '~/lib/components/ui/progress-bar';
import { SubscribePlan } from '~/lib/components/SubscribePlan';
import { SECONDS_TO_OPEN_MODAL } from '~/lib/helpers/constants';
import { GetServerSideProps } from 'next';
import { requireAuthentication } from '~/lib/helpers/auth';

const Dashboard = () => {
  const { data, isLoading, dashboardData } = useDashboardHook();
  const seconds = useRef(1000);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenn,
    onOpen: onOpenn,
    onClose: onClosee,
  } = useDisclosure();
  const router = useRouter();
  console.log(dashboardData);

  const [neww, setNew] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (dashboardData?.ward_count === 0 && !isOpen) {
        onOpen();
      }
    }, seconds.current); // 120000ms = 2 minutes

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [dashboardData?.ward_count, isOpen, onOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        dashboardData?.subscriptions?.length === 0 &&
        !isOpenn &&
        !isOpen &&
        dashboardData?.ward_count > 0
      ) {
        onOpenn();
      }
    }, seconds.current); // 120000ms = 2 minutes

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [
    dashboardData?.ward_count,
    isOpenn,
    onOpenn,
    dashboardData?.subscriptions?.length,
  ]);
  const handleAddWardClose = () => {
    seconds.current = SECONDS_TO_OPEN_MODAL; // Update to 5 minutes (300,000 ms)
    onClose();
  };

  const handleSubscribeClose = () => {
    seconds.current = SECONDS_TO_OPEN_MODAL; // Update to 5 minutes (300,000 ms)
    onClosee();
  };

  return (
    <ParentContainer>
      <Grid
        templateColumns="repeat(12, 1fr)"
        bg={'#f0f0f0'}
        gap={6}
        my={6}
        px={6}
      >
        <GridItem colSpan={[12, 12, 8]}>
          {isLoading ? (
            <Skeleton w={'100%'} h={'207px'}></Skeleton>
          ) : (
            <VStack
              bg="#0065FF"
              color="white"
              px="6"
              py="10"
              borderRadius="md"
              alignItems={'flex-start'}
            >
              <Text fontSize="2xl">
                Welcome, {data?.firstname} {data?.lastname}!
              </Text>
              <Text mb="4">
                Enroll your ward in Courses and find the best Tutors!
              </Text>
              <HStack
                gap="4"
                flexDirection={{ base: 'column', md: 'row' }}
                alignItems={'center'}
                width={{ base: '100%', md: 'auto' }}
              >
                <Button
                  color="#5F5F5F"
                  fontWeight={500}
                  bg="white"
                  text="View Courses"
                  onClick={() => router?.push('parent/courses')}
                />
                <Button
                  fontWeight={500}
                  color="#5F5F5F"
                  bg="white"
                  onClick={() => {
                    setNew('');
                    onOpen();
                  }}
                  text={
                    dashboardData?.ward_count === 0
                      ? 'Add a Ward'
                      : 'Add Another Ward'
                  }
                />
              </HStack>
            </VStack>
          )}
          {isLoading ? (
            <Grid templateColumns="repeat(12, 1fr)" gap={6} mt={5}>
              <GridItem colSpan={[12, 6, 4]} h={'115px'} borderRadius="md">
                <Skeleton w={'100%'} h={'115px'}></Skeleton>
              </GridItem>

              <GridItem colSpan={[12, 6, 4]} h={'115px'} borderRadius="md">
                <Skeleton w={'100%'} h={'115px'}></Skeleton>
              </GridItem>

              <GridItem colSpan={[12, 6, 4]} h={'115px'} borderRadius="md">
                <Skeleton w={'100%'} h={'115px'}></Skeleton>
              </GridItem>
            </Grid>
          ) : (
            <Grid templateColumns="repeat(12, 1fr)" gap={6} mt={5}>
              {/* Stats Cards */}
              <GridItem
                colSpan={[12, 6, 4]}
                bg="rgba(0, 101, 255, 0.1)"
                p="6"
                display={'flex'}
                flexDirection={'row'}
                h={'115px'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={4}
                borderRadius="md"
                onClick={() => router?.push('/parent/wards')}
                cursor="pointer"
              >
                <Image src="/images/active.svg" w={16} h={16} alt="active" />
                <Text
                  fontSize="64px"
                  fontWeight={900}
                  textAlign={'center'}
                  color={'#0065FF'}
                >
                  {dashboardData?.ward_count || 0}
                </Text>
                <Text
                  fontSize="15px"
                  fontWeight={900}
                  textAlign={'center'}
                  color={'#0065FF'}
                >
                  {dashboardData?.ward_count > 1
                    ? 'Active Students'
                    : 'Active Student'}
                </Text>
              </GridItem>

              <GridItem
                colSpan={[12, 6, 4]}
                bg="rgba(255, 140, 0, 0.2)"
                p="6"
                display={'flex'}
                flexDirection={'row'}
                h={'115px'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={4}
                borderRadius="md"
                onClick={() => router?.push('/parent/courses')}
                cursor="pointer"
              >
                <Image src="/images/ongoing.svg" w={16} h={16} alt="active" />
                <Text
                  fontSize="64px"
                  fontWeight={900}
                  textAlign={'center'}
                  color={'#FF8C00'}
                >
                  {dashboardData?.ongoing_courses || 0}
                </Text>
                <Text
                  fontSize="15px"
                  fontWeight={900}
                  textAlign={'center'}
                  color={'#FF8C00'}
                >
                  Ongoing Courses
                </Text>
              </GridItem>

              <GridItem
                colSpan={[12, 6, 4]}
                bg="rgba(38, 50, 56, 0.2)"
                p="6"
                display={'flex'}
                flexDirection={'row'}
                h={'115px'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={4}
                borderRadius="md"
                onClick={() => router?.push('/notifications')}
                cursor="pointer"
              >
                <Image src="/images/pending.svg" w={8} h={10} alt="active" />
                <Text
                  fontSize="54px"
                  fontWeight={900}
                  textAlign={'center'}
                  color={'#5F5F5F'}
                >
                  {dashboardData?.notifications || 0}
                </Text>
                <Text
                  fontSize="12px"
                  fontWeight={900}
                  textAlign={'center'}
                  color={'#5F5F5F'}
                >
                  Pending Notifications
                </Text>
              </GridItem>
            </Grid>
          )}
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
                My Profile
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
              boxShadow={'base'}
              bg={'#fff'}
              borderRadius={10}
              spacing={5}
              p={6}
            >
              <Avatar
                bg={'#0065FF'}
                color={'#fff'}
                size="lg"
                name={`${data?.firstname} ${data?.lastname}`}
              />

              <Text color={'#5F5F5F'} fontSize={14}>
                {data?.firstname} {data?.lastname}
              </Text>
              <Text fontSize={14} color="#5F5F5F" fontWeight={700}>
                {data?.account_type}
              </Text>
              <HStack gap={5} alignItems={'center'} justifyContent={'center'}>
                <Icon as={TfiEmail} />

                <Text color={'#5F5F5F'} fontSize={14}>
                  {data?.email}
                </Text>
              </HStack>
              {data?.phone ? (
                <HStack gap={5} alignItems={'center'} justifyContent={'center'}>
                  <Icon as={HiOutlinePhone} />
                  <Text color={'#5F5F5F'} fontSize={14}>
                    {data?.phone}
                  </Text>
                </HStack>
              ) : null}
            </VStack>
          )}
        </GridItem>

        {/* Wards Engagements Section */}
        <GridItem colSpan={[12, 12, 8]}>
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
                Wards Engagements
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
              maxHeight={'600px'}
              height={'350px'}
            ></Skeleton>
          ) : (
            <>
              {dashboardData?.weekly_stats?.length ? (
                <Box
                  borderRadius={10}
                  boxShadow={'base'}
                  bg={'#fff'}
                  height={'350px'}
                >
                  <Linecharts weeklyStats={dashboardData?.weekly_stats} />
                </Box>
              ) : (
                <Box
                  borderRadius={10}
                  boxShadow={'base'}
                  bg={'#fff'}
                  w={'100%'}
                  height={'300px'}
                >
                  {true ? (
                    <Stack
                      w={'100%'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      height={'300px'}
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
                  ) : null}
                </Box>
              )}
            </>
          )}
        </GridItem>
        {/* Subscriptions Section */}
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
                Subscriptions
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
              minHeight={'300px'}
            >
              {dashboardData?.subscriptions?.length === 0 ? (
                <>
                  <Text
                    my="4"
                    fontWeight={700}
                    textAlign={'center'}
                    color={'#5F5F5F'}
                    fontSize={25}
                  >
                    No Active Subscription
                  </Text>
                  <Button
                    onClick={() => {
                      setNew('');
                      onOpen();
                    }}
                    width={'225px'}
                    bg="#0065FF"
                    text="Add a Ward"
                  />
                </>
              ) : (
                <>
                  {dashboardData?.subscriptions?.map((item: any) => (
                    <>
                      <Text
                        fontWeight="bold"
                        textAlign={'left'}
                        fontSize={18}
                        mb="1"
                        color={'#5F5F5F'}
                      >
                        {item.plan_name}
                      </Text>
                      <Box mb="2" w={'100%'}>
                        {/* <Progress
                        value={
                          (+item.remaining_hours / +item?.total_hours) * 100
                        }
                        size="lg"
                        bg={true ? '#FFC727' : '#0065FF'}
                        borderRadius="8px"
                        transition="all 0.3s ease-in-out"
                      /> */}
                        <ProgressBar
                          firstPercentage={`${(item?.remaining_hours / item?.total_hours) * 100}%`}
                          secondPercentage={`${(item?.total_hours / item?.total_hours) * 100}%`}
                        />
                        <HStack justifyContent={'space-between'}>
                          <Text
                            fontWeight="bold"
                            textAlign={'left'}
                            fontSize={12}
                            mb="2"
                            color={'#5F5F5F'}
                          >
                            {item?.ward_name}
                          </Text>
                          <Text
                            textAlign={'left'}
                            fontSize={12}
                            mb="2"
                            color={'#5F5F5F'}
                          >
                            {' '}
                            {item.remaining_hours}hrs/{item.total_hours}hrs
                          </Text>
                        </HStack>
                      </Box>
                    </>
                  ))}
                </>
              )}
            </VStack>
          )}
        </GridItem>
      </Grid>

      <AddWardComponent
        onClose={handleAddWardClose}
        onOpen={onOpen}
        isOpen={isOpen}
        neww={neww}
        setNew={setNew}
      />
      <SubscribePlan onClose={handleSubscribeClose} isOpen={isOpenn} />
    </ParentContainer>
  );
};

export default Dashboard;
export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {},
    };
  }
);
