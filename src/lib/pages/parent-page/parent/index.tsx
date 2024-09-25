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
  const { data, isLoading } = useDashboardHook();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

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
        {/* Welcome Section */}
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
                onClick={() => router?.push('/parent/courses')}
              />
              <Button
                fontWeight={500}
                color="#5F5F5F"
                bg="white"
                onClick={() => {
                  setNew('');
                  onOpen();
                }}
                text="Add a Ward"
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
                0
              </Text>
              <Text
                fontSize="15px"
                fontWeight={900}
                textAlign={'center'}
                color={'#0065FF'}
              >
                Active Students
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
                0{' '}
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
                0{' '}
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

          <Box
            borderRadius={10}
            boxShadow={'base'}
            bg={'#fff'}
            height={'350px'}
          >
            <Linecharts />
          </Box>
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
          >
            {false ? (
              <>
                <Text
                  my="4"
                  fontWeight={700}
                  textAlign={'center'}
                  color={'#5F5F5F'}
                  fontSize={36}
                >
                  No Active Subscription
                </Text>
                <Button width={'225px'} bg="#0065FF" text="Add a Ward" />
              </>
            ) : (
              <>
                <Text
                  fontWeight="bold"
                  textAlign={'left'}
                  fontSize={18}
                  mb="1"
                  color={'#5F5F5F'}
                >
                  Basic Plan
                </Text>
                <Box mb="2" w={'100%'}>
                  <ProgressBar
                    firstPercentage={'70%'}
                    secondPercentage={'30%'}
                  />

                  <HStack justifyContent={'space-between'}>
                    <Text
                      fontWeight="bold"
                      textAlign={'left'}
                      fontSize={12}
                      mb="2"
                      color={'#5F5F5F'}
                    >
                      Jacob Doe
                    </Text>
                    <Text
                      textAlign={'left'}
                      fontSize={12}
                      mb="2"
                      color={'#5F5F5F'}
                    >
                      {' '}
                      (20/30hrs)
                    </Text>
                  </HStack>

                  <ProgressBar
                    firstPercentage={'20%'}
                    secondPercentage={'80%'}
                  />
                  <HStack justifyContent={'space-between'}>
                    <Text
                      fontWeight="bold"
                      textAlign={'left'}
                      fontSize={12}
                      mb="2"
                      color={'#5F5F5F'}
                    >
                      Jacob Doe
                    </Text>
                    <Text
                      textAlign={'left'}
                      fontSize={12}
                      mb="2"
                      color={'#5F5F5F'}
                    >
                      {' '}
                      (20/30hrs)
                    </Text>
                  </HStack>
                </Box>

                <Text
                  fontWeight="bold"
                  textAlign={'left'}
                  fontSize={18}
                  mb="1"
                  color={'#5F5F5F'}
                >
                  Standard Plan
                </Text>
                <Box mb="2" w={'100%'}>
                  <Text>Jacob Doe (20/30hrs)</Text>
                  <ProgressBar
                    firstPercentage={'40%'}
                    secondPercentage={'60%'}
                  />
                  <HStack justifyContent={'space-between'}>
                    <Text
                      fontWeight="bold"
                      textAlign={'left'}
                      fontSize={12}
                      mb="2"
                      color={'#5F5F5F'}
                    >
                      Jacob Doe
                    </Text>
                    <Text
                      textAlign={'left'}
                      fontSize={12}
                      mb="2"
                      color={'#5F5F5F'}
                    >
                      {' '}
                      (20/30hrs)
                    </Text>
                  </HStack>
                  <ProgressBar
                    firstPercentage={'50%'}
                    secondPercentage={'50%'}
                  />
                  <HStack justifyContent={'space-between'}>
                    <Text
                      fontWeight="bold"
                      textAlign={'left'}
                      fontSize={12}
                      mb="2"
                      color={'#5F5F5F'}
                    >
                      Jacob Doe
                    </Text>
                    <Text
                      textAlign={'left'}
                      fontSize={12}
                      mb="2"
                      color={'#5F5F5F'}
                    >
                      {' '}
                      (20/30hrs)
                    </Text>
                  </HStack>
                </Box>
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
