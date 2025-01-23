'use client';

import {
  Box,
  Heading,
  HStack,
  VStack,
  Image,
  Text,
  Divider,
  Stack,
  IconButton,
} from '@chakra-ui/react';

import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import Button from '../ui/button';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();
  return (
    <VStack
      bg="white"
      //   backgroundPosition="center"
      //   backgroundRepeat="no-repeat"
      //   backgroundSize="cover"
      //   backgroundImage="/images/background.svg"
    >
      <HStack justify="center" align="center" w="full" px={10} pt={5}>
        <IconButton
          icon={<MdOutlineKeyboardBackspace color="white" />}
          aria-label="icon"
          bg="#1F89DB"
          borderRadius={8}
          width="56px"
          height="56px"
          position={'absolute'}
          top={6}
          left={6}
          alignSelf="flex-start"
          onClick={() => router.back()}
        />
        <Image src="/images/tutor-logo.png" alt="logo" h={110} w={110} />
        <Text />
      </HStack>
      <Heading
        fontSize={{
          base: 20,
          sm: 22,
          md: 42,
        }}
        color="#242424"
        fontFamily="heading"
        fontWeight="700"
        alignSelf="center"
      >
        Sign Up
      </Heading>
      <Stack>
        <HStack alignItems={'flex-start'}>
          <Box borderRadius="10px" boxShadow="md" px={10} pb={10} width="full">
            <VStack width="full" alignItems="center">
              <Image
                src="/images/parent.svg"
                alt="parent"
                height={240}
                width={300}
              />
              <Heading
                fontSize={{ base: '20px', lg: '25px' }}
                color="#242424"
                fontWeight="bold"
                marginTop={8}
                textAlign="center"
              >
                I am a Parent
              </Heading>
              <Text
                mt={2}
                fontSize={{ base: '14px', lg: '16px' }}
                color="#666666"
                textAlign="center"
              >
                Manage payments or lessons for your child
              </Text>
            </VStack>
            <Stack width="full" alignItems="center" marginTop={8}>
              <Button
                text="Sign Up"
                width={246}
                onClick={() => router.push('/auth/parent-signup')}
              />
            </Stack>
          </Box>
          <Divider orientation="vertical" height={{ md: 619 }} mx={5} />
          <Box
            borderRadius="10px"
            bg="white"
            boxShadow="md"
            px={10}
            pb={10}
            width="full"
          >
            <VStack width="full" alignItems="center">
              <Image
                src="/images/student.svg"
                alt="parent"
                height={220}
                width={300}
              />
              <Heading
                fontSize={{ base: '20px', lg: '25px' }}
                color="#242424"
                fontWeight="bold"
                marginTop={6}
                textAlign="center"
              >
                I am a Student
              </Heading>
              <Text
                mt={2}
                fontSize={{ base: '14px', lg: '16px' }}
                color="#666666"
                textAlign="center"
              >
                Have lessons, access course content or watch your lessons back
              </Text>
            </VStack>
            <Stack width="full" alignItems="center" marginTop={8}>
              <Button
                text="Sign Up"
                width={246}
                onClick={() => router.push('/auth/student-signup')}
              />
            </Stack>
          </Box>
        </HStack>
        <HStack
          justify="space-between"
          align="center"
          w="full"
          mt={-20}
          pb={10}
        >
          <Text color="#666666" fontSize={13.5}>
            Need help? Call us on{' '}
            <Text as="span" color="#2C2C2C" fontWeight="semibold">
              +44 (0) 888888888
            </Text>{' '}
            or{' '}
            <Text as="span" color="#0354AE" fontWeight="semibold">
              email us
            </Text>
          </Text>
          <Button
            text="Log In"
            width={97}
            onClick={() => router.push('/auth/login')}
          />
        </HStack>
      </Stack>
    </VStack>
  );
};

export default SignUp;
