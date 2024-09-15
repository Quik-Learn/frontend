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
  Select,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import * as yup from 'yup';

import Button from '~/lib/components/ui/button';
import SignupWrapper from '~/lib/components/ui/signup-wrapper';

const Subject = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
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

  // Helper functions to generate options for day, month, and year
  const generateDayOptions = () => {
    return Array.from({ length: 31 }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {String(i + 1).padStart(2, '0')}
      </option>
    ));
  };

  const generateMonthOptions = () => {
    return Array.from({ length: 12 }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {String(i + 1).padStart(2, '0')}
      </option>
    ));
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    return years.map((yr) => (
      <option key={yr} value={yr}>
        {yr}
      </option>
    ));
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
        <Heading
          fontSize={{ base: '28px', lg: '40px' }}
          color="#1D2026"
          fontWeight="semibold"
          my={6}
          textAlign="center"
        >
          Almost there...
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
                sm: 3,
                md: 3,
                lg: 3,
              }}
              spacing={4}
              alignItems="flex-end"
              justifyContent="space-between"
            >
              <FormControl
                gridColumn="span 3"
                alignItems="flex-start"
                justifyContent="flex-start"
                mb={5}
              >
                <FormLabel fontSize={14} color="#1D2026">
                  Select a Subject of Interest
                </FormLabel>

                <Select
                  placeholder="Select a Subject"
                  borderWidth={1}
                  bg="#ffffff"
                  outline="none"
                  size="md"
                  borderColor="#E9EAF0"
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                >
                  <option value="" disabled>
                    Select option
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
                <Text>{errors.first_name || ''}</Text>
              </FormControl>
              <FormControl gridColumn="span 3" mb={5}>
                <FormLabel fontSize={14} color="#1D2026">
                  Enter your address
                </FormLabel>
                <Input
                  placeholder="Enter your Address"
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
              <FormControl gridColumn="span 3" mb={5}>
                <FormLabel fontSize={14} color="#1D2026">
                  Select your Date of Birth
                </FormLabel>
                <HStack spacing={4}>
                  <Select
                    placeholder="DD"
                    borderWidth={1}
                    borderColor="#E9EAF0"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  >
                    {generateDayOptions()}
                  </Select>
                  <Select
                    placeholder="MM"
                    borderWidth={1}
                    borderColor="#E9EAF0"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    {generateMonthOptions()}
                  </Select>
                  <Select
                    placeholder="YYYY"
                    borderWidth={1}
                    borderColor="#E9EAF0"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    {generateYearOptions()}
                  </Select>
                </HStack>
              </FormControl>
              <Stack />
              <Stack />
              <Stack mt={5}>
                <Button
                  text="Submit"
                  iconPosition="right"
                  icon={<FaArrowRightLong color="white" />}
                  width={200}
                  onClick={() => router.push('/auth/success?type=student')}
                />
              </Stack>
            </SimpleGrid>
          )}
        </Formik>
      </VStack>
    </SignupWrapper>
  );
};

export default Subject;
