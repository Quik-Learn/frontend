'use client';

import {
  Box,
  SimpleGrid,
  VStack,
  Text,
  Image,
  HStack,
  Icon,
  Avatar,
  Grid,
  GridItem,
  Progress,
  useDisclosure,
  Skeleton,
  SkeletonText,
  Stack,
} from '@chakra-ui/react';

import Button from '~/lib/components/ui/button';

import { BsThreeDots } from 'react-icons/bs';
import ParentContainer from '~/lib/layout/ParentContainer';
import Linecharts from '~/lib/components/Linecharts';
import useDashboardHook from './useDashboard';
import { useState } from 'react';
import AddWardComponent from '~/lib/components/AddWardComponent';
import { useRouter } from 'next/navigation';
import ProgressBar from '~/lib/components/ui/progress-bar';

const Dashboard = () => {
  const { data, isLoading, dashboardData } = useDashboardHook();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  console.log(dashboardData);
  const [neww, setNew] = useState('');
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
          <VStack
            bg="#0065FF"
            color="white"
            px="6"
            py="10"
            h={'207px'}
            borderRadius="md"
            alignItems={'flex-start'}
          >
            <Text fontSize="2xl">
              Welcome, {data?.firstname} {data?.lastname}!
            </Text>
            <Text mb="4">
              Enroll your ward in Courses and find the best Tutors!
            </Text>
            <HStack spacing="4">
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
            >
              <Image src="/images/pending.svg" w={12} h={12} alt="active" />
              <Text
                fontSize="64px"
                fontWeight={900}
                textAlign={'center'}
                color={'#5F5F5F'}
              >
                {dashboardData?.notifications || 0}
              </Text>
              <Text
                fontSize="15px"
                fontWeight={900}
                textAlign={'center'}
                color={'#5F5F5F'}
              >
                Pending Notifications
              </Text>
            </GridItem>
          </Grid>
        </GridItem>
        {/* Profile Card */}
        <GridItem colSpan={[12, 12, 4]}>
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

            <Text color={'#5F5F5F'} fontSize={14}>
              {data?.email}
            </Text>
            <Text color={'#5F5F5F'} fontSize={14}>
              {data?.phone}
            </Text>
          </VStack>
        </GridItem>

        {/* Wards Engagements Section */}
        <GridItem colSpan={[12, 12, 8]}>
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
          {dashboardData?.weekly_stats?.length ? (
            <Box
              borderRadius={10}
              boxShadow={'base'}
              bg={'#fff'}
              height={'350px'}
            >
              <Linecharts />
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
        </GridItem>
        {/* Subscriptions Section */}
        <GridItem colSpan={[12, 12, 4]}>
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
                        firstPercentage={`${(item?.remaining_hours / item?.total_hours) * 100} %`}
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
        </GridItem>
      </Grid>

      <AddWardComponent
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
