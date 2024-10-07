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
import { useRef, useEffect } from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import * as yup from 'yup';
import Button from '~/lib/components/ui/button';
import SignupWrapper from '~/lib/components/ui/signup-wrapper';
import useLoginHook from './useLogin';
import useSocialLogin from '../../../hooks/useSocialLogin';

const Login = () => {
  const router = useRouter();
  const formRef = useRef<any>(null);
  const { loginAccount, isLoading } = useLoginHook();
  const { handleSocialLogin, loading } = useSocialLogin();
  const signInSchema = yup.object().shape({
    email: yup.string().required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
  });

  const initialValues: any = {
    email: '',
    password: '',
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef?.current?.handleSubmit();
    }
  };

  useEffect(() => {
    console.log('here');
  }, []);

  return (
    <SignupWrapper img="/images/login.png" flexDirection="row-reverse">
      <VStack
        padding={{ base: 5, md: 8, lg: 10 }}
        maxHeight="100vh"
        overflowY="auto"
        alignSelf={'center'}
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
            loginAccount(values);
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={signInSchema}
        >
          {({ errors, setFieldValue, values }) => (
            <>
              <FormControl>
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

              <FormControl>
                <FormLabel fontSize={14} color="#1D2026">
                  Password
                </FormLabel>
                <Input
                  placeholder="Create password"
                  bg="#ffffff"
                  borderWidth={1}
                  type="password"
                  borderColor="#E9EAF0"
                  value={values.password}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('password', e.target.value)}
                />
                <Text>{errors.password || ''}</Text>
              </FormControl>
              <Stack alignItems={'flex-end'} w={'100%'}>
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
                w={'100%'}
              >
                Remember me
              </Checkbox>

              <Button text="Sign In" onClick={handleSubmit} width={'100%'} />
            </>
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
            <HStack
              backgroundColor="#F7F7F8"
              p={4}
              cursor="pointer"
              onClick={() => handleSocialLogin('google', 'Parent')}
            >
              <Image src="/images/google.svg" alt="google" w="20px" h="20px" />
            </HStack>
            <HStack
              backgroundColor="#F7F7F8"
              p={4}
              cursor="pointer"
              onClick={() => handleSocialLogin('facebook', 'Parent')}
            >
              <Image
                src="/images/facebook.svg"
                alt="google"
                w="20px"
                h="20px"
              />
            </HStack>
            <HStack
              backgroundColor="#F7F7F8"
              p={4}
              cursor="pointer"
              onClick={() => handleSocialLogin('apple', 'Parent')}
            >
              <Image src="/images/apple.svg" alt="google" w="20px" h="20px" />
            </HStack>
          </HStack>
        </Box>
        <HStack width="full" justify="center" align="center">
          <Text color="#262626" fontSize={15}>
            Don’t have an account?{' '}
            <Link href="/auth/sign-up">
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
