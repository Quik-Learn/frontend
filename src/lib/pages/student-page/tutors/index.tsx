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
import { SiPinboard } from 'react-icons/si';
import ParentContainer from '~/lib/layout/ParentContainer';
import { coursesArray } from '~/lib/utils/nav';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { useParams, useRouter } from 'next/navigation';
import { FaCircleCheck } from 'react-icons/fa6';
import Tutor from '~/lib/components/tutor';
import { CiSearch } from 'react-icons/ci';
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
const Tutors = () => {
  const router = useRouter();
  const { id } = useParams();
  const toast = useToast();
  const [courseData, setCourseData] = useState<any>([]);
  const [tutors, setTutorData] = useState<any>([]);
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
    }
  }, [tutorData]);

  return (
    <ParentContainer>
      <Text color={'black'} m={6} fontSize={'26px'} fontWeight={500}>
        Select a Tutor
      </Text>

      <Text mx={6} my={6} color={'#5F5F5F'} fontSize={20}>
        To book a tutor, first Select a course!
      </Text>

      {tutors?.length === 0 ? (
        <Stack>
          <Heading>No Tutor Found</Heading>
        </Stack>
      ) : (
        <Tutor
          id={id}
          tutors={tutors}
          title={courseData?.title}
          total_pages={tutorData?.data?.total_pages}
          isLoading={tutorData?.isLoading}
          currentPage={tutorData?.data?.current_page}
          next={tutorData?.data?.next}
          previous={tutorData?.data?.previous}
          getTutor={(page: number) => triggerTutor(page)}
        />
      )}
    </ParentContainer>
  );
};

export default Tutors;
