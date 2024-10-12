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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ParentContainer from '~/lib/layout/ParentContainer';
import { useParams, useRouter } from 'next/navigation';
import { FaCircleCheck } from 'react-icons/fa6';
import TutorParent from '~/lib/components/tutor-parent';
import {
  useLazyGetACourseQuery,
  useLazyGetCourseTutorQuery,
} from '~/lib/services/parent-mutation';

const SingleCourses = () => {
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
  console.log(tutors);
  useEffect(() => {
    const { data, isError, error, isSuccess } = tutorData;
    if (isSuccess) {
      setTutorData(data?.data);
    }
    if (isError) {
      // toast({
      //   //@ts-ignore
      //   title: error?.error?.message || 'An error occured',
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
                  </Stack>
                </Stack>
              </TabPanel>

              <TabPanel py={8}>
                {tutors?.length === 0 ? (
                  <Stack>
                    <Heading>No Tutor Found</Heading>
                  </Stack>
                ) : (
                  <TutorParent
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
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Stack>
    </ParentContainer>
  );
};

export default SingleCourses;
