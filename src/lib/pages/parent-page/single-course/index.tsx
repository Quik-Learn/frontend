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
  useBookSessionParentMutation,
  useGetWardsQuery,
  useLazyGetACourseQuery,
  useLazyGetCourseTutorQuery,
} from '~/lib/services/parent-mutation';
import Button from '~/lib/components/ui/button';
import ChooseWard from '~/lib/components/ChooseWard';
import BookLesson from '~/lib/components/BookLesson';

const SingleCourses = () => {
  const router = useRouter();
  const { id } = useParams();
  const toast = useToast();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    onOpen: onOpenBook,
    isOpen: isOpenBook,
    onClose: onCloseBook,
  } = useDisclosure();
  const searchParams = useSearchParams();
  const ward_id = searchParams.get('ward_id');
  const [courseData, setCourseData] = useState<any>([]);
  const [tutors, setTutorData] = useState<any>([]);
  const [trigger, { data, isLoading, isError, error, isSuccess }] =
    useLazyGetACourseQuery();
  const [triggerTutor, tutorData] = useLazyGetCourseTutorQuery();
  const [bookSessionStudent, bookSessionStudentData] =
    useBookSessionParentMutation();
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
                <Stack
                  justifyContent={'flex-end'}
                  alignItems={'flex-end'}
                  w={'100%'}
                  mt={30}
                >
                  <Button
                    text="Next"
                    bg="#02659C"
                    width={'279px'}
                    onClick={onOpen}
                  />
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <BookLesson
            isOpen={isOpenBook}
            onClose={onCloseBook}
            tutor={[]}
            overview={[]}
            bookSession={[]}
            isLoading={false}
            tutorCalender={[]}
          />
          <ChooseWard isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </VStack>
      </Stack>
    </ParentContainer>
  );
};

export default SingleCourses;
