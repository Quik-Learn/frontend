'use client';
import {
  FormLabel,
  Input,
  HStack,
  Stack,
  Text,
  FormControl,
  FormErrorMessage,
  Textarea,
  VStack,
  Image,
  Flex,
  Box,
  Heading,
  Checkbox,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import TutorContainer from '~/lib/layout/TutorContainer';
import { Formik } from 'formik';
import * as yup from 'yup';
import ChangePassword from '~/lib/components/ChangePassword';
import { BsUpload } from 'react-icons/bs';
import useAccount from '../../parent-page/account/useAccount';
import Button from '~/lib/components/ui/button';
const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<any>(null);
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
  const [notifications, setNotifications] = useState([
    { id: 1, label: 'I want to know who buy my course.', checked: false },
    {
      id: 2,
      label: 'I want to know who write a review on my course.',
      checked: true,
    },
    {
      id: 3,
      label: 'I want to know who commented on my lecture.',
      checked: false,
    },
    {
      id: 4,
      label: 'I want to know who download my lecture notes.',
      checked: true,
    },
    {
      id: 5,
      label: 'I want to know who replied on my comment.',
      checked: false,
    },
    {
      id: 6,
      label: 'I want to know daily how many people visited my profile.',
      checked: false,
    },
    {
      id: 7,
      label: 'I want to know who download my lecture attach file.',
      checked: true,
    },
  ]);
  const handleNotificationChange = (id: any) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, checked: !notif.checked } : notif
      )
    );
  };
  const handleNotificationSave = () => {
    console.log(notifications);
  };

  return (
    <TutorContainer>
      <Stack p={{ base: 4, md: 6 }}>
        <HStack
          flexDirection={{ base: 'column-reverse', md: 'row' }}
          gap={10}
          w={'100%'}
          justifyContent={'space-between'}
        >
          <Stack flex={1}>
            <Heading color={'#1D2026'} fontWeight={600} fontSize={'xl'}>
              Profile
            </Heading>
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
                  <FormControl mb={4}>
                    <FormLabel fontSize={14} color="#4C535F">
                      Biography
                    </FormLabel>
                    <Textarea
                      placeholder="Your tittle, proffesion or small biography"
                      bg="#EDF2F6"
                      borderWidth={1}
                      borderColor="#F1F1F3"
                      w={'100%'}
                      disabled
                      color="#4C535F"
                      _placeholder={{ color: '#656567' }}
                      value={values?.bio}
                      onChange={(e) => {
                        setFieldValue('bio', e.target.value);
                      }}
                    />

                    <FormErrorMessage>{errors.bio}</FormErrorMessage>
                  </FormControl>
                </>
              )}
            </Formik>
            <Button
              text="Save"
              bg={'#FF8C00'}
              color={'white'}
              width={158}
              isLoading={buttonLoading}
            />
          </Stack>

          <VStack w={264} onClick={handleClick} bg={'#F5F7FA'} padding={8}>
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
            <Stack position={'relative'}>
              <Image src="/images/profilr.svg" alt="upload" />
              <Flex
                gap={3}
                justifyContent={'center'}
                alignItems={'center'}
                position={'absolute'}
                bottom={0}
                right={0}
                p={2}
                w={'100%'}
              >
                <BsUpload size={20} color="white" />
                <Text mt={2} color={'#FFFFFF'} fontWeight={500} fontSize={10}>
                  Upload photo
                </Text>
              </Flex>
            </Stack>
            <Text textAlign={'center'} color={'#4C535F'} fontSize={10}>
              Image size should be under 1MB and image ration needs to be 1:1
            </Text>
          </VStack>
        </HStack>
        <HStack
          mt={10}
          alignItems={'flex-start'}
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Box flex="1">
            <Heading color={'#1D2026'} fontWeight={600} fontSize={'xl'} my={8}>
              Notifications
            </Heading>
            <Stack spacing={3} mb={4}>
              {notifications.map((notif) => (
                <Checkbox
                  colorScheme={notif.checked ? '#1D2026' : '#6E7485'}
                  key={notif.id}
                  isChecked={notif.checked}
                  onChange={() => handleNotificationChange(notif.id)}
                >
                  {notif.label}
                </Checkbox>
              ))}
            </Stack>
            <Button
              bg={'#FF8C00'}
              color={'white'}
              width={158}
              onClick={handleNotificationSave}
              text="Save"
            />
          </Box>
          <ChangePassword />
        </HStack>
      </Stack>
    </TutorContainer>
  );
};

export default Profile;
