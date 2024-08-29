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
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import * as yup from 'yup';

import Button from '~/lib/components/ui/button';
import SignupWrapper from '~/lib/components/ui/signup-wrapper';

const StudentSignup = () => {
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
    <SignupWrapper img="/images/student.svg">
      <VStack
        padding={{ base: 5, md: 8, lg: 10 }}
        maxHeight="100vh"
        overflowY="auto"
      >
        <Image src="/images/logo.svg" alt="logo" h={110} w={110} />
        <Heading
          fontSize={{ base: '28px', lg: '40px' }}
          color="#1D2026"
          fontWeight="semibold"
          marginTop={6}
          textAlign="center"
        >
          Create your Account
        </Heading>
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
                  bg="#ffffff"
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
              <FormControl>
                <FormLabel fontSize={14} color="#1D2026">
                  Confirm Password
                </FormLabel>
                <Input
                  placeholder="Confirm Password"
                  bg="#ffffff"
                  borderWidth={1}
                  type="password"
                  borderColor="#E9EAF0"
                  value={values.new_password}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) =>
                    setFieldValue('confirm_password', e.target.value)
                  }
                />
                <Text>{errors.confirm_password || ''}</Text>
              </FormControl>
              <Checkbox defaultChecked mt={5} flex={1}>
                I Agree with all of your{' '}
                <Text as="span" color="#564FFD">
                  Terms & Conditions
                </Text>{' '}
              </Checkbox>
              <Stack mt={5}>
                <Button
                  text="Create account"
                  iconPosition="right"
                  icon={<FaArrowRightLong color="white" />}
                  width={200}
                  alignSelf="flex-end"
                  onClick={() => router.push('/auth/subject')}
                />
              </Stack>
            </SimpleGrid>
          )}
        </Formik>

        <Box border="none" p={4} mt={8} width="full" textAlign="center">
          <HStack align="center" mb={10}>
            <Divider orientation="horizontal" color="#E9EAF0" />
            <VStack
              width="max-content"
              justify="center"
              align="center"
              display="flex"
            >
              <Text width="max-content" fontSize="14px" color="#8C94A3">
                SIGN UP WITH
              </Text>
            </VStack>

            <Divider orientation="horizontal" color="#E9EAF0" />
          </HStack>

          <HStack spacing={4} justify="center">
            <HStack
              borderWidth={1}
              borderColor="#E9EAF0"
              width={220}
              px={4}
              cursor="pointer"
            >
              <Image src="/images/google.svg" alt="google" w="20px" h="20px" />
              <Divider
                orientation="vertical"
                borderWidth={1}
                borderColor="#E9EAF0"
                h="30px"
              />
              <Stack align="center" flexGrow={1} py={2}>
                <Text>Google</Text>
              </Stack>
            </HStack>
            <HStack
              borderWidth={1}
              borderColor="#E9EAF0"
              width={220}
              px={4}
              cursor="pointer"
            >
              <Image
                src="/images/facebook.svg"
                alt="google"
                w="20px"
                h="20px"
              />
              <Divider
                orientation="vertical"
                borderWidth={1}
                borderColor="#E9EAF0"
                h="30px"
              />
              <Stack align="center" flexGrow={1} py={2}>
                <Text>Facebook</Text>
              </Stack>
            </HStack>
            <HStack
              borderWidth={1}
              borderColor="#E9EAF0"
              width={220}
              px={4}
              cursor="pointer"
            >
              <Image src="/images/apple.svg" alt="google" w="20px" h="20px" />
              <Divider
                orientation="vertical"
                borderWidth={1}
                borderColor="#E9EAF0"
                h="30px"
              />
              <Stack align="center" flexGrow={1} py={2}>
                <Text>Apple</Text>
              </Stack>
            </HStack>
          </HStack>
        </Box>
      </VStack>
    </SignupWrapper>
  );
};

export default StudentSignup;
