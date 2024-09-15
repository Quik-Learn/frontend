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
import { MdArrowOutward } from 'react-icons/md';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import * as yup from 'yup';
import { signInWithGoogle, signInWithFacebook } from '../../services/Aurh';
import Button from '~/lib/components/ui/button';
import SignupWrapper from '~/lib/components/ui/signup-wrapper';
import { useAuth } from '~/lib/hooks/useAuth';
import { useLoginAccountMutation } from '~/lib/services/auth-service';
import { useForgotHook } from '../reset/useForgot.hook';
import { FaCheckCircle } from 'react-icons/fa';

const Forgot = () => {
  const router = useRouter();
  // const {userData} = useAuth();
  const formRef = useRef<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const {userData} = useAuth();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { forgotPassword, isLoading } = useForgotHook(
    () => {},
    () => onOpen()
  );

  const signInSchema = yup.object().shape({
    email: yup.string().required('Please enter your email'),
  });
  const googleLogin = async () => {
    try {
      await signInWithGoogle();

      // setShowToast({
      //   show: true,
      //   status: 'success',
      //   title: 'Google Login Successful',
      //   desc: 'You have successfully logged in with Google.',
      // });
      // router.push('/auth/select-user');
    } catch (err) {
      setShowToast({
        show: true,
        status: 'error',
        title: 'Google Login Failed',
        desc: 'An error occurred during Google login. Please try again.',
      });
      console.error(err);
    }
  };

  const initialValues: any = {
    email: '',
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
          Forgot Password?
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
            forgotPassword(values);
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
              <FormControl gridColumn="span 2">
                <FormLabel fontSize={14} color="#262626" fontWeight={500}>
                  Email
                </FormLabel>
                <Input
                  placeholder="Email Address"
                  bg="#FCFCFD"
                  borderWidth={1}
                  borderColor="#F1F1F3"
                  value={values.email}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('email', e.target.value)}
                />
                <Text fontSize={10} color={'red'}>
                  {errors.email || ''}
                </Text>
              </FormControl>

              <Stack mt={5} gridColumn={{ base: 'span 2', md: 'span 2' }}>
                <Button
                  text="Request Link"
                  width={'100%'}
                  bg="#FF8C00"
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  onClick={handleSubmit}
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
                    <ModalBody>
                      A reset password link has sent to you!
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        text="Close"
                        bg="#02659C"
                        color="#fff"
                        mr={3}
                        onClick={() => {
                          // router.push('/auth/reset-password');
                          onClose();
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

export default Forgot;
