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
import { SiPinboard } from 'react-icons/si';
import ParentContainer from '~/lib/layout/ParentContainer';
import { coursesArray } from '~/lib/utils/nav';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { FaCircleCheck } from 'react-icons/fa6';
import Tutor from '~/lib/components/tutor';
import Button from '~/lib/components/ui/button';
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
const SingleSession = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formRef = useRef(null);
  const router = useRouter();
  const [neww, setNew] = useState('');
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState('');

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
            Mathematics - K2 to K5 level, (Advanced Mathematics)
          </Text>
          <Text color={'#4E5566'} fontSize={'24px'} mb={2}>
            3 in 1 Course: Learn to design websites with Figma, build with
            Webflow, and make a living freelancing.
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
                Reviews
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
                    For example, this is a Design course but I don't teach you
                    Photoshop. Because Photoshop is needlessly complicated for
                    Web Design. But people still teach it to web designers. I
                    don't. I teach Figma – a simple tool that is taking over the
                    design world. You will be designing a complete website
                    within a week while others are still learning how to create
                    basic layouts in Photoshop.
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
                    <VStack
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <List
                        spacing={2}
                        display={'flex'}
                        alignItems={'flex-start'}
                      >
                        {oldData?.slice(0, 2).map((item) => (
                          <ListItem
                            w={'50%'}
                            color={'#4E5566'}
                            fontSize={{ base: 14, md: 16 }}
                          >
                            <ListIcon as={FaCircleCheck} color="#009933" />
                            {item.name}
                          </ListItem>
                        ))}
                      </List>
                      <List
                        spacing={2}
                        display={'flex'}
                        alignItems={'flex-start'}
                      >
                        {oldData?.slice(2, 4).map((item) => (
                          <ListItem
                            color={'#4E5566'}
                            w={'50%'}
                            fontSize={{ base: 14, md: 16 }}
                          >
                            <ListIcon as={FaCircleCheck} color="#009933" />
                            {item.name}
                          </ListItem>
                        ))}
                      </List>
                      <List
                        spacing={2}
                        display={'flex'}
                        alignItems={'flex-start'}
                      >
                        {oldData?.slice(4).map((item) => (
                          <ListItem
                            color={'#4E5566'}
                            w={'50%'}
                            fontSize={{ base: 14, md: 16 }}
                          >
                            <ListIcon as={FaCircleCheck} color="#009933" />
                            {item.name}
                          </ListItem>
                        ))}
                      </List>
                    </VStack>
                  </Stack>
                </Stack>
              </TabPanel>

              <TabPanel py={8}>
                <Stack>
                  <Text>Coming Soon</Text>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Stack justifyContent={'flex-end'} alignItems={'flex-end'} w={'100%'}>
            <Button
              text="Next"
              bg="#02659C"
              width={'279px'}
              onClick={() => router.push('/student/book-session/tutors')}
            />
          </Stack>
        </VStack>
      </Stack>
    </ParentContainer>
  );
};

export default SingleSession;
