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
  useToast,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import ParentContainer from '~/lib/layout/ParentContainer';

import { useParams, useRouter } from 'next/navigation';
import { FaCircleCheck } from 'react-icons/fa6';
import Tutor from '~/lib/components/tutor';
import TutorParent from '~/lib/components/tutor-parent';
import {
  useLazyGetACourseQuery,
  useLazyGetCourseTutorQuery,
} from '~/lib/services/parent-mutation';
const data = [
  { id: 1, name: 'Joseph Doe', class: 'K6', img: '/images/ward.svg' },
  { id: 2, name: 'Simisola James', class: 'K8', img: '/images/ward-2.svg' },
];
const oldData = [
  {
    id: 1,
    name: 'You will learn how to design beautiful websites using Figma, an interface design tool used by designers at Uber, Airbnb and Microsoft. ',
    value: 'Nickjonas34@gmail.com',
  },
  {
    id: 2,
    name: 'You will learn how to take your designs and build them into powerful websites using Webflow, a state of the art site builder used by teams at Dell, NASA and more. ',
    value: 'Nickjonas34@gmail.com',
  },
  {
    id: 3,
    name: 'You will learn secret tips of Freelance Web Designers and how they make great money freelancing online. ',
    value: 'Nickjonas34@gmail.com',
  },
  {
    id: 4,
    name: 'Learn to use Python professionally, learning both Python 2 and Python 3!',
    value: 'Nickjonas34@gmail.com',
  },
  {
    id: 5,
    name: 'Understand how to use both the Jupyter Notebook and create .py files ',
    value: 'Nickjonas34@gmail.com',
  },
  {
    id: 6,
    name: 'Get an understanding of how to create GUIs in the Jupyter Notebook system!',
    value: 'Nickjonas34@gmail.com',
  },
];
const SingleCourses = () => {
  const router = useRouter();
  const { id } = useParams();
  const toast = useToast();
  const [courseData, setCourseData] = useState<any>([]);
  const [tutor, setTutorData] = useState<any>([]);
  const [trigger, { data, isLoading, isError, error, isSuccess }] =
    useLazyGetACourseQuery();
  const [triggerTutor, tutorData] = useLazyGetCourseTutorQuery();

  useEffect(() => {
    trigger(id);
    triggerTutor(id);
  }, [id]);
  useEffect(() => {
    if (isSuccess) {
      setCourseData(data?.data);
    }
    if (isError) {
      toast({
        //@ts-ignore
        title: error?.error?.message || 'An error occured',
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
    const { data, isError, error, isSuccess } = tutorData;
    if (isSuccess) {
      setTutorData(data?.data);
    }
    if (isError) {
      toast({
        //@ts-ignore
        title: error?.error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [setTutorData]);
  return (
    <ParentContainer>
      <Stack alignItems={'center'}>
        <VStack py={9} px={9} w={{ lg: '100%' }}>
          <Text
            color={'#1D2026'}
            textAlign={'left'}
            alignSelf={'flex-start'}
            fontSize={'36px'}
            fontWeight={700}
            mb={2}
          >
            {courseData?.title}
          </Text>
          <Text
            color={'#4E5566'}
            fontSize={'24px'}
            mb={2}
            fontWeight={300}
            textAlign={'left'}
            alignSelf={'flex-start'}
          >
            {courseData?.short_description}
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
                Tutors
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel py={8}>
                <Stack>
                  <Heading
                    color={'#1D2026'}
                    fontSize={'26px'}
                    fontWeight={700}
                    mb={2}
                  >
                    Description
                  </Heading>
                  <Text color={'#4E5566'} fontSize={'16px'} mb={2}>
                    {courseData?.description}
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

                    <List spacing={2} display={'flex'} flexWrap={'wrap'}>
                      {courseData?.achievements?.map((item: any) => (
                        <ListItem
                          key={item?.id}
                          color={'#4E5566'}
                          w={'50%'}
                          fontSize={{ base: 14, md: 16 }}
                        >
                          <ListIcon as={FaCircleCheck} color="#009933" />
                          {item.description}
                        </ListItem>
                      ))}
                    </List>
                  </Stack>
                </Stack>
              </TabPanel>

              <TabPanel py={8}>
                <TutorParent />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Stack>
    </ParentContainer>
  );
};

export default SingleCourses;
