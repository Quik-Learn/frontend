'use client';

import {
  Heading,
  VStack,
  Text,
  Image,
  Divider,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Stack,
  Spinner,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import Button from '~/lib/components/ui/button';
import ParentContainer from '~/lib/layout/ParentContainer';
import useDashboardHook from '../parent/useDashboard';
import { Formik } from 'formik';
import * as yup from 'yup';
import useAccount from './useAccount';
const Account = () => {
  const formRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>('');
  const {
    initialValues,
    signInSchema,
    isLoading,
    buttonLoading,
    updateUserProfile,
  } = useAccount();

  const handleClick = () => {
    fileInputRef.current?.click(); // Trigger click on file input
  };
  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        const formData = {
          image: base64String,
        };

        updateUserProfile({ profile_image: base64String });
      };
    }
  };
  const allowedFiles = ['png', 'jpg', 'jpeg'].map((x) => '.' + x).join(',');
  return (
    <ParentContainer>
      <VStack p={6} w={'100%'} alignItems={'flex-start'}>
        <Stack borderBottomWidth={2.23} borderColor={'#FF8C00'} pb={1} mb={4}>
          <Heading color={'#FF8C00'} fontWeight={700} fontSize={'xl'}>
            Account Setting
          </Heading>
        </Stack>

        <VStack>
          <Text color={'#4C535F'} fontSize={'md'} fontWeight={500} mb={2}>
            Your Profile Picture
          </Text>

          <VStack
            p={6}
            borderWidth={2}
            borderStyle={'dashed'}
            borderColor={'#4C535F'}
            borderRadius={20}
            justifyContent={'center'}
            alignItems={'center'}
            bg={'#EDF2F6'}
            mb={4}
            onClick={handleClick}
          >
            <Input
              ref={fileInputRef}
              onChange={handleSelectFile}
              type={'file'}
              name={'logo-upload'}
              id={'logo-upload'}
              display={'none'}
              accept={allowedFiles}
              zIndex={200}
            />
          {isLoading ? <Spinner height="20" width="20" /> : 
              
              <>
              {initialValues?.profile_image
               ? <Image src={initialValues?.profile_image} alt="upload"  borderRadius={10} objectFit={'cover'} width={100} height={100} /> :   
                <>
              
              <Image src="/images/upload.svg"  width={40} height={40} alt="upload" />
              
              <Text mt={2} color={'#4C535F'} fontWeight={500} fontSize={10}>
                Upload your photo
              </Text>
                </>
              }
           
              </>}
          </VStack>
        </VStack>
        <Divider />
        <Formik
          initialValues={initialValues}
          innerRef={formRef}
          onSubmit={(values) => {
            updateUserProfile({
              phone: values.phone,
              firstname: values.firstname,
              lastname: values.lastname,
            });
          }}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize={true}
          validationSchema={signInSchema}
        >
          {({ errors, setFieldValue, values }: any) => (
            <>
              <HStack w={'100%'}>
                <FormControl my={4}>
                  <FormLabel fontSize={14} color="#4C535F">
                    First name
                  </FormLabel>
                  <Input
                    placeholder="Please enter your first name"
                    bg="#EDF2F6"
                    borderWidth={1}
                    borderColor="#F1F1F3"
                    w={'100%'}
                    color="#4C535F"
                    _placeholder={{ color: '#656567' }}
                    value={values?.firstname}
                    onChange={(e) => {
                      setFieldValue('firstname', e.target.value);
                    }}
                  />

                  <FormErrorMessage>{errors.firstname}</FormErrorMessage>
                </FormControl>
                <FormControl my={4}>
                  <FormLabel fontSize={14} color="#4C535F">
                    Last name
                  </FormLabel>
                  <Input
                    placeholder="Please enter your last name"
                    bg="#EDF2F6"
                    borderWidth={1}
                    borderColor="#F1F1F3"
                    w={'100%'}
                    color="#4C535F"
                    _placeholder={{ color: '#656567' }}
                    value={values?.lastname}
                    onChange={(e) => {
                      setFieldValue('lastname', e.target.value);
                    }}
                  />

                  <FormErrorMessage>{errors.lastname}</FormErrorMessage>
                </FormControl>
              </HStack>

              <HStack w={'100%'}>
                <FormControl mb={4}>
                  <FormLabel fontSize={14} color="#4C535F">
                    Email
                  </FormLabel>
                  <Input
                    placeholder="Please enter your email"
                    bg="#EDF2F6"
                    borderWidth={1}
                    borderColor="#F1F1F3"
                    w={'100%'}
                    disabled
                    color="#4C535F"
                    _placeholder={{ color: '#656567' }}
                    value={values?.email}
                    onChange={(e) => {
                      setFieldValue('email', e.target.value);
                    }}
                  />

                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>{' '}
                <FormControl mb={4}>
                  <FormLabel fontSize={14} color="#4C535F">
                    Phone number
                  </FormLabel>
                  <Input
                    placeholder="Please enter your phone number"
                    bg="#EDF2F6"
                    borderWidth={1}
                    borderColor="#F1F1F3"
                    w={'100%'}
                    color="#4C535F"
                    _placeholder={{ color: '#656567' }}
                    value={values?.phone}
                    onChange={(e) => {
                      setFieldValue('phone', e.target.value);
                    }}
                  />

                  <FormErrorMessage>{errors.phone}</FormErrorMessage>
                </FormControl>
              </HStack>
              <Divider />
              <Stack
                borderBottomWidth={2.23}
                borderColor={'#FF8C00'}
                pb={1}
                my={4}
              >
                <Heading color={'#FF8C00'} fontWeight={700} fontSize={'xl'}>
                  Billing Address
                </Heading>
              </Stack>
              <HStack
                w={'100%'}
                justifyContent={'center'}
                gap={6}
                alignItems={'center'}
              >
                <FormControl mb={4}>
                  <FormLabel fontSize={14} color="#4C535F">
                    Province
                  </FormLabel>
                  <Input
                    placeholder="Please enter your province"
                    bg="#EDF2F6"
                    borderWidth={1}
                    borderColor="#F1F1F3"
                    w={'100%'}
                    color="#4C535F"
                    _placeholder={{ color: '#656567' }}
                    value={values?.province}
                    onChange={(e) => {
                      setFieldValue('province', e.target.value);
                    }}
                  />

                  <FormErrorMessage>{errors.province}</FormErrorMessage>
                </FormControl>{' '}
                <FormControl mb={4}>
                  <FormLabel fontSize={14} color="#4C535F">
                    Home Address
                  </FormLabel>
                  <Input
                    placeholder="Please enter your address"
                    bg="#EDF2F6"
                    borderWidth={1}
                    borderColor="#F1F1F3"
                    w={'100%'}
                    color="#4C535F"
                    _placeholder={{ color: '#656567' }}
                    value={values?.address}
                    onChange={(e) => {
                      setFieldValue('address ', e.target.value);
                    }}
                  />

                  <FormErrorMessage>{errors.address}</FormErrorMessage>
                </FormControl>
              </HStack>
            </>
          )}
        </Formik>

        <HStack
          justifyContent={'flex-start'}
          gap={4}
          alignItems={'center'}
          mt={4}
        >
          <Button
            text="Update Profile"
            bg="#02659C"
            onClick={() => formRef?.current?.handleSubmit()}
            isLoading={buttonLoading}
          />
          <Button
            text="Reset"
            bg="transparent"
            variant="outline"
            border="transparent"
            color="#4C535F"
          />
        </HStack>
      </VStack>
    </ParentContainer>
  );
};

export default Account;
