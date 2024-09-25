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
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FiClock } from 'react-icons/fi';
import { IoChevronBackOutline } from 'react-icons/io5';
import { IoChevronForwardOutline } from 'react-icons/io5';

import * as yup from 'yup';
import { PiStudent } from 'react-icons/pi';
import { LuDot } from 'react-icons/lu';
import ParentContainer from '~/lib/layout/ParentContainer';
import { coursesArray, sessionArray } from '~/lib/utils/nav';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Button from '~/lib/components/ui/button';
import CalenderComponent from '~/lib/components/CalenderComponent';
const data = [
  { id: 1, name: 'Joseph Doe', class: 'K6', img: '/images/ward.svg' },
  { id: 2, name: 'Simisola James', class: 'K8', img: '/images/ward-2.svg' },
];
const oldData = [
  { id: 1, name: 'Nick Jonas ', value: 'Nickjonas34@gmail.com' },
  { id: 2, name: 'Nick Jonas ', value: 'Nickjonas34@gmail.com' },
  { id: 3, name: 'Nick Jonas ', value: 'Nickjonas34@gmail.com' },
];
const MySessions = () => {
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
    <Box borderRadius="md" boxShadow="md" overflow="hidden" bg="white" mb={10}>
      <Image src={imageSrc} alt={title} w="100%" h={320} objectFit="cover" />
      <VStack p={4} align="start" gap={4}>
        <Heading size="md" fontWeight="medium">
          {title}
        </Heading>

        <HStack justify="space-between" w="100%">
          <HStack spacing={1}>
            <Icon as={FiClock} />
            <Text fontSize="base" color="#4D4C5C" fontWeight="semibold">
              {duration}
            </Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={PiStudent} />
            <Tooltip hasArrow label="Phone number" fontSize="md">
              <Text fontSize="base" color="#4D4C5C" fontWeight="semibold">
                {learners} Learners
              </Text>
            </Tooltip>
          </HStack>
        </HStack>
        <Tooltip
          hasArrow
          bg="white"
          label={
            <Box
              p={2}
              borderRadius={12}
              boxShadow="5px 5px 18px rgba(0, 0, 0, 0.03)"
            >
              <VStack p={4} align="start" gap={4}>
                <Heading size="base" fontWeight="medium" color="black">
                  {title}
                </Heading>

                <HStack justify="space-between" w="100%">
                  <HStack spacing={1}>
                    <Icon as={FiClock} />
                    <Text fontSize="sm" color="#4D4C5C" fontWeight="semibold">
                      {duration}
                    </Text>
                  </HStack>
                  <HStack spacing={1}>
                    <Icon as={PiStudent} />

                    <Text fontSize="sm" color="#4D4C5C" fontWeight="semibold">
                      {learners} Learners
                    </Text>
                  </HStack>
                </HStack>
                <Text fontSize="xs" color="#59595A">
                  Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam
                  eget elit id imperdiet{' '}
                </Text>
                <List spacing={3}>
                  <ListItem fontSize="xs" color="#59595A">
                    <ListIcon as={LuDot} color="green.500" />
                    Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse
                    in velit fringilla feugiat senectus in.
                  </ListItem>
                  <ListItem fontSize="xs" color="#59595A">
                    <ListIcon as={LuDot} color="green.500" />
                    Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse
                    in velit fringilla feugiat senectus in.
                  </ListItem>
                  <ListItem fontSize="xs" color="#59595A">
                    <ListIcon as={LuDot} color="green.500" />
                    Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse
                    in velit fringilla feugiat senectus in.
                  </ListItem>
                </List>
              </VStack>
            </Box>
          }
          placement="top"
          fontSize="md"
        >
          <ChakraButton
            width="full"
            bg="#C6C6C6"
            variant="outline"
            color="white"
            borderRadius={10}
            onClick={() => router.push('/student/book-session/1')}
          >
            View Details
          </ChakraButton>
        </Tooltip>
      </VStack>
    </Box>
  );

  return (
    <ParentContainer>
      <Text color={'black'} m={6} fontSize={'26px'} fontWeight={500}>
        My Sessions
      </Text>
      {/* <HStack
        justifyContent={'space-between'}
        alignItems={'center'}
        px={6}
        mb={6}
      >
        <HStack>
          <Text mx={6} color={'#5F5F5F'} fontSize={20}>
            02 - 08 March
          </Text>
          <HStack>
            <Icon as={IoChevronBackOutline} />
            <Icon as={IoChevronForwardOutline} />
          </HStack>
        </HStack>
        <Button width={'262px'} text="Book a session" bg="#0177FB" />
      </HStack> */}
      <CalenderComponent />
    </ParentContainer>
  );
};

export default MySessions;
