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
import { Formik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import * as yup from 'yup';
import Button from '~/lib/components/ui/button';
import useForgotPassword from '../reset/forgot-password';
import { FaCheckCircle } from 'react-icons/fa';

const Forgot = () => {
  const router = useRouter();
  // const {userData} = useAuth();
  const formRef = useRef<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const {userData} = useAuth();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { forgotPassword, isLoading } = useForgotPassword(
    () => {
      onOpen();
    },
    () => {}
  );

  const signInSchema = yup.object().shape({
    email: yup.string().required('Please enter your email'),
  });

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
      overflowY="scroll"
      sx={{
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
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
                <Text fontSize={10} color={'red'}></Text>
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
                        mx={3}
                        onClick={onClose}
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
