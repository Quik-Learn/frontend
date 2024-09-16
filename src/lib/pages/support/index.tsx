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
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import ParentContainer from '~/lib/layout/ParentContainer';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import Button from '~/lib/components/ui/button';
import SuccessModal from '~/lib/components/ui/success-modal';
const Support = () => {
  const formRef = useRef<any>(null);
  const router = useRouter();
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
  return (
    <ParentContainer>
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
              console.log(values);
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={signInSchema}
          >
            {({ errors, setFieldValue, values }) => (
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
                    onSelect={(e) => {}}
                  >
                    <option value="Value 1">Value</option>
                  </Select>
                  <FormErrorMessage></FormErrorMessage>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel fontSize={14} color="#262626">
                    Subject
                  </FormLabel>
                  <Select
                    placeholder="Select Subject"
                    bg="#FCFCFD"
                    borderWidth={1}
                    value={values.category}
                    borderColor="#F1F1F3"
                    color="#262626"
                    _placeholder={{ color: '#656567' }}
                    onSelect={(e) => {}}
                  >
                    <option value="Value 1">Value</option>
                  </Select>
                  <FormErrorMessage></FormErrorMessage>
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
                  <FormErrorMessage></FormErrorMessage>
                </FormControl>

                <Stack mt={5} alignItems={'flex-end'} w={'100%'}>
                  <Button
                    text="Send Your Message"
                    bg="#0065FF"
                    fontSize={10}
                    width={135}
                    onClick={() => {
                      setSuccessData({
                        title: 'Sent Successfully!',
                        description: 'We have received your feedback',
                        buttonText: 'Close',
                      });
                      onOpenn();
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
    </ParentContainer>
  );
};

export default Support;
