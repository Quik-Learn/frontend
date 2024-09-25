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
const TutorCard = ({ onOpen, router }: any) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg="white"
      boxShadow="sm"
      width={{ base: '100%', lg: '682px' }}
    >
      <Flex alignItems="flex-start">
        <Image
          borderRadius={10}
          src="/images/tutor.svg"
          alt="Tutor"
          mr={4}
          h="80%"
          bg={'rgba(248, 248, 248, 1)'}
        />
        <VStack width="full">
          <Flex
            justifyContent="space-between"
            alignItems="flex-start"
            width="full"
          >
            <Box>
              <Heading as="h3" fontSize={21} fontWeight={500} color={'#121117'}>
                Phuong Y
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
                Super Tutor
              </Badge>
              <HStack>
                <Icon as={GiGraduateCap} />
                <Text mt={2} fontSize="sm" color="#4D4C5C">
                  English
                </Text>
              </HStack>
              <HStack>
                <Icon as={RiUser4Line} />
                <Text mt={2} fontSize="sm" color="#4D4C5C">
                  46 active students • 894 lessons
                </Text>
              </HStack>
              <HStack>
                <Icon as={IoLanguage} />
                <Text mt={2} fontSize="sm" color="#4D4C5C">
                  Speaks English (Native),
                </Text>
              </HStack>
            </Box>
            <VStack alignItems="flex-start">
              <Rating rating={5} />
              <HStack>
                <Text ml={2} fontSize="sm">
                  14 reviews
                </Text>
                <Text ml={4} fontSize="sm">
                  50-min lesson
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
                Bio: Experienced Math Tutor
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
              onClick={() => router.push('/parent/tutor/098765456')}
            />
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};
const tutors = Array(6).fill({
  name: 'Phuong Y',
  activeStudents: 46,
  lessons: 894,
  language: 'English (Native)',
  description: 'Bio: Experienced Math Tutor',
  reviews: 14,
  lessonTime: '50-min lesson',
  image: '/images/student.svg',
});

const TutorParent = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <SimpleGrid columns={1} spacing={4} alignSelf="flex-start">
          {tutors.map((tutor, index) => (
            <TutorCard key={index} onOpen={onOpen} router={router} />
          ))}
        </SimpleGrid>
        <VStack
          bg={'#fff'}
          borderRadius={10}
          p={2}
          w={{ base: '100%', md: 320 }}
        >
          <Image
            src="/images/tutor.svg"
            alt="tut"
            w={'100%'}
            h={'100%'}
            bg={'rgba(196, 196, 196, 0.3)'}
          />
          <Button text="Watch Preview" bg="#02659C" />
        </VStack>
      </HStack>
      <HStack
        justify="space-between"
        mt={8}
        width="full"
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <HStack spacing={2}>
          <ChakraButton
            leftIcon={<Text as="span">&larr;</Text>}
            colorScheme="gray"
            variant="outline"
          >
            Prev
          </ChakraButton>

          <ChakraButton
            rightIcon={<Text as="span">&rarr;</Text>}
            colorScheme="gray"
            variant="outline"
          >
            Next
          </ChakraButton>
        </HStack>
        <HStack spacing={2}>
          <IconButton
            aria-label="Previous page"
            icon={<MdKeyboardDoubleArrowLeft />}
            colorScheme="gray"
            variant="ghost"
            isDisabled
          />
          {Array.from({ length: 3 }).map((_, index) => (
            <ChakraButton
              key={index}
              colorScheme={index === 0 ? 'blue' : 'gray'}
              variant={index === 0 ? 'solid' : 'outline'}
            >
              {index + 1}
            </ChakraButton>
          ))}
          <IconButton
            aria-label="Next page"
            icon={<MdKeyboardDoubleArrowRight />}
            colorScheme="blue"
            variant="ghost"
          />
        </HStack>
      </HStack>
      <BookLesson isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default TutorParent;
