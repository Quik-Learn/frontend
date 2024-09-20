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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Formik } from 'formik';
import * as yup from 'yup';
import { MdArrowOutward } from 'react-icons/md';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';

import { signInWithGoogle, signInWithFacebook } from '../../services/Aurh';
import Button from '~/lib/components/ui/button';
import SignupWrapper from '~/lib/components/ui/signup-wrapper';
import { useAuth } from '~/lib/hooks/useAuth';
import { useLoginAccountMutation } from '~/lib/services/auth-service';
import useForgotPassword from './forgot-password';
import PasswordInput from '~/lib/components/ui/password-input';
import { FaCheckCircle } from 'react-icons/fa';
const Reset = () => {
  const formRef = useRef<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  // const {userData} = useAuth();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { verifyPassword, isLoading } = useForgotPassword(
    () => {},
    () => onOpen()
  );

  const signInSchema = yup.object().shape({
    new_password2: yup
      .string()
      .required('Please confirm password')
      // @ts-ignore
      .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
    new_password: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
  });

  const initialValues: any = {
    new_password2: '',
    new_password: '',
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef?.current?.handleSubmit();
    }
  };

  return (
    <Stack
      maxHeight="100vh"
      padding={{ base: 5, md: 8, lg: 10 }}
      align={'center'}
      justify={'center'}
      overflowY="auto"
    >
      <VStack mt={40} w={{ base: '100%', lg: '50%' }}>
        {/* <Image src="/images/logo.svg" alt="logo" h={110} w={110} /> */}
        <Heading
          fontSize={{ base: '28px', lg: '40px' }}
          color="#1D2026"
          fontWeight="semibold"
          marginTop={6}
          textAlign="center"
        >
          Create New Password
        </Heading>
        <Text
          color="#4C4C4D"
          fontSize={{ base: 12, md: 16 }}
          textAlign="center"
        >
          Enter your email address to get a reset Password Link
        </Text>
        <Formik
          initialValues={initialValues}
          innerRef={formRef}
          onSubmit={(values) => {
            console.log('first', { token, ...values });
            verifyPassword({ token, ...values });
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
              width="80%"
            >
              <Stack gridColumn="span 2">
                <PasswordInput
                  value={values.new_password}
                  onChange={(e) =>
                    setFieldValue('new_password', e.target.value)
                  }
                  label="Password"
                  error={errors.new_password}
                  placeholder="Enter Password"
                />
              </Stack>
              <Stack gridColumn="span 2">
                <PasswordInput
                  value={values.new_password2}
                  onChange={(e) =>
                    setFieldValue('new_password2', e.target.value)
                  }
                  label="Confirm Password"
                  error={errors.new_password2}
                  placeholder="Re-enter Password"
                />
              </Stack>

              <Stack mt={5} gridColumn={{ base: 'span 2', md: 'span 2' }}>
                <Button
                  text="Reset Password"
                  width={'100%'}
                  bg="#FF8C00"
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  onClick={onOpen}
                />
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                  <ModalOverlay />

                  <ModalContent
                    justifyContent={'center'}
                    alignItems={'center'}
                    py={30}
                    w={{ base: '70vw', md: '50vw', lg: '642' }}
                  >
                    <Icon as={FaCheckCircle} color="#009922" boxSize={12} />

                    <ModalHeader>Successful</ModalHeader>
                    {/* <ModalCloseButton /> */}
                    <ModalBody>Password has successfully been reset!</ModalBody>

                    <ModalFooter>
                      <Button
                        text="Login"
                        bg="#02659C"
                        color="#fff"
                        mr={3}
                        onClick={() => {
                          onClose();
                          router.push('/auth/login');
                        }}
                      />
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Stack>
            </SimpleGrid>
          )}
        </Formik>
      </VStack>
    </Stack>
  );
};

export default Reset;
