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
import { Formik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import PasswordInput from '~/lib/components/ui/password-input';
import Button from '~/lib/components/ui/button';
import SignupWrapper from '~/lib/components/ui/signup-wrapper';
import { MdArrowOutward } from 'react-icons/md';
import Link from 'next/link';
import useSocialLogin from '../../hooks/useSocialLogin';
const ParentSignup = () => {
  const router = useRouter();
  const formRef = useRef<any>(null);
  const { handleSocialLogin, loading } = useSocialLogin();
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
    <SignupWrapper img="/images/big-parent.png" bg="#FF8C00">
      <VStack
        padding={{ base: 5, md: 8, lg: 10 }}
        maxHeight="100vh"
        overflowY="auto"
        bg={'white'}
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
          Create an account to start learning.
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
            >
              <FormControl>
                <FormLabel fontSize={14} color="#1D2026">
                  Full Name
                </FormLabel>
                <Input
                  placeholder="First Name"
                  bg="#ffffff"
                  borderWidth={1}
                  value={values.first_name}
                  borderColor="#E9EAF0"
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('first_name', e.target.value)}
                />
                <Text>{errors.first_name || ''}</Text>
              </FormControl>
              <FormControl>
                {/* <FormLabel color="white"> .</FormLabel> */}
                <Input
                  placeholder="Last Name"
                  bg="#F7F7F8"
                  borderWidth={1}
                  borderColor="#E9EAF0"
                  value={values.last_name}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('last_name', e.target.value)}
                />
                <Text>{errors.last_name || ''}</Text>
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
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('phone', e.target.value)}
                />
                <Text>{errors.phone || ''}</Text>
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
                <Text>{errors.email || ''}</Text>
              </FormControl>

              <Stack gridColumn="span 2">
                <PasswordInput
                  value={values.new_password}
                  onChange={(e) =>
                    setFieldValue('new_password', e.target.value)
                  }
                  label="Password"
                  error={errors.new_password}
                  placeholder="Re-enter Password"
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
                  onClick={() => router.push('/auth/subject')}
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
            Sign Up with
          </Text>

          <HStack spacing={6} justify="center" w={'full'}>
            <HStack
              backgroundColor="#F7F7F8"
              p={4}
              cursor="pointer"
              onClick={() => handleSocialLogin('google')}
            >
              <Image src="/images/google.svg" alt="google" w="20px" h="20px" />
            </HStack>
            <HStack
              backgroundColor="#F7F7F8"
              p={4}
              cursor="pointer"
              onClick={() => handleSocialLogin('faacebook')}
            >
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

export default ParentSignup;
