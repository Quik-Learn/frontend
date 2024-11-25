'use client';

import {
  Stack,
  Text,
  VStack,
  Heading,
  List,
  ListItem,
  ListIcon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ParentContainer from '~/lib/layout/ParentContainer';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { FaCircleCheck } from 'react-icons/fa6';
import {
  useLazyGetACourseQuery,
  useLazyGetCourseTutorQuery,
} from '~/lib/services/parent-mutation';
import PastSessions from '~/lib/components/PastSessions';
import Resources from '~/lib/components/Resources';
import Reviews from '~/lib/components/Reviews';
import Button from '~/lib/components/ui/button';

const SingleCourses = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const type = searchParams?.get('activeTab');
  const { onOpen, isOpen, onClose } = useDisclosure();
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
        title: error?.data?.error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      router.back();
    }
  }, [isSuccess, data, isError, error]);
  console.log(tutors);
  useEffect(() => {
    const { data, isError, error, isSuccess } = tutorData;
    if (isSuccess) {
      setTutorData(data?.data);
    }
    if (isError) {
      // toast({
      //   //@ts-ignore
      //   title: error?.data?.error?.message || 'An error occured',
      //   description: 'An Error occured.',
      //   status: 'error',
      //   duration: 9000,
      //   isClosable: true,
      //   position: 'top',
      // });
    }
  }, [tutorData]);

  return (
    <ParentContainer>
      <Stack>
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
            alignSelf={'flex-start'}
          >
            {courseData?.short_description}
          </Text>

          {type === 'all' ? (
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
                      <VStack
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        w={'100%'}
                      >
                        <List
                          spacing={2}
                          display={'flex'}
                          flexWrap={'wrap'}
                          w={'100%'}
                        >
                          {courseData?.achievements?.map((item: any) => (
                            <ListItem
                              key={item?.id}
                              color={'#4E5566'}
                              w={'45%'}
                              fontSize={{ base: 14, md: 16 }}
                            >
                              <ListIcon as={FaCircleCheck} color="#009933" />
                              {item.description}
                            </ListItem>
                          ))}
                        </List>
                      </VStack>
                    </Stack>
                    <Stack align={'flex-end'} mt={4}>
                      <Button
                        width={'279px'}
                        bg={'#02659C'}
                        onClick={onOpen}
                        text="Next"
                      />
                    </Stack>
                  </Stack>
                </TabPanel>
                <TabPanel py={8}>
                  <Reviews />
                </TabPanel>
              </TabPanels>
            </Tabs>
          ) : (
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
                  Session
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
                  Resources
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
                      <VStack
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        w={'100%'}
                      >
                        <List
                          spacing={2}
                          display={'flex'}
                          flexWrap={'wrap'}
                          w={'100%'}
                        >
                          {courseData?.achievements?.map((item: any) => (
                            <ListItem
                              key={item?.id}
                              color={'#4E5566'}
                              w={'45%'}
                              fontSize={{ base: 14, md: 16 }}
                            >
                              <ListIcon as={FaCircleCheck} color="#009933" />
                              {item.description}
                            </ListItem>
                          ))}
                        </List>
                      </VStack>
                    </Stack>
                  </Stack>
                </TabPanel>
                <TabPanel py={8}>
                  <PastSessions />
                </TabPanel>
                <TabPanel py={8}>
                  <Resources />
                </TabPanel>
                <TabPanel py={8}>
                  <Reviews />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </VStack>
      </Stack>
    </ParentContainer>
  );
};

export default SingleCourses;
