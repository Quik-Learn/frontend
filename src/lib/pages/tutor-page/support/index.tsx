'use client';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Select,
  Stack,
  Textarea,
  useDisclosure,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import TutorContainer from '~/lib/layout/TutorContainer';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import Button from '~/lib/components/ui/button';
import SuccessModal from '~/lib/components/ui/success-modal';
import { useSendFedbackMutation } from '~/lib/services/user-service';
import { useSetSubjectHook } from '../../auth/subject/useSetSubject';
const Support = () => {
  const formRef = useRef<any>(null);
  const router = useRouter();
  const toast = useToast();
  const { subjects } = useSetSubjectHook();
  const [sendFedback, { isLoading, isSuccess, isError, error, reset }] =
    useSendFedbackMutation();
  const {
    isOpen: isOpenn,
    onOpen: onOpenn,
    onClose: onClosee,
  } = useDisclosure();
  const [successData, setSuccessData] = useState({
    title: '',
    description: '',
    buttonText: '',
  });
  const signInSchema = yup.object().shape({
    category: yup.string().required('Please select category'),
    subject: yup.string().required('Please select  subject'),
    message: yup.string().required('Please enter your message'),
  });

  const initialValues: any = {
    category: '',
    subject: '',
    message: '',
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef?.current?.handleSubmit();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setSuccessData({
        title: 'Sent Successfully!',
        description: 'We have received your feedback',
        buttonText: 'Close',
      });
      onOpenn();
    }
    if (isError) {
      toast({
        //@ts-ignore
        title: error?.data?.error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isSuccess, isError]);
  console.log(subjects);
  return (
    <TutorContainer>
      <VStack p={6} w={'100%'}>
        <Heading
          fontSize={'2xl'}
          w={'100%'}
          color={'#000000'}
          mb={4}
          fontWeight={700}
        >
          Feedback
        </Heading>
        <VStack bg={'#FFFFFF'} p={4} w={'100%'}>
          <Heading
            fontSize={'2xl'}
            textAlign={'left'}
            alignSelf={'flex-start'}
            color={'#000000'}
            fontWeight={700}
            mb={10}
          >
            Write to us!
          </Heading>

          <Formik
            initialValues={initialValues}
            innerRef={formRef}
            onSubmit={(values) => {
              sendFedback(values);
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={signInSchema}
          >
            {({ errors, setFieldValue, values }: any) => (
              <>
                <FormControl mb={4}>
                  <FormLabel fontSize={14} color="#262626">
                    Type of feedback
                  </FormLabel>
                  <Select
                    placeholder="Select Category"
                    bg="#FCFCFD"
                    borderWidth={1}
                    value={values.category}
                    borderColor="#F1F1F3"
                    w={'100%'}
                    color="#262626"
                    _placeholder={{ color: '#656567' }}
                    onChange={(e) => setFieldValue('category', e.target.value)}
                  >
                    <option value="Complaint">Complaint</option>
                    <option value="Suggestion">Suggestion</option>
                    <option value="Enquiry">Enquiry</option>
                  </Select>
                  <FormErrorMessage color={'red'} fontSize={12}>
                    {errors?.category}
                  </FormErrorMessage>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel fontSize={14} color="#262626">
                    Subject
                  </FormLabel>
                  <Select
                    placeholder="Select Subject"
                    bg="#FCFCFD"
                    borderWidth={1}
                    value={values.subject}
                    borderColor="#F1F1F3"
                    color="#262626"
                    _placeholder={{ color: '#656567' }}
                    onChange={(e) => setFieldValue('subject', e.target.value)}
                  >
                    {subjects?.map((subject: any) => (
                      <option key={subject?.id} value={subject?.id}>
                        {subject?.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage color={'red'} fontSize={12}>
                    {errors?.subject}
                  </FormErrorMessage>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel fontSize={14} color="#262626">
                    Message
                  </FormLabel>
                  <Textarea
                    placeholder="Enter your Message here..."
                    bg="#FCFCFD"
                    borderWidth={1}
                    borderColor="#F1F1F3"
                    value={values.message}
                    color="#262626"
                    _placeholder={{ color: '#656567' }}
                    h={249}
                    onChange={(e) => setFieldValue('message', e.target.value)}
                  />
                  <FormErrorMessage color={'red'} fontSize={12}>
                    {errors?.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack mt={5} alignItems={'flex-end'} w={'100%'}>
                  <Button
                    text="Send Your Message"
                    bg="#0065FF"
                    fontSize={10}
                    width={135}
                    isLoading={isLoading}
                    onClick={() => {
                      handleSubmit();
                    }}
                  />
                </Stack>
              </>
            )}
          </Formik>
        </VStack>
      </VStack>
      <SuccessModal
        onClose={onClosee}
        isOpen={isOpenn}
        title={successData?.title}
        description={successData?.description}
        buttonText={successData?.buttonText}
      />
    </TutorContainer>
  );
};

export default Support;
