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
  const [selected, setSelected] = useState([]);
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
    <SignupWrapper img="/images/big-student.png" bg="#0A52A8">
      <VStack
        padding={{ base: 5, md: 8, lg: 10 }}
        maxHeight="100vh"
        overflowY="auto"
      >
        <Heading
          fontSize={{ base: '28px', lg: '40px' }}
          color="#fff"
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
            <>
              <FormControl mb={5}>
                <FormLabel fontSize={14} color="#1D2026">
                  Enter your location
                </FormLabel>
                <Input
                  placeholder="Enter your location"
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
              <FormControl mb={5}>
                <FormLabel fontSize={14} color="#1D2026">
                  Select your Date of Birth
                </FormLabel>
                <Input
                  placeholder="Enter your date of birth"
                  bg="#ffffff"
                  borderWidth={1}
                  type="date"
                  borderColor="#E9EAF0"
                  value={values.last_name}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('last_name', e.target.value)}
                />
              </FormControl>
              <HStack
                flexWrap={'wrap'}
                gap={4}
                mb={10}
                justifyContent={'flex-start'}
                alignItems={'flex-start'}
                alignSelf={'flex-start'}
              >
                {selected?.map((item) => (
                  <Stack
                    onClick={() => {}}
                    borderWidth={1.5}
                    bgColor={'#FBA333'}
                    bg={'white'}
                    px={'14px'}
                    py={'10px'}
                    borderRadius={20}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Text color={'#FBA333'}>{item}</Text>
                  </Stack>
                ))}
              </HStack>
              <FormControl
                gridColumn="span 3"
                alignItems="flex-start"
                justifyContent="flex-start"
                mb={5}
              >
                <FormLabel fontSize={14} color="#1D2026">
                  Select 5 Subject of Interest
                </FormLabel>

                <Input
                  placeholder="Search"
                  bg="#ffffff"
                  borderWidth={1}
                  borderColor="#E9EAF0"
                  value={values.last_name}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('last_name', e.target.value)}
                />
                <Text>{errors.first_name || ''}</Text>
              </FormControl>
              <HStack flexWrap={'wrap'} gap={4} mb={10}>
                {[
                  'Mathematics',
                  'English',
                  'Geography',
                  'Physics',
                  'Chemistry',
                  'Art and Culture',
                  'Computer Science',
                  'Music',
                ]?.map((item) => (
                  <Stack
                    onClick={() => {
                      if (selected.find((itemm) => itemm === item)) {
                        const lastSelectedIndex = selected.lastIndexOf(item);
                        const updatedSelected = [...selected];
                        updatedSelected.splice(lastSelectedIndex, 1); // Remove the last selected item
                        setSelected(updatedSelected);
                      } else {
                        setSelected((prev) => [...prev, item]);
                      }
                    }}
                    borderWidth={1.5}
                    bgColor={'#5F5F5F'}
                    bg={
                      selected.find((itemm) => itemm === item)
                        ? '#0065FF'
                        : 'white'
                    }
                    px={'14px'}
                    py={'10px'}
                    borderRadius={20}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Text
                      color={
                        selected.find((itemm) => itemm === item)
                          ? 'white'
                          : '#5F5F5F'
                      }
                    >
                      {item}
                    </Text>
                  </Stack>
                ))}
              </HStack>

              <Button
                text="Submit"
                bg="#0065FF"
                width={'100%'}
                onClick={() => router.push('/auth/success?type=student')}
              />
            </>
          )}
        </Formik>
      </VStack>
    </SignupWrapper>
  );
};

export default Subject;
