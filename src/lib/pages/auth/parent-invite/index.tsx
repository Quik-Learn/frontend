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
  useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import PasswordInput from '~/lib/components/ui/password-input';
import Button from '~/lib/components/ui/button';
import SignupWrapper from '~/lib/components/ui/signup-wrapper';
import { MdArrowOutward } from 'react-icons/md';
import Link from 'next/link';
import useSocialLogin from '../../../hooks/useSocialLogin';
import useSignup from './useSignup';
import { useAppDispatch, useAppSelector } from '~/lib/store';
import { setToken, tokenState } from '~/lib/store/reducers/token-slice';
import { useRegisterParentInviteMutation } from '~/lib/services/auth-service';

import { setUser } from '~/lib/store/reducers/user-slice';
import { setType } from '~/lib/store/reducers/type-slice';
const ParentInvite = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const email = useMemo(() => searchParams.get('email'), [searchParams]);
  const ward_id = useMemo(() => searchParams.get('ward_id'), [searchParams]);

  const token = useAppSelector(tokenState);
  const formRef = useRef<any>(null);
  const { handleSocialLogin, loading } = useSocialLogin();
  const [registerParentInvite, { isLoading, isSuccess, isError, error, data }] =
    useRegisterParentInviteMutation();

  const signInSchema = yup.object().shape({
    firstname: yup.string().required('Please enter your firstname'),
    lastname: yup.string().required('Please enter your last name'),
    phone: yup.string().required('Please enter your phone number'),
    email: yup.string().required('Please enter your email'),
    password: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    ward_id: yup.string().required('Please select a ward'),
    // confirm_password: yup
    //   .string()
    //   .required('Please confirm password')
    //   // @ts-ignore
    //   .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const [initialValues, setInitialValues] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: email,
    password: '',
    ward_id: ward_id,
  });

  const handleSubmit = () => {
    if (formRef.current) {
      formRef?.current?.handleSubmit();
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      document.cookie = `token=${data?.data?.auth_token}; path=/;`;
      document.cookie = `accountType=${data?.data?.user?.account_type}; path=/;`;
      dispatch(setUser(data?.data?.user));
      dispatch(setToken(data?.data?.auth_token));

      dispatch(
        setType(
          data?.data?.user?.account_type === 'Instructor'
            ? 'Tutor'
            : data?.data?.user?.account_type
        )
      );

      router.push('/parent');
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
    }
  }, [isSuccess, isError, error]);
  return (
    <SignupWrapper img="/images/big-parent.png" bg="#FF8C00">
      <VStack
        padding={{ base: 5, md: 8, lg: 10 }}
        maxHeight="100vh"
        overflowY="scroll"
        bg={'white'}
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Heading
          fontSize={{ base: '28px', lg: '40px' }}
          color="#1D2026"
          fontWeight="semibold"
          marginTop={6}
          textAlign="center"
        >
          Sign Up
        </Heading>
        <Text my={5} color={'#4C4C4D'} fontSize={19}>
          Create an account to manage your child's learning.
        </Text>
        <Formik
          initialValues={initialValues}
          innerRef={formRef}
          onSubmit={(values) => {
            registerParentInvite(values);
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
            >
              <FormControl>
                <FormLabel fontSize={14} color="#1D2026">
                  Full Name
                </FormLabel>
                <Input
                  placeholder="First Name"
                  bg="#ffffff"
                  borderWidth={1}
                  borderColor="#E9EAF0"
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  value={values.firstname}
                  onChange={(e) => setFieldValue('firstname', e.target.value)}
                />
                <Text color={'red'} fontSize={8}>
                  {errors.firstname || ''}
                </Text>
              </FormControl>
              <FormControl>
                {/* <FormLabel color="white"> .</FormLabel> */}
                <Input
                  placeholder="Last Name"
                  bg="#ffffff"
                  borderWidth={1}
                  borderColor="#E9EAF0"
                  value={values.lastname}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('lastname', e.target.value)}
                />
                <Text color={'red'} fontSize={8}>
                  {errors.lastname || ''}
                </Text>
              </FormControl>
              <FormControl gridColumn={{ sm: '1', md: 'span 2' }}>
                <FormLabel fontSize={14} color="#1D2026">
                  Phone Number
                </FormLabel>
                <Input
                  placeholder="Phone Number"
                  bg="#ffffff"
                  borderWidth={1}
                  borderColor="#E9EAF0"
                  value={values.phone}
                  maxLength={11}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('phone', e.target.value)}
                />
                <Text color={'red'} fontSize={8}>
                  {errors.phone || ''}
                </Text>
              </FormControl>
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
                <Text color={'red'} fontSize={8}>
                  {errors.email || ''}
                </Text>
              </FormControl>

              <Stack gridColumn="span 2">
                <PasswordInput
                  value={values.password}
                  onChange={(e) => setFieldValue('password', e.target.value)}
                  label="Password"
                  error={errors.password}
                  placeholder="Enter Password"
                />
              </Stack>
              <Checkbox
                defaultChecked
                mt={5}
                flex={1}
                color="#59595A"
                gridColumn="span 2"
              >
                I agree with and{' '}
                <Text as="span" textDecorationLine={'underline'}>
                  Terms of Us
                </Text>{' '}
                and{' '}
                <Text as="span" textDecorationLine={'underline'}>
                  Privacy Policy
                </Text>{' '}
              </Checkbox>
              <Stack mt={5} gridColumn="span 2">
                <Button
                  text="Sign Up"
                  bg="#0065FF"
                  isLoading={isLoading}
                  onClick={handleSubmit}
                />
              </Stack>
            </SimpleGrid>
          )}
        </Formik>

        {/* <Box border="none" p={4} mt={1} width="full" textAlign="center">
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
            Sign Up with
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
              onClick={() => {
                console.log('click');
                handleSocialLogin('facebook', 'Parent');
              }}
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
        </Box> */}
        <HStack width="full" justify="center" align="center">
          <Text color="#262626" fontSize={15}>
            Already have an account?{' '}
            <Link href="/auth/login">
              <ChakraLink
                color="#262626"
                fontSize={15}
                fontWeight="500"
                _hover={{
                  color: 'brand.100',
                }}
              >
                Login
              </ChakraLink>
            </Link>
          </Text>
          <Icon as={MdArrowOutward} color="#262626" />
        </HStack>
      </VStack>
    </SignupWrapper>
  );
};

export default ParentInvite;
