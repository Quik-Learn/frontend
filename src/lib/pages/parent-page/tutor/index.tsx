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
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import ParentContainer from '~/lib/layout/ParentContainer';
import { useGetWardsQuery } from '~/lib/services/parent-mutation';
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
const data = [
  { id: 1, name: 'Joseph Doe', class: 'K6', img: '/images/ward.svg' },
  { id: 2, name: 'Simisola James', class: 'K8', img: '/images/ward-2.svg' },
];

const TutorPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [wardData, setWardData] = useState<any>([]);
  const {
    data: wards,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetWardsQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setWardData(wards?.data);
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
  }, [isSuccess, wards, isError, error]);

  const [neww, setNew] = useState('');

  return (
    <ParentContainer>
      <Stack padding={10}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <HStack justifyContent={'flex-start'} gap={3}>
            <Image src="/images/tutor-avatar.svg" alt="image" />
            <VStack justifyContent={'flex-start'} alignItems={'flex-start'}>
              <HStack>
                <Text color={'#1D2026'} fontSize={32} fontWeight={600}>
                  Vako Shvili
                </Text>
                <HStack bg={'rgba(2, 101, 156, 0.3)'} gap={2} p={1}>
                  <Icon as={PiCrownSimple} color={'#FF8C00'} />
                  <Text color={'#FF8C00'}>Top Rated</Text>
                </HStack>
              </HStack>
              <Text color={'#6E7485'} fontSize={16} textAlign={'left'}>
                Mathematics Tutor
              </Text>
              <HStack gap={2}>
                <HStack>
                  <Icon as={FaStar} color={'#FF8C00'} />
                  <Text color={'#1D2026'} fontSize={16} fontWeight={500}>
                    4.8
                  </Text>
                  <Text color={'#6E7485'} fontSize={14}>
                    {' '}
                    (633 review)
                  </Text>
                </HStack>
                <HStack gap={2}>
                  <Icon as={GoPeople} color={'#564FFD'} />
                  <Text color={'#1D2026'} fontSize={16} fontWeight={500}>
                    2,117
                  </Text>
                  <Text color={'#6E7485'} fontSize={14}>
                    students
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </HStack>
          <VStack gap={2}>
            <HStack gap={2}>
              <Icon as={TbWorld} color={'#564FFD'} />
              <Link>
                <Text color={'#564FFD'} fontSize={14}>
                  https://www.vakoshvili.com
                </Text>
              </Link>
            </HStack>
            <HStack gap={3}>
              <IconButton
                w={12}
                h={12}
                bg={'#F5F7FA'}
                borderRadius={1}
                icon={<FaFacebookF color="#4E5566" />}
                aria-label="label"
              />
              <IconButton
                w={12}
                h={12}
                bg={'#F5F7FA'}
                borderRadius={1}
                icon={<FaTwitter color="#4E5566" />}
                aria-label="label"
              />
              <IconButton
                w={12}
                h={12}
                bg={'#F5F7FA'}
                borderRadius={1}
                icon={<FaInstagram color="#4E5566" />}
                aria-label="label"
              />
              <IconButton
                w={12}
                h={12}
                bg={'#F5F7FA'}
                borderRadius={1}
                icon={<FaYoutube color="#4E5566" />}
                aria-label="label"
              />
              <IconButton
                w={12}
                h={12}
                bg={'#F5F7FA'}
                borderRadius={1}
                icon={<FaWhatsapp color="#4E5566" />}
                aria-label="label"
              />
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
              One day Vako had enough with the 9-to-5 grind, or more like 9-to-9
              in his case, and quit his job, or more like got himself fired from
              his own startup.
            </Text>
            <Text color={'#6E7485'} fontSize={14} mb={3}>
              He decided to work on his dream: be his own boss, travel the
              world, only do the work he enjoyed, and make a lot more money in
              the process. No more begging for vacation days and living from
              paycheck to paycheck. After trying everything from e-commerce
              stores to professional poker his lucky break came when he started
              freelance design. Vako fell in love with the field that gives him
              the lifestyle of his dreams
            </Text>
            <Text color={'#6E7485'} fontSize={14} mb={3}>
              Vako realizes that people who take courses on Udemy want to
              transform their lives. Today with his courses and mentoring Vako
              is helping thousands
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
                <TutorTable />
              </TabPanel>
              <TabPanel py={8}>
                <Review />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </HStack>
      </Stack>
    </ParentContainer>
  );
};

export default TutorPage;
