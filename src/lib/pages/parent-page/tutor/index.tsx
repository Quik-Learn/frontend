'use client';

import {
  Image,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast,
  HStack,
  Icon,
  Link,
  IconButton,
  Box,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import ParentContainer from '~/lib/layout/ParentContainer';
import {
  useLazyGetTutorOverviewQuery,
  useLazyGetTutorQuery,
  useLazyGetTutorRatingQuery,
} from '~/lib/services/parent-mutation';
import { PiCrownSimple } from 'react-icons/pi';
import { CiStar } from 'react-icons/ci';
import { GoPeople } from 'react-icons/go';
import { TbWorld } from 'react-icons/tb';

import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaFacebookF,
  FaStar,
} from 'react-icons/fa';
import TutorTable from '~/lib/components/TutorTable';
import Review from '~/lib/components/Review';
import { useParams, useRouter } from 'next/navigation';
const data = [
  { id: 1, name: 'Joseph Doe', class: 'K6', img: '/images/ward.svg' },
  { id: 2, name: 'Simisola James', class: 'K8', img: '/images/ward-2.svg' },
];

const TutorPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { id } = useParams();
  const toast = useToast();
  const [overview, setOverview] = useState<any>([]);
  const [tutor, setTutorData] = useState<any>([]);
  const [tutorRating, setTutorRatingData] = useState<any>([]);
  const [trigger, { data, isLoading, isError, error, isSuccess }] =
    useLazyGetTutorQuery();
  const [triggerOverview, tutorOverview] = useLazyGetTutorOverviewQuery();

  const [triggerReview, tutorReview] = useLazyGetTutorRatingQuery();

  useEffect(() => {
    trigger(id);
    triggerOverview(id);
    triggerReview(id);
  }, [id]);
  useEffect(() => {
    if (isSuccess) {
      setTutorData(data?.data);
      console.log(data?.data);
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
  console.log(tutor, overview);
  useEffect(() => {
    const { data, isError, error, isSuccess } = tutorOverview;
    if (isSuccess) {
      setOverview(data?.data);
      console.log(data?.data);
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
  }, [tutorOverview]);
  useEffect(() => {
    const { data, isError, error, isSuccess } = tutorReview;
    if (isSuccess) {
      setTutorRatingData(data?.data);
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
  }, [tutorReview]);
  return (
    <ParentContainer>
      {isLoading ? (
        <Stack
          w={'100%'}
          h={'350px'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Spinner size={'large'} />
        </Stack>
      ) : (
        <Stack padding={10}>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <HStack justifyContent={'flex-start'} gap={3}>
              <Image src="/images/tutor-avatar.svg" alt="image" />
              <VStack justifyContent={'flex-start'} alignItems={'flex-start'}>
                <HStack>
                  <Text color={'#1D2026'} fontSize={32} fontWeight={600}>
                    {tutor?.user?.user?.firstname} {tutor?.user?.user?.lastname}
                  </Text>
                  {tutor?.rating > 4.5 ? (
                    <HStack bg={'rgba(2, 101, 156, 0.3)'} gap={2} p={1}>
                      <Icon as={PiCrownSimple} color={'#FF8C00'} />
                      <Text color={'#FF8C00'}>Top Rated</Text>
                    </HStack>
                  ) : null}
                </HStack>
                <Text color={'#6E7485'} fontSize={16} textAlign={'left'}>
                  {tutor?.bio}
                </Text>
                <HStack gap={2}>
                  <HStack>
                    <Icon as={FaStar} color={'#FF8C00'} />
                    <Text color={'#1D2026'} fontSize={16} fontWeight={500}>
                      {tutor?.rating}
                    </Text>
                    <Text color={'#6E7485'} fontSize={14}>
                      {tutor?.reviews_count} reviews
                    </Text>
                  </HStack>
                  <HStack gap={2}>
                    <Icon as={GoPeople} color={'#564FFD'} />
                    <Text color={'#1D2026'} fontSize={16} fontWeight={500}>
                      {tutor?.active_students}
                    </Text>
                    <Text color={'#6E7485'} fontSize={14}>
                      students
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </HStack>
            <VStack gap={2}>
              {tutor?.user?.bio?.website ? (
                <HStack gap={2}>
                  <Icon as={TbWorld} color={'#564FFD'} />
                  <Link href={tutor?.user?.bio?.website}>
                    <Text color={'#564FFD'} fontSize={14}>
                      {tutor?.user?.bio?.website}
                    </Text>
                  </Link>
                </HStack>
              ) : null}
              <HStack gap={3}>
                {tutor?.user?.bio?.facebook ? (
                  <IconButton
                    w={12}
                    h={12}
                    bg={'#F5F7FA'}
                    borderRadius={1}
                    icon={
                      <FaFacebookF
                        color="#4E5566"
                        onClick={() =>
                          window.open(
                            tutor?.user?.bio?.facebook,
                            '_blank',
                            'noopener,noreferrer'
                          )
                        }
                      />
                    }
                    aria-label="label"
                  />
                ) : null}
                {tutor?.user?.bio?.twitter ? (
                  <IconButton
                    w={12}
                    h={12}
                    bg={'#F5F7FA'}
                    borderRadius={1}
                    icon={
                      <FaTwitter
                        color="#4E5566"
                        onClick={() =>
                          window.open(
                            tutor?.user?.bio?.twitter,
                            '_blank',
                            'noopener,noreferrer'
                          )
                        }
                      />
                    }
                    aria-label="label"
                  />
                ) : null}
                {tutor?.user?.bio?.instagram ? (
                  <IconButton
                    w={12}
                    h={12}
                    bg={'#F5F7FA'}
                    borderRadius={1}
                    icon={
                      <FaInstagram
                        color="#4E5566"
                        onClick={() =>
                          window.open(
                            tutor?.user?.bio?.instagram,
                            '_blank',
                            'noopener,noreferrer'
                          )
                        }
                      />
                    }
                    aria-label="label"
                  />
                ) : null}
                {tutor?.user?.bio?.youtube ? (
                  <IconButton
                    w={12}
                    h={12}
                    bg={'#F5F7FA'}
                    borderRadius={1}
                    icon={
                      <FaYoutube
                        color="#4E5566"
                        onClick={() =>
                          window.open(
                            tutor?.user?.bio?.youtube,
                            '_blank',
                            'noopener,noreferrer'
                          )
                        }
                      />
                    }
                    aria-label="label"
                  />
                ) : null}
                {tutor?.user?.bio?.whatsapp ? (
                  <IconButton
                    w={12}
                    h={12}
                    bg={'#F5F7FA'}
                    borderRadius={1}
                    icon={
                      <FaWhatsapp
                        color="#4E5566"
                        onClick={() =>
                          window.open(
                            tutor?.user?.bio?.whatsapp,
                            '_blank',
                            'noopener,noreferrer'
                          )
                        }
                      />
                    }
                    aria-label="label"
                  />
                ) : null}
              </HStack>
            </VStack>
          </HStack>
          <HStack
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            mt={10}
            gap={5}
          >
            <Box
              borderColor={'#E9EAF0'}
              borderWidth={1}
              p={6}
              borderRadius={1}
              w={424}
            >
              <Heading color={'#1D2026'} fontWeight={500} fontSize={18} mb={3}>
                BIO
              </Heading>
              <Text color={'#6E7485'} fontSize={14} mb={3}>
                {tutor?.user?.bio?.profile_bio}
              </Text>
            </Box>

            <Tabs width={'60%'}>
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
                  Review
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel py={8}>
                  {tutorOverview?.isLoading ? (
                    <Stack
                      w={'100%'}
                      h={'350px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Spinner size={'large'} />
                    </Stack>
                  ) : (
                    <TutorTable
                      general_availability={overview?.general_availability}
                      qualifications={overview?.qualifications}
                      subjects={overview?.subjects}
                    />
                  )}
                </TabPanel>
                <TabPanel py={8}>
                  {tutorReview?.isLoading ? (
                    <Stack
                      w={'100%'}
                      h={'350px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Spinner size={'large'} />
                    </Stack>
                  ) : (
                    <Review ratings={tutorRating} />
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </HStack>
        </Stack>
      )}
    </ParentContainer>
  );
};

export default TutorPage;
