/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

'use client';

import {
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  SimpleGrid,
  VStack,
  Text,
  Checkbox,
  Box,
  HStack,
  Stack,
  Divider,
  Center,
  Link as ChakraLink,
  Icon,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Formik } from 'formik';
import { MdArrowOutward } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import * as yup from 'yup';
import Button from '~/lib/components/ui/button';
import SignupWrapper from '~/lib/components/ui/signup-wrapper';

const Login = () => {
  const router = useRouter();
  const formRef = useRef<any>(null);
  const signInSchema = yup.object().shape({
    first_name: yup.string().required('Please enter your firstname'),
    last_name: yup.string().required('Please enter your last name'),
    phone: yup.string().required('Please enter your phone number'),
    email: yup.string().required('Please enter your email'),
    new_password: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    confirm_password: yup
      .string()
      .required('Please confirm password')
      // @ts-ignore
      .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
  });

  const initialValues: any = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    new_password: '',
    confirm_password: '',
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef?.current?.handleSubmit();
    }
  };
  return (
    <SignupWrapper img="/images/login.svg" flexDirection="row-reverse">
      <VStack
        padding={{ base: 5, md: 8, lg: 10 }}
        maxHeight="100vh"
        overflowY="auto"
        alignSelf={'center'}
        w={'80%'}
      >
        <Heading
          fontSize={{ base: '28px', lg: '40px' }}
          color="#1D2026"
          fontWeight="semibold"
          marginTop={6}
          textAlign="center"
        >
          Login
        </Heading>
        <Text my={5} color={'#4C4C4D'} fontSize={19}>
          Welcome back! Please log in to access your account.
        </Text>
        <Formik
          initialValues={initialValues}
          innerRef={formRef}
          onSubmit={(values) => {
            console.log(values);
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={signInSchema}
        >
          {({ errors, setFieldValue, values }) => (
            <SimpleGrid
              p={4}
              columns={{
                sm: 1,
                md: 2,
                lg: 2,
              }}
              spacing={4}
              alignItems="flex-end"
              justifyContent="space-between"
              width="100%"
            >
              <FormControl gridColumn={{ sm: '1', md: 'span 2' }}>
                <FormLabel fontSize={14} color="#1D2026">
                  Email
                </FormLabel>
                <Input
                  placeholder="Email Address"
                  bg="#ffffff"
                  borderWidth={1}
                  borderColor="#E9EAF0"
                  value={values.email}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('email', e.target.value)}
                />
                <Text>{errors.email || ''}</Text>
              </FormControl>

              <FormControl gridColumn={{ sm: '1', md: 'span 2' }}>
                <FormLabel fontSize={14} color="#1D2026">
                  Password
                </FormLabel>
                <Input
                  placeholder="Create password"
                  bg="#ffffff"
                  borderWidth={1}
                  type="password"
                  borderColor="#E9EAF0"
                  value={values.new_password}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) =>
                    setFieldValue('new_password', e.target.value)
                  }
                />
                <Text>{errors.new_password || ''}</Text>
              </FormControl>
              <Stack
                gridColumn={{ sm: '1', md: 'span 2' }}
                alignItems={'flex-end'}
              >
                <Link href="/auth/forgot-password">
                  <ChakraLink color={'#4C4C4D'} fontSize={14}>
                    Forgot Password?
                  </ChakraLink>
                </Link>
              </Stack>

              <Checkbox
                defaultChecked
                mt={5}
                flex={1}
                color="#1D2026"
                gridColumn={{ sm: '1', md: 'span 2' }}
              >
                Remember me
              </Checkbox>
              <Stack gridColumn={{ sm: '1', md: 'span 2' }}>
                <Button
                  text="Sign In"
                  onClick={() => router.push('/auth/success?type=parent')}
                />
              </Stack>
            </SimpleGrid>
          )}
        </Formik>

        <Box border="none" p={4} mt={1} width="full" textAlign="center">
          <HStack align="center" mb={3}>
            <Divider orientation="horizontal" bg="#E9EAF0" />
            <VStack
              width="max-content"
              justify="center"
              align="center"
              display="flex"
            >
              <Text width="max-content" fontSize="14px" color="#8C94A3">
                OR
              </Text>
            </VStack>

            <Divider orientation="horizontal" bg="#E9EAF0" />
          </HStack>

          <Text color={'#262626'} fontSize={'large'} fontWeight={500} mb={3}>
            Log In with
          </Text>

          <HStack spacing={6} justify="center" w={'full'}>
            <HStack backgroundColor="#F7F7F8" p={4} cursor="pointer">
              <Image src="/images/google.svg" alt="google" w="20px" h="20px" />
            </HStack>
            <HStack backgroundColor="#F7F7F8" p={4} cursor="pointer">
              <Image
                src="/images/facebook.svg"
                alt="google"
                w="20px"
                h="20px"
              />
            </HStack>
            <HStack backgroundColor="#F7F7F8" p={4} cursor="pointer">
              <Image src="/images/apple.svg" alt="google" w="20px" h="20px" />
            </HStack>
          </HStack>
        </Box>
        <HStack width="full" justify="center" align="center">
          <Text color="#262626" fontSize={15}>
            Don’t have an account?{' '}
            <Link href="/">
              <ChakraLink
                color="#262626"
                fontSize={15}
                fontWeight="500"
                _hover={{
                  color: 'brand.100',
                }}
              >
                Sign Up
              </ChakraLink>
            </Link>
          </Text>
          <Icon as={MdArrowOutward} color="#262626" />
        </HStack>
      </VStack>
    </SignupWrapper>
  );
};

export default Login;
