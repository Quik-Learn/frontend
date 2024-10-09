'use client';

import {
  Box,
  Flex,
  Image,
  Text,
  Badge,
  Button as ChakraButton,
  SimpleGrid,
  Heading,
  Select,
  Stack,
  Icon,
  VStack,
  Link as ChakraLink,
  HStack,
  IconButton,
  useDisclosure,
  Avatar,
} from '@chakra-ui/react';
import React from 'react';
import { GiGraduateCap } from 'react-icons/gi';
import { RiUser4Line } from 'react-icons/ri';
import { IoLanguage } from 'react-icons/io5';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import Button from './ui/button';
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import BookLesson from './BookLesson';
import { useRouter } from 'next/navigation';
import Pagination from './ui/pagination';

function Rating({ rating }: any) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: '1' }}
                color={i < rating ? '#E9AB2B' : '#fff'}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return (
              <BsStarHalf
                key={i}
                style={{ marginLeft: '1' }}
                color={i < rating ? '#E9AB2B' : '#fff'}
              />
            );
          }
          return (
            <BsStar
              key={i}
              style={{ marginLeft: '1' }}
              color={i < rating ? '#E9AB2B' : '#E9AB2B'}
            />
          );
        })}
    </Box>
  );
}
const TutorCard = ({ onOpen, router, tutor, title }: any) => {
  return (
    <HStack
      flexDirection={{ base: 'column', md: 'row' }}
      w={'100%'}
      justifyContent={'space-between'}
    >
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        bg="white"
        boxShadow="sm"
        width={{ base: '100%', lg: '682px' }}
      >
        <Flex alignItems="center">
          <Avatar
            src={tutor?.user?.profile_image}
            name={`${tutor?.user?.firstname} ${tutor?.user?.lastname}`}
            mr={4}
            h={164}
            w={164}
            bg={'rgba(248, 248, 248, 1)'}
            color="#02659C"
            borderRadius={8}
          />
          <VStack width="full">
            <Flex
              justifyContent="space-between"
              alignItems="flex-start"
              width="full"
            >
              <Box>
                <Heading
                  as="h3"
                  fontSize={21}
                  fontWeight={500}
                  color={'#121117'}
                >
                  {tutor?.user?.firstname} {tutor?.user?.lastname}
                </Heading>
                <Badge
                  bg="#FFEBF3"
                  borderRadius="full"
                  px={2}
                  color={'#121117'}
                  fontWeight={700}
                  fontSize={14}
                  textTransform="capitalize"
                >
                  {tutor?.user?.account_type}
                </Badge>
                <HStack>
                  <Icon as={GiGraduateCap} />
                  <Text mt={2} fontSize="sm" color="#4D4C5C">
                    {title}
                  </Text>
                </HStack>
                <HStack>
                  <Icon as={RiUser4Line} />
                  <Text mt={2} fontSize="sm" color="#4D4C5C">
                    {tutor?.active_students || 0} active students • 894 lessons
                  </Text>
                </HStack>
                <HStack>
                  <Icon as={IoLanguage} />
                  <Text mt={2} fontSize="sm" color="#4D4C5C">
                    Speaks {tutor?.native_language} (Native),
                  </Text>
                </HStack>
              </Box>
              <VStack alignItems="flex-start">
                <Rating rating={tutor?.rating || 0} />
                <HStack>
                  <Text ml={2} fontSize="sm">
                    {tutor?.reviews_count} reviews
                  </Text>
                  <Text ml={4} fontSize="sm">
                    {tutor?.lesson_min}
                  </Text>
                </HStack>
              </VStack>
            </Flex>
            <Flex
              mt={4}
              justifyContent="space-between"
              alignItems="flex-start"
              width="full"
            >
              <Stack maxW="380px">
                <Text fontSize="md" fontWeight="semibold" color="#121117">
                  Bio:{tutor?.bio}
                </Text>
                {/* <Link href="/more">
                <ChakraLink fontSize="md" fontWeight="semibold" color="#121117">
                  Read More
                </ChakraLink>
              </Link> */}
              </Stack>
              <Button
                bg="#FFD700"
                text="View Profile"
                width={244}
                color="#121117"
                onClick={() => router.push(`/parent/tutor/${tutor?.id}`)}
              />
            </Flex>
          </VStack>
        </Flex>
      </Box>
      {!tutor?.videoProfile ? (
        <VStack
          bg={'#fff'}
          borderRadius={10}
          p={2}
          w={{ base: 320, md: 320 }}
          h="100%"
        >
          <Avatar
            src={tutor?.user?.profile_image}
            name={`${tutor?.user?.firstname} ${tutor?.user?.lastname}`}
            h={'80%'}
            w={'100%'}
            bg={'rgba(248, 248, 248, 1)'}
            color="#02659C"
            borderRadius={8}
          />
          <Button text="Watch Preview" bg="#02659C" />
        </VStack>
      ) : null}
    </HStack>
  );
};

const TutorParent = ({
  tutors,
  title,
  total_pages,
  isLoading,
  currentPage,
  next,
  previous,
  getTutor,
}: any) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(tutors);
  return (
    <VStack>
      <SimpleGrid width="full" columns={{ base: 1, md: 4 }} spacing={4} mb={10}>
        <VStack>
          {/* <Text>Mode</Text> */}
          <Select color={'#121117'} placeholder="Mode" bg="#fff">
            <option color={'#121117'} value="anytime">
              Anytime
            </option>
          </Select>
        </VStack>
        <VStack>
          {/* <Text>Filter by</Text> */}
          <Select color={'#121117'} placeholder="Filter By" bg="#fff">
            <option color={'#121117'} value="anytime">
              Top Rated
            </option>
          </Select>
        </VStack>
      </SimpleGrid>
      <HStack
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        w={'100%'}
      >
        <SimpleGrid columns={1} spacing={4} alignSelf="flex-start" w={'100%'}>
          {tutors?.map((tutor: any, index: any) => (
            <TutorCard
              key={index}
              tutor={tutor}
              onOpen={onOpen}
              router={router}
              title={title}
            />
          ))}
        </SimpleGrid>
      </HStack>

      <Pagination
        totalPages={total_pages}
        isLoading={isLoading}
        currentPage={currentPage}
        next={next}
        previous={previous}
        onPageChange={(page: number) => getTutor(page)} // Optional: Callback if you need to handle page change externally
      />
      <BookLesson isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default TutorParent;
