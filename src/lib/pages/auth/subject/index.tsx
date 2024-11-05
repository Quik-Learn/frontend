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
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import * as yup from 'yup';

import Button from '~/lib/components/ui/button';
import SignupWrapper from '~/lib/components/ui/signup-wrapper';
import { useSetSubjectHook } from './useSetSubject';

const Subject = () => {
  const router = useRouter();
  const formRef = useRef<any>(null);
  const [selected, setSelected] = useState([]);

  const {
    data,
    isLoading,
    setFilterText,
    filterText,
    onboardStudent,
    isStudentLoading,
  } = useSetSubjectHook();
  const signInSchema = yup.object().shape({
    DOB: yup.string().required('Please enter your date of birth'),
    address: yup.string().required('Please enter your last name'),
    state: yup.string(),
  });
  console.log(data);
  const initialValues: any = {
    DOB: '',
    address: '',
    state: '',
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
            const subjects = selected?.map((item) => {
              return item.id;
            });
            console.log(subjects);
            onboardStudent({
              bio: values,
              subjects,
            });
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={signInSchema}
        >
          {({ errors, setFieldValue, values }) => (
            <>
              <FormControl mb={5}>
                <FormLabel fontSize={14} color="#1D2026">
                  State of Residence
                </FormLabel>
                <Select
                  placeholder="Enter your state"
                  bg="#ffffff"
                  borderWidth={1}
                  borderColor="#E9EAF0"
                  value={values.state}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onSubmit={(e) => setFieldValue('state', e.target.value)}
                >
                  <option></option>
                </Select>
                <FormErrorMessage fontSize={10} color={'#f00'}>
                  {errors.state || ''}
                </FormErrorMessage>
              </FormControl>
              <FormControl mb={5}>
                <FormLabel fontSize={14} color="#1D2026">
                  Enter your location
                </FormLabel>
                <Input
                  placeholder="Enter your location"
                  bg="#ffffff"
                  borderWidth={1}
                  borderColor="#E9EAF0"
                  value={values.address}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('address', e.target.value)}
                />
                <FormErrorMessage fontSize={10} color={'#f00'}>
                  {errors.address || ''}
                </FormErrorMessage>
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
                  value={values.DOB}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('DOB', e.target.value)}
                />
                <FormErrorMessage fontSize={10} color={'#f00'}>
                  {errors.DOB || ''}
                </FormErrorMessage>
              </FormControl>
              {selected?.length ? (
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
                      borderColor={'#FBA333'}
                      bg={'white'}
                      px={'14px'}
                      py={'10px'}
                      borderRadius={20}
                      justifyContent={'center'}
                      alignItems={'center'}
                    >
                      <Text color={'#FBA333'}>{item?.name}</Text>
                    </Stack>
                  ))}
                </HStack>
              ) : null}
              <FormControl
                gridColumn="span 3"
                alignItems="flex-start"
                justifyContent="flex-start"
                mb={5}
              >
                <FormLabel fontSize={14} color="#1D2026">
                  Select Subjects of Interest
                </FormLabel>

                <Input
                  placeholder="Type to search"
                  bg="#ffffff"
                  borderWidth={1}
                  borderColor="#E9EAF0"
                  value={filterText}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFilterText(e.target.value)}
                />
                <Text>{errors.first_name || ''}</Text>
              </FormControl>
              <HStack flexWrap={'wrap'} gap={4} mb={10}>
                {data?.map((item) => (
                  <Stack
                    onClick={() => {
                      console.log(selected, item);
                      if (
                        selected?.length &&
                        selected?.find((itemm) => itemm?.name === item?.name)
                      ) {
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
                      selected.find((itemm) => itemm?.name === item.name)
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
                        selected.find((itemm) => itemm?.name === item?.name)
                          ? 'white'
                          : '#5F5F5F'
                      }
                    >
                      {item?.name}
                    </Text>
                  </Stack>
                ))}
              </HStack>
              <Stack w={'100%'}>
                <Button
                  text="Submit"
                  bg="#0065FF"
                  isLoading={isStudentLoading}
                  isDisabled={selected?.length < 1}
                  onClick={handleSubmit}
                />
              </Stack>
            </>
          )}
        </Formik>
      </VStack>
    </SignupWrapper>
  );
};

export default Subject;
