import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  FormControl,
  FormLabel,
  SimpleGrid,
  Input,
  Select,
  Stack,
  HStack,
  Avatar,
  VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from './ui/button';

export const AddWard = ({ setNew }: any) => {
  return (
    <ModalContent>
      <ModalHeader>Add Ward</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>
          Create a ward account or Add your already registered ward. You stay in
          control of payment and are able to track their progress.
        </Text>
      </ModalBody>

      <ModalFooter>
        <Button
          color="#0A52A8"
          text="Create new ward"
          onClick={() => setNew('new')}
        />
        <Button
          color="#0A52A8"
          text="Add already registered Ward"
          onClick={() => setNew('old')}
        />
      </ModalFooter>
    </ModalContent>
  );
};

export const NewWard = ({
  initialValues,
  signInSchema,
  formRef,
  setSuccess,
  successFunction,
}: any) => {
  return (
    <ModalContent>
      <ModalHeader>Create New Ward</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>
          Form Builder is free to use. Sign up using your email address or phone
          number below to get started.
        </Text>

        <Formik
          initialValues={initialValues}
          innerRef={formRef}
          onSubmit={(values) => {
            console.log('first', { ...values });
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
                lg: 4,
              }}
              spacing={4}
              alignItems="flex-end"
              justifyContent="space-between"
              width="80%"
            >
              <FormControl gridColumn={{ base: 'span 2', md: 'span 2' }}>
                <FormLabel fontSize={14} color="#262626" fontWeight={500}>
                  Full Name
                </FormLabel>
                <Input
                  placeholder="First Name"
                  bg="#FCFCFD"
                  borderWidth={1}
                  value={values.firstname}
                  fontSize={14}
                  borderColor="#F1F1F3"
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('firstname', e.target.value)}
                />
                <Text fontSize={10} color={'red'}></Text>
              </FormControl>
              <FormControl gridColumn={{ base: 'span 2', md: 'span 2' }}>
                <FormLabel
                  fontSize={14}
                  color="#262626"
                  fontWeight={500}
                ></FormLabel>
                <Input
                  placeholder="Last Name"
                  bg="#FCFCFD"
                  borderWidth={1}
                  value={values.lastname}
                  fontSize={14}
                  borderColor="#F1F1F3"
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('lastname', e.target.value)}
                />
                <Text fontSize={10} color={'red'}></Text>
              </FormControl>

              <FormControl gridColumn={{ base: 'span 3', md: 'span 3' }}>
                <FormLabel fontSize={14} color="#262626" fontWeight={500}>
                  Age (Level)
                </FormLabel>
                <Select
                  placeholder="Select"
                  bg="#FCFCFD"
                  borderWidth={1}
                  borderColor="#F1F1F3"
                  fontSize={14}
                  value={values.phone}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onSelect={(e) => console.log(e)}
                >
                  <option value="K1">K1</option>
                  <option value="K2">K2</option>
                </Select>
                <Text fontSize={10} color={'red'}></Text>
              </FormControl>
              <FormControl gridColumn={{ base: 'span 1', md: 'span 1' }}>
                <FormLabel fontSize={14} color="#262626" fontWeight={500}>
                  Gender
                </FormLabel>
                <Select
                  placeholder="Select"
                  bg="#FCFCFD"
                  borderWidth={1}
                  borderColor="#F1F1F3"
                  fontSize={14}
                  value={values.phone}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onSelect={(e) => console.log(e)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
                <Text fontSize={10} color={'red'}></Text>
              </FormControl>
              <FormControl gridColumn={{ base: 'span 4', md: 'span 4' }}>
                <FormLabel fontSize={14} color="#262626" fontWeight={500}>
                  Email Address
                </FormLabel>
                <Input
                  placeholder="Email Address"
                  bg="#FCFCFD"
                  borderWidth={1}
                  borderColor="#F1F1F3"
                  fontSize={14}
                  value={values.email}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('email', e.target.value)}
                />
                <Text fontSize={10} color={'red'}></Text>
              </FormControl>
              <FormControl gridColumn={{ base: 'span 4', md: 'span 4' }}>
                <FormLabel fontSize={14} color="#262626" fontWeight={500}>
                  Address
                </FormLabel>
                <Input
                  placeholder=" Address"
                  bg="#FCFCFD"
                  borderWidth={1}
                  borderColor="#F1F1F3"
                  fontSize={14}
                  value={values.email}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('email', e.target.value)}
                />
                <Text fontSize={10} color={'red'}></Text>
              </FormControl>
            </SimpleGrid>
          )}
        </Formik>
      </ModalBody>

      <ModalFooter>
        <Button
          text="Add"
          width={'100%'}
          bg="##0A52A8"
          onClick={() => successFunction()}
        />
      </ModalFooter>
    </ModalContent>
  );
};
export const AddRegistered = ({ value, setValue, data }: any) => {
  return (
    <ModalContent>
      <ModalHeader>Add already Registered Ward</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>
          Form Builder is free to use. Sign up using your email address or phone
          number below to get started.
        </Text>
        <FormControl>
          <Input
            placeholder="Enter Name or email address to search"
            bg="#FCFCFD"
            borderWidth={1}
            value={value}
            fontSize={14}
            borderColor="#F1F1F3"
            p={5}
            color="#1D2026"
            _placeholder={{ color: '#8C94A3' }}
            onChange={(e) => setValue(e.target.value)}
          />
        </FormControl>
        {data?.map((item: any) => (
          <HStack
            w={'100%'}
            mb={5}
            spacing={2}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Avatar />
            <VStack flex={1}>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
            </VStack>
            <Button width={86} text="Add" />
          </HStack>
        ))}
      </ModalBody>

      <ModalFooter>
        <Button color="#0A52A8" text="Create new ward" onClick={() => {}} />
        <Button
          color="#0A52A8"
          text="Add already registered Ward"
          onClick={() => {}}
        />
      </ModalFooter>
    </ModalContent>
  );
};
