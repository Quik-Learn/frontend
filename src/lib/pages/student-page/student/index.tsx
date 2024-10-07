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
  css,
} from '@chakra-ui/react';

import Button from '~/lib/components/ui/button';
import { LuClock } from 'react-icons/lu';
import { BsThreeDots } from 'react-icons/bs';
import ParentContainer from '~/lib/layout/ParentContainer';
import Linecharts from '~/lib/components/Linecharts';
import { GoPlus } from 'react-icons/go';
import useDashboardHook from './useDashboard';
import { useEffect, useState } from 'react';
import AddWardComponent from '~/lib/components/AddWardComponent';
import { useRouter } from 'next/navigation';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { BsBook } from 'react-icons/bs';
import PieChartComponent from '~/lib/components/piechart';
import { activities, events } from '~/lib/utils/data';
import { IoChevronBackOutline } from 'react-icons/io5';
import { GrFormNext } from 'react-icons/gr';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const Dashboard = () => {
  const { data, isLoading, dashboardData } = useDashboardHook();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [value, onChange] = useState<Value>(new Date());
  const [neww, setNew] = useState('');
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEmpty(false);
    }, 10000);
  }, []);

  return (
    <ParentContainer>
      {empty ? (
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
                  Welcome, {data?.firstname} {data?.lastname}!
                </Text>
                <Text mb="4">Enroll in Courses and find the best Tutors!</Text>

                <Button
                  color="#5F5F5F"
                  fontWeight={500}
                  bg="white"
                  text="View our Offerings"
                  onClick={() => router?.push('/parent/courses')}
                />
              </VStack>
              <HStack alignItems={'flex-end'} gap={0} justifyContent={'center'}>
                <HStack p={0}>
                  <Text
                    color={'#fff'}
                    fontSize={180}
                    lineHeight={'50%'}
                    fontWeight={700}
                  >
                    1
                  </Text>
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
            <Grid gap={3} mt={5}>
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
                <Text color={'#5F5F5F'} fontSize={17}>
                  View all
                </Text>
              </HStack>
              <Grid templateColumns="repeat(12, 1fr)" gap={6} mt={0}>
                <GridItem
                  p="6"
                  display={'flex'}
                  flexDirection={'row'}
                  h={'177px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  borderWidth={1}
                  borderStyle={'dashed'}
                  borderRadius="25px"
                  w={'238px'}
                  borderColor={'rgba(0, 0, 0, 0.75)'}
                >
                  <Icon as={GoPlus} />
                  <Text
                    fontSize="18px"
                    textAlign={'center'}
                    color={'rgba(0, 0, 0, 0.5)'}
                  >
                    Add Course
                  </Text>
                </GridItem>

                {/* <GridItem
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
              </GridItem> */}
              </Grid>
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
                My Schedule
              </Text>
              <BsThreeDots color={'#000000'} />
            </HStack>
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
              }}
            >
              <Calendar
                onChange={onChange}
                value={value}
                selectRange
                prevLabel={<IoChevronBackOutline />}
                nextLabel={<GrFormNext />}
                next2Label={<GrFormNext color="white" />}
                prev2Label={<IoChevronBackOutline color="white" />}
              />
            </Box>
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
                      What are you Waiting for !
                    </Text>
                  </Stack>
                ) : null}
              </Box>
            </VStack>
            <VStack w={'712px'}>
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
            </VStack>
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
                Upcoming Event
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
                    No Upcoming Events
                  </Text>
                </Stack>
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
                    <Progress
                      value={true ? 70 : 30}
                      size="lg"
                      bg={true ? '#FFC727' : '#0065FF'}
                      borderRadius="8px"
                      transition="all 0.3s ease-in-out"
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

                    <Progress
                      value={true ? 20 : 80}
                      size="lg"
                      bg={true ? '#FFC727' : '#0065FF'}
                      borderRadius="8px"
                      transition="all 0.3s ease-in-out"
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
                    <Progress
                      value={true ? 40 : 60}
                      size="lg"
                      bg={true ? '#FFC727' : '#0065FF'}
                      borderRadius="8px"
                      transition="all 0.3s ease-in-out"
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
                    <Progress
                      value={true ? 50 : 50}
                      size="lg"
                      bg={true ? '#FFC727' : '#0065FF'}
                      borderRadius="8px"
                      transition="all 0.3s ease-in-out"
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
      ) : (
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
                  Welcome, {data?.firstname} {data?.lastname}!
                </Text>
                <Text mb="4">Enroll in Courses and find the best Tutors!</Text>
                <HStack gap={10}>
                  <Button
                    color="#5F5F5F"
                    fontWeight={500}
                    bg="white"
                    text="Book A Session"
                    onClick={() => router?.push('/student/book-session')}
                  />{' '}
                  {/* <Button
                    color="#5F5F5F"
                    fontWeight={500}
                    bg="white"
                    text="Add a Parent/Guardian "
                  /> */}
                </HStack>
              </VStack>
              <HStack alignItems={'flex-end'} gap={0} justifyContent={'center'}>
                <HStack p={0}>
                  <Text
                    color={'#fff'}
                    fontSize={180}
                    lineHeight={'50%'}
                    fontWeight={700}
                  >
                    9
                  </Text>
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
            <Grid gap={3} mt={5}>
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
                <Text color={'#5F5F5F'} fontSize={17}>
                  View all
                </Text>
              </HStack>
              <Grid templateColumns="repeat(12, 1fr)" gap={3} mt={0}>
                <GridItem
                  colSpan={[12, 6, 3]}
                  bg="#E1E2F6"
                  p="6"
                  display={'flex'}
                  flexDirection={'column'}
                  h={'177px'}
                  justifyContent={'flex-start'}
                  alignItems={'flex-start'}
                  borderRadius="md"
                >
                  <Image
                    src="/images/two.svg"
                    bg={'white'}
                    w={6}
                    h={6}
                    p={1}
                    borderRadius={'50%'}
                    alt="active"
                  />
                  <Text
                    mt={2}
                    fontSize="16px"
                    fontWeight={300}
                    color={'#161736'}
                  >
                    Mathematics (Intermediate)
                  </Text>
                  <HStack
                    bg={'#FCF9FF'}
                    borderRadius={'11px'}
                    py={3}
                    px={3}
                    w={'126px'}
                    mt={2}
                  >
                    <HStack gap={2}>
                      <Icon as={BsBook} color={'#161736'} />
                      <Text color={'#161736'}>0</Text>
                    </HStack>
                    <HStack>
                      <Icon as={LuClock} color={'#161736'} />
                      <Text color={'#161736'}>13h</Text>
                    </HStack>
                  </HStack>
                </GridItem>
                <GridItem
                  colSpan={[12, 6, 3]}
                  bg="#F8EFE2"
                  p="6"
                  display={'flex'}
                  flexDirection={'column'}
                  h={'177px'}
                  justifyContent={'flex-start'}
                  alignItems={'flex-start'}
                  borderRadius="md"
                >
                  <Image
                    src="/images/two.svg"
                    bg={'white'}
                    w={6}
                    h={6}
                    p={1}
                    borderRadius={'50%'}
                    alt="active"
                  />
                  <Text
                    mt={2}
                    fontSize="16px"
                    fontWeight={300}
                    color={'#161736'}
                  >
                    Geography (Basic)
                  </Text>
                  <HStack
                    bg={'#FAF5EC'}
                    borderRadius={'11px'}
                    py={3}
                    px={3}
                    w={'126px'}
                    mt={2}
                  >
                    <HStack gap={2}>
                      <Icon as={BsBook} color={'#161736'} />
                      <Text color={'#161736'}>0</Text>
                    </HStack>
                    <HStack>
                      <Icon as={LuClock} color={'#161736'} />
                      <Text color={'#161736'}>13h</Text>
                    </HStack>
                  </HStack>
                </GridItem>
                <GridItem
                  colSpan={[12, 6, 3]}
                  bg="#EFF7E2"
                  p="6"
                  display={'flex'}
                  flexDirection={'column'}
                  h={'177px'}
                  justifyContent={'flex-start'}
                  alignItems={'flex-start'}
                  borderRadius="md"
                >
                  <Image
                    src="/images/three.svg"
                    bg={'white'}
                    w={6}
                    h={6}
                    p={1}
                    borderRadius={'50%'}
                    alt="active"
                  />
                  <Text
                    mt={8}
                    fontSize="16px"
                    fontWeight={300}
                    color={'#161736'}
                  >
                    Motion Design
                  </Text>
                  <HStack
                    bg={'#F6FBEE'}
                    borderRadius={'11px'}
                    py={3}
                    px={3}
                    w={'126px'}
                    mt={2}
                  >
                    <HStack gap={2}>
                      <Icon as={BsBook} color={'#161736'} />
                      <Text color={'#161736'}>0</Text>
                    </HStack>
                    <HStack>
                      <Icon as={LuClock} color={'#161736'} />
                      <Text color={'#161736'}>13h</Text>
                    </HStack>
                  </HStack>
                </GridItem>
                <GridItem
                  colSpan={[12, 6, 3]}
                  bg="#EFF7E2"
                  p="6"
                  display={'flex'}
                  flexDirection={'column'}
                  h={'177px'}
                  justifyContent={'flex-start'}
                  alignItems={'flex-start'}
                  borderRadius="md"
                >
                  <Image
                    src="/images/four.svg"
                    bg={'white'}
                    w={6}
                    h={6}
                    p={1}
                    borderRadius={'50%'}
                    alt="active"
                  />
                  <Text
                    mt={8}
                    fontSize="16px"
                    fontWeight={300}
                    color={'#161736'}
                  >
                    Motion Design
                  </Text>
                  <HStack
                    bg={'#F6FBEE'}
                    borderRadius={'11px'}
                    py={3}
                    px={3}
                    w={'126px'}
                    mt={2}
                  >
                    <HStack gap={2}>
                      <Icon as={BsBook} />
                      <Text>0</Text>
                    </HStack>
                    <HStack>
                      <Icon as={LuClock} />
                      <Text>13h</Text>
                    </HStack>
                  </HStack>
                </GridItem>{' '}
              </Grid>
            </Grid>
          </GridItem>

          {/* Profile Card */}
          <GridItem colSpan={[12, 12, 4]} h={'70%'}>
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
              }}
            >
              <Calendar
                onChange={onChange}
                value={value}
                selectRange
                prevLabel={<IoChevronBackOutline />}
                nextLabel={<GrFormNext />}
                next2Label={<GrFormNext color="white" />}
                prev2Label={<IoChevronBackOutline color="white" />}
              />
            </Box>
          </GridItem>

          {/* Wards Engagements Section */}
          <GridItem
            colSpan={[12, 12, 8]}
            justifyItems={'center'}
            display={'flex'}
            flexDir={'row'}
            gap={6}
          >
            <VStack w={'276px'}>
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

              <Box
                borderRadius={10}
                boxShadow={'base'}
                bg={'#fff'}
                w={'100%'}
                height={'300px'}
              >
                {false ? (
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
                      What are you Waiting for !
                    </Text>
                  </Stack>
                ) : (
                  <Stack
                    w={'100%'}
                    h={'100%'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Stack w={'100%'} h={'100%'}>
                      <PieChartComponent />
                    </Stack>
                    <Text
                      fontSize={22}
                      fontWeight={700}
                      textAlign={'center'}
                      color={'#FF8C00'}
                    >
                      36 Hours Left
                    </Text>
                  </Stack>
                )}
              </Box>
            </VStack>
            <VStack w={'712px'}>
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

              <Box
                borderRadius={10}
                boxShadow={'base'}
                bg={'#fff'}
                w={'100%'}
                height={'300px'}
              >
                {false ? (
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
                ) : (
                  <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                    <Text fontSize="lg" fontWeight="bold" mb={4}>
                      Recent Activities
                    </Text>
                    <VStack align="start" spacing={4}>
                      {activities.map((activity: any) => (
                        <Box
                          key={activity.id}
                          w="100%"
                          p={3}
                          borderBottomWidth={2}
                          borderBottomColor={'#ECECEC'}
                        >
                          <HStack spacing={4} align="start">
                            <IconButton
                              icon={<Image src={activity.icon} alt="alt" />}
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
                                {activity.type}
                              </Text>
                              <Text
                                fontSize="10px"
                                color={'#8A8A8A'}
                                fontWeight="700"
                              >
                                {activity.description}
                              </Text>
                              {activity.course && (
                                <Text
                                  fontSize="10px"
                                  color={'#8A8A8A'}
                                  fontWeight="700"
                                >
                                  Course: {activity.course}
                                </Text>
                              )}
                              {activity.tutor && (
                                <Text
                                  fontSize="10px"
                                  color={'#8A8A8A'}
                                  fontWeight="700"
                                >
                                  Tutor: {activity.tutor}
                                </Text>
                              )}
                              {activity.due && (
                                <Text
                                  fontSize="10px"
                                  color={'#8A8A8A'}
                                  fontWeight="700"
                                >
                                  Due: {activity.due}
                                </Text>
                              )}
                            </Box>
                            <HStack>
                              <Text fontSize="sm" color="gray.500">
                                {activity.time}
                              </Text>
                              {activity.link && (
                                <Link color="blue.500" fontSize="sm">
                                  {activity.link}
                                </Link>
                              )}
                            </HStack>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                )}
              </Box>
            </VStack>
          </GridItem>

          {/* Subscriptions Section */}
          <GridItem colSpan={[12, 12, 4]} mt={-10}>
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
            <VStack
              bg={'#fff'}
              px={3}
              py={6}
              mb={3}
              borderRadius={10}
              boxShadow={'base'}
            >
              {false ? (
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
                    No Upcoming Events
                  </Text>
                </Stack>
              ) : (
                <>
                  <Box bg="white" p={2} borderRadius="md" boxShadow="md">
                    <VStack align="start">
                      {events.map((event: any) => (
                        <HStack
                          key={event.id}
                          w="100%"
                          align="center"
                          borderRadius={6}
                          p={2}
                          bg="rgba(165, 180, 203, 0.2)"
                        >
                          <Box bg={event.color} w={8} h={8} borderRadius="md" />
                          <Box flex="1">
                            <Text fontSize="16px" color="#161736">
                              {event.title}
                            </Text>
                            <Text fontSize="14px" color="#7D8DA6">
                              • {event.day} • {event.time}
                            </Text>
                          </Box>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>
                </>
              )}
            </VStack>
          </GridItem>
        </Grid>
      )}

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
