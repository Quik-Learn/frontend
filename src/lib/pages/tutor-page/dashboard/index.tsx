'use client';
import { Avatar, HStack, Icon, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import TutorContainer from '~/lib/layout/TutorContainer';
import useDashboardHook from './useDashboard';
import { PiCrownSimple } from 'react-icons/pi';
import { FaStar } from 'react-icons/fa';
import { GoPeople } from 'react-icons/go';
const dashboardItems = [
  {
    id: 1,
    name: 'Active Courses',
    count: 4,
    icon: '/images/active-courses.svg',
    bg: '#EBEBFF',
  },
  {
    id: 1,
    name: 'Online Courses',
    count: 3,
    icon: '/images/online-courses.svg',
    bg: '#E1F7E3',
  },
  {
    id: 1,
    name: 'Completed Sessions',
    count: 951,
    icon: '/images/completed-courses.svg',
    bg: '#E1F7E3',
  },
  {
    id: 1,
    name: 'Enrolled Students',
    count: 1677,
    icon: '/images/enrolled-student.svg',
    bg: '#FFF0F0',
  },
];
const Dashboard = () => {
  const { data, isLoading } = useDashboardHook();
  return (
    <TutorContainer>
      <Stack p={'32px'}>
        <HStack
          bg={'#0A52A8'}
          height={158}
          borderRadius={'4px'}
          px={'32px'}
          py={'24px'}
        >
          <Avatar
            name={`${data?.user?.firstname} ${data?.user?.lastname}`}
            src={data?.user?.profile_image}
            bg={'#fff'}
            color={'#0A52A8'}
            size="xl"
          />
          <VStack
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            flex={1}
          >
            <HStack>
              <Text color={'#fff'} fontSize={32} fontWeight={600}>
                {data?.user?.firstname} {data?.user?.lastname}
              </Text>
              {data?.user?.rating > 4.5 ? (
                <HStack bg={'rgba(2, 101, 156, 0.3)'} gap={2} p={1}>
                  <Icon as={PiCrownSimple} color={'#FF8C00'} />
                  <Text color={'#fff'}>Top Rated</Text>
                </HStack>
              ) : null}
            </HStack>
            <Text color={'#fff'} fontSize={16} textAlign={'left'}>
              {data?.user?.bio}
            </Text>
          </VStack>
        </HStack>
      </Stack>
    </TutorContainer>
  );
};

export default Dashboard;
