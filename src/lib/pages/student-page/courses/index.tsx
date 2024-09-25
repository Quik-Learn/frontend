'use client';

import {
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  VStack,
  useDisclosure,
  HStack,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
  Box,
  Heading,
  Icon,
  Tooltip,
  List,
  ListItem,
  ListIcon,
  Button as ChakraButton,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FiClock } from 'react-icons/fi';
import * as yup from 'yup';
import { PiStudent } from 'react-icons/pi';
import { LuDot } from 'react-icons/lu';
import ParentContainer from '~/lib/layout/ParentContainer';
import { coursesArray } from '~/lib/utils/nav';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { useRouter } from 'next/navigation';
const data = [
  { id: 1, name: 'Joseph Doe', class: 'K6', img: '/images/ward.svg' },
  { id: 2, name: 'Simisola James', class: 'K8', img: '/images/ward-2.svg' },
];
const oldData = [
  { id: 1, name: 'Nick Jonas ', value: 'Nickjonas34@gmail.com' },
  { id: 2, name: 'Nick Jonas ', value: 'Nickjonas34@gmail.com' },
  { id: 3, name: 'Nick Jonas ', value: 'Nickjonas34@gmail.com' },
];
const Courses = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formRef = useRef(null);
  const router = useRouter();
  const [neww, setNew] = useState('');
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState('');
  const signInSchema = yup.object().shape({
    first_name: yup.string().required('Please confirm password'),

    last_name: yup.string().required('Please confirm password'),
    age: yup.string().required('Please confirm password'),
    gender: yup.string().required('Please confirm password'),
    email_address: yup.string().required('Please confirm password'),
  });

  const initialValues: any = {
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
    email_address: '',
  };
  const CourseCard = ({
    title,
    description,
    imageSrc,
    duration,
    learners,
    router,
  }: any) => (
    <Box
      borderRadius="md"
      display={'flex'}
      boxShadow="md"
      overflow="hidden"
      bg="white"
      mb={10}
      h={176}
      gap={5}
      p={2}
      onClick={() => router.push('/student/courses/1')}
    >
      <Image
        src={imageSrc}
        alt={title}
        w="154px"
        h={'100%'}
        objectFit="cover"
      />
      <VStack p={4} align="center" justify={'center'} gap={4} h={'100%'}>
        <Heading fontSize={13} fontWeight="medium" color={'black'}>
          {title}
        </Heading>

        <HStack justifyContent="space-between" w={'100%'}>
          <HStack spacing={1} justifyContent={'center'} alignItems={'center'}>
            <Icon as={FiClock} size={'sm'} color={'#4D4C5C'} />
            <Text fontSize={10} color="#4D4C5C" fontWeight="semibold">
              {duration}
            </Text>
          </HStack>
          <HStack spacing={1} justifyContent={'center'} alignItems={'center'}>
            <Icon as={PiStudent} color={'#4D4C5C'} />

            <Text fontSize={10} color="#4D4C5C" fontWeight="semibold">
              {learners} Students
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );

  return (
    <ParentContainer>
      <Tabs w={'100%'} mt={8}>
        <TabList border={'none'} defaultValue={'Active Courses'}>
          <Tab
            fontSize={{
              base: 16,
              sm: 18,
              md: 18,
            }}
            value={'Active Courses'}
            _selected={{
              color: '#FF8C00',
              borderBottomWidth: 2,
              borderColor: '#FF8C00',
            }}
            fontFamily="heading"
            fontWeight="500"
            color={'#5F5F5F'}
          >
            Active Courses
          </Tab>
          <Tab
            fontSize={{
              base: 16,
              sm: 18,
              md: 18,
            }}
            _selected={{
              color: '#FF8C00',
              borderBottomWidth: 2,
              borderColor: '#FF8C00',
            }}
            value={'Completed Courses'}
            fontFamily="heading"
            fontWeight="500"
            color={'#5F5F5F'}
          >
            Completed Courses
          </Tab>
          <Tab
            fontSize={{
              base: 16,
              sm: 18,
              md: 18,
            }}
            _selected={{
              color: '#FF8C00',
              borderBottomWidth: 2,
              borderColor: '#FF8C00',
            }}
            fontFamily="heading"
            fontWeight="500"
            color={'#5F5F5F'}
          >
            All Courses
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {' '}
            <Box m={6}>
              <Grid
                templateColumns={{
                  base: '90vw',
                  lg: 'repeat(auto-fill, minmax(300px, 1fr))',
                }}
                gap={4}
              >
                {coursesArray.map((course, index) => (
                  <GridItem key={index}>
                    <CourseCard
                      title={course.title}
                      description={course.description}
                      imageSrc={course.imageSrc}
                      duration={course.duration}
                      learners={course.learners}
                      router={router}
                    />
                  </GridItem>
                ))}
              </Grid>
            </Box>
            <HStack
              justify="space-between"
              mt={8}
              width="full"
              flexDirection={{ base: 'column', lg: 'row' }}
            >
              <HStack spacing={2}>
                <ChakraButton
                  leftIcon={<Text as="span">&larr;</Text>}
                  colorScheme="gray"
                  variant="outline"
                >
                  Prev
                </ChakraButton>

                <ChakraButton
                  rightIcon={<Text as="span">&rarr;</Text>}
                  colorScheme="gray"
                  variant="outline"
                >
                  Next
                </ChakraButton>
              </HStack>
              <HStack spacing={2}>
                <IconButton
                  aria-label="Previous page"
                  icon={<MdKeyboardDoubleArrowLeft />}
                  colorScheme="gray"
                  variant="ghost"
                  isDisabled
                />
                {Array.from({ length: 3 }).map((_, index) => (
                  <ChakraButton
                    key={index}
                    colorScheme={index === 0 ? 'blue' : 'gray'}
                    variant={index === 0 ? 'solid' : 'outline'}
                  >
                    {index + 1}
                  </ChakraButton>
                ))}
                <IconButton
                  aria-label="Next page"
                  icon={<MdKeyboardDoubleArrowRight />}
                  colorScheme="blue"
                  variant="ghost"
                />
              </HStack>
            </HStack>
          </TabPanel>
          <TabPanel>
            {' '}
            <Box m={6}>
              <Grid
                templateColumns={{
                  base: '90vw',
                  lg: 'repeat(auto-fill, minmax(300px, 1fr))',
                }}
                gap={4}
              >
                {coursesArray?.slice(2, 4).map((course, index) => (
                  <GridItem key={index}>
                    <CourseCard
                      title={course.title}
                      description={course.description}
                      imageSrc={course.imageSrc}
                      duration={course.duration}
                      learners={course.learners}
                      router={router}
                    />
                  </GridItem>
                ))}
              </Grid>
            </Box>
            <HStack
              justify="space-between"
              mt={8}
              width="full"
              flexDirection={{ base: 'column', lg: 'row' }}
            >
              <HStack spacing={2}>
                <ChakraButton
                  leftIcon={<Text as="span">&larr;</Text>}
                  colorScheme="gray"
                  variant="outline"
                >
                  Prev
                </ChakraButton>

                <ChakraButton
                  rightIcon={<Text as="span">&rarr;</Text>}
                  colorScheme="gray"
                  variant="outline"
                >
                  Next
                </ChakraButton>
              </HStack>
              <HStack spacing={2}>
                <IconButton
                  aria-label="Previous page"
                  icon={<MdKeyboardDoubleArrowLeft />}
                  colorScheme="gray"
                  variant="ghost"
                  isDisabled
                />
                {Array.from({ length: 3 }).map((_, index) => (
                  <ChakraButton
                    key={index}
                    colorScheme={index === 0 ? 'blue' : 'gray'}
                    variant={index === 0 ? 'solid' : 'outline'}
                  >
                    {index + 1}
                  </ChakraButton>
                ))}
                <IconButton
                  aria-label="Next page"
                  icon={<MdKeyboardDoubleArrowRight />}
                  colorScheme="blue"
                  variant="ghost"
                />
              </HStack>
            </HStack>
          </TabPanel>
          <TabPanel>
            {' '}
            <Box m={6}>
              <Grid
                templateColumns={{
                  base: '90vw',
                  lg: 'repeat(auto-fill, minmax(300px, 1fr))',
                }}
                gap={4}
              >
                {coursesArray.map((course, index) => (
                  <GridItem key={index}>
                    <CourseCard
                      title={course.title}
                      description={course.description}
                      imageSrc={course.imageSrc}
                      duration={course.duration}
                      learners={course.learners}
                      router={router}
                    />
                  </GridItem>
                ))}
              </Grid>
            </Box>
            <HStack
              justify="space-between"
              mt={8}
              width="full"
              flexDirection={{ base: 'column', lg: 'row' }}
            >
              <HStack spacing={2}>
                <ChakraButton
                  leftIcon={<Text as="span">&larr;</Text>}
                  colorScheme="gray"
                  variant="outline"
                >
                  Prev
                </ChakraButton>

                <ChakraButton
                  rightIcon={<Text as="span">&rarr;</Text>}
                  colorScheme="gray"
                  variant="outline"
                >
                  Next
                </ChakraButton>
              </HStack>
              <HStack spacing={2}>
                <IconButton
                  aria-label="Previous page"
                  icon={<MdKeyboardDoubleArrowLeft />}
                  colorScheme="gray"
                  variant="ghost"
                  isDisabled
                />
                {Array.from({ length: 3 }).map((_, index) => (
                  <ChakraButton
                    key={index}
                    colorScheme={index === 0 ? 'blue' : 'gray'}
                    variant={index === 0 ? 'solid' : 'outline'}
                  >
                    {index + 1}
                  </ChakraButton>
                ))}
                <IconButton
                  aria-label="Next page"
                  icon={<MdKeyboardDoubleArrowRight />}
                  colorScheme="blue"
                  variant="ghost"
                />
              </HStack>
            </HStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ParentContainer>
  );
};

export default Courses;
