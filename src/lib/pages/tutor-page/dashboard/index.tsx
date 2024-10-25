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
          justifyContent={'space-between'}
        >
          <HStack>
            <Avatar
              name={`${data?.user?.firstname} ${data?.user?.lastname}`}
              src={data?.user?.profile_image}
              bg={'#fff'}
              color={'#0A52A8'}
              size="xl"
            />
            <VStack justifyContent={'flex-start'} alignItems={'flex-start'}>
              <HStack>
                <Text color={'#fff'} fontSize={20} fontWeight={600}>
                  {/* {data?.user?.firstname} {data?.user?.lastname} */}
                  Vako Shvili
                </Text>
                {data?.user?.rating > 4.5 ? (
                  <HStack bg={'rgba(2, 101, 156, 0.3)'} gap={2} p={1}>
                    <Icon as={PiCrownSimple} color={'#FF8C00'} />
                    <Text color={'#fff'}>Top Rated</Text>
                  </HStack>
                ) : null}
              </HStack>
              <Text color={'#fff'} fontSize={14} textAlign={'left'}>
                {/* {data?.user?.bio} */}
                vako.shvili@gmail.com
              </Text>
            </VStack>
          </HStack>
          <HStack w={'450px'}>
            <Text fontWeight={500} fontSize={14}>
              1/4 Steps
            </Text>
            <ProgressBar firstPercentage="25%" bg1="#F0F0F0" bg2="#23BD33" />
            <Text fontWeight={600} fontSize={16}>
              25% Completed
            </Text>
          </HStack>

          <HStack>
            <Button text="Edit Profile" bg="#FF6636" width={'131px'} />
            <IconButton
              aria-label="icon"
              icon={<IoArrowDown />}
              bg={'#FFFFFF0D'}
              w={'48px'}
              h={'48px'}
              borderRadius={5}
            />
          </HStack>
        </HStack>
        <SimpleGrid columns={4} spacing={10} mt={7}>
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
        <Grid mt={10} gap={5} templateColumns="repeat(9, 1fr)">
          <GridItem colSpan={4}>
            <OverallRating />
          </GridItem>
          <GridItem colSpan={3}>
            <RecentActivity />
          </GridItem>
          <GridItem colSpan={2}>
            <ProfilevIew />
          </GridItem>
        </Grid>
      </Stack>
    </TutorContainer>
  );
};

export default Dashboard;
