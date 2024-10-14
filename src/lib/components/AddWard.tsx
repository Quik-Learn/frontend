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
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from './ui/button';
import PasswordInput from './ui/password-input';

export const AddWard = ({ setNew }: any) => {
  return (
    <ModalContent bg={'white'} p={6}>
      <ModalHeader
        color={'#5F5F5F'}
        fontSize={32}
        fontWeight={700}
        textAlign={'center'}
      >
        Add Ward
      </ModalHeader>
      <ModalCloseButton borderColor={'#fff'} />
      <ModalBody>
        <Text color={'#5F5F5F'} fontSize={20} textAlign={'center'}>
          Create a ward account or Add your already registered ward. You stay in
          control of payment and are able to track their progress.
        </Text>
      </ModalBody>

      <ModalFooter flexDir={'column'} gap={5}>
        <Button
          bg="#0A52A8"
          text="Create new ward"
          onClick={() => setNew('new')}
        />
        <Button
          bg="#0A52A8"
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
  addWard,
  isLoading,
}: any) => {
  return (
    <ModalContent bg={'#fff'} maxH={'80vh'} overflowY={'auto'}>
      <ModalHeader
        color={'#5F5F5F'}
        fontSize={32}
        fontWeight={700}
        textAlign={'center'}
      >
        Create New Ward
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {/* <Text color={'#5F5F5F'} fontSize={20} textAlign={'center'}>
          Form Builder is free to use. Sign up using your email address or phone
          number below to get started.
        </Text> */}

        <Formik
          initialValues={initialValues}
          innerRef={formRef}
          onSubmit={(values) => {
            console.log('submit');
            addWard(values);
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={signInSchema}
        >
          {({ errors, setFieldValue, values }: any) => (
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
              width="100%"
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
                <Text fontSize={10} color={'red'}>
                  {errors?.firstname}
                </Text>
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
                <Text fontSize={10} color={'red'}>
                  {errors?.lastname}
                </Text>
              </FormControl>

              {/* <FormControl gridColumn={{ base: 'span 3', md: 'span 3' }}>
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
                  color="#1D2026"
                  w={'100%'}
                  _placeholder={{ color: '#8C94A3' }}
                  onSelect={(e) => console.log(e)}
                >
                  <option value="K1">K1</option>
                  <option value="K2">K2</option>
                </Select>
                <Text fontSize={10} color={'red'}></Text>
              </FormControl> */}
              <FormControl gridColumn={{ base: 'span 4', md: 'span 4' }}>
                <FormLabel fontSize={14} color="#262626" fontWeight={500}>
                  Gender
                </FormLabel>
                <Select
                  placeholder=""
                  bg="#FCFCFD"
                  borderWidth={1}
                  borderColor="#F1F1F3"
                  fontSize={14}
                  value={values.sex}
                  w={'100%'}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('sex', e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
                <Text fontSize={10} color={'red'}>
                  {errors?.sex || ''}
                </Text>
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
                  onChange={(e: any) => setFieldValue('state', e.target.value)}
                >
                  <option value="Lagos">Lagos</option>
                </Select>
                <FormErrorMessage fontSize={10} color={'#f00'}>
                  {errors.state || ''}
                </FormErrorMessage>
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
                  value={values.address}
                  p={5}
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('address', e.target.value)}
                />
                <Text fontSize={10} color={'red'}>
                  {errors?.address || ''}
                </Text>
              </FormControl>
              <FormControl gridColumn={{ base: 'span 4', md: 'span 4' }}>
                <FormLabel fontSize={14} color="#262626" fontWeight={500}>
                  Date Of Birth
                </FormLabel>
                <Input
                  placeholder="Enter date of birth"
                  bg="#FCFCFD"
                  borderWidth={1}
                  borderColor="#F1F1F3"
                  fontSize={14}
                  value={values.DOB}
                  p={5}
                  type="date"
                  color="#1D2026"
                  _placeholder={{ color: '#8C94A3' }}
                  onChange={(e) => setFieldValue('DOB', e.target.value)}
                />
                <Text fontSize={10} color={'red'}>
                  {errors?.DOB || ''}
                </Text>
              </FormControl>
              <Stack gridColumn={{ base: 'span 4', md: 'span 4' }}>
                <PasswordInput
                  value={values.password}
                  onChange={(e: any) =>
                    setFieldValue('password', e.target.value)
                  }
                  label="Password"
                  error={errors.password}
                  placeholder="Enter Password"
                />
              </Stack>
            </SimpleGrid>
          )}
        </Formik>
      </ModalBody>

      <ModalFooter>
        <Button
          text="Add"
          width={'100%'}
          bg="#0A52A8"
          isLoading={isLoading}
          onClick={() => {
            console.log('clicked');
            formRef?.current?.handleSubmit();
          }}
        />
      </ModalFooter>
    </ModalContent>
  );
};
export const AddRegistered = ({ value, setValue, wards, connectWard }: any) => {
  return (
    <ModalContent bg={'#fff'} maxH={'80vh'} overflowY={'auto'}>
      <ModalHeader
        color={'#5F5F5F'}
        fontSize={22}
        fontWeight={700}
        textAlign={'center'}
      >
        Add already Registered Ward
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl mb={5}>
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
        {wards?.map((item: any) => (
          <HStack
            w={'100%'}
            mb={5}
            spacing={2}
            justifyContent={'space-between'}
            alignItems={'center'}
            gap={3}
          >
            <Avatar />
            <VStack flex={1} alignItems={'flex-start'}>
              <Text fontWeight={500} fontSize={18} color={'#000000'}>
                {item?.firstname || ''} {item?.lastname || ''}
              </Text>
              <Text fontWeight={400} fontSize={14} color={'#BCC2CC'} mt={-2}>
                {item?.email || ''}
              </Text>
            </VStack>
            <Button
              width={86}
              bg="#0A52A8"
              text="Add"
              onClick={() => {
                connectWard({
                  email: item?.email,
                  firstname: item?.firstname,
                  lastname: item?.lastname,
                });
              }}
            />
          </HStack>
        ))}
      </ModalBody>
    </ModalContent>
  );
};
export const AddSubject = ({
  data,
  selected,
  filterText,
  setFilterText,
  isLoading,
  setSelected,
  handleSubmit,
}: any) => {
  return (
    <ModalContent bg={'#fff'} maxH={'80vh'} overflowY={'auto'}>
      <ModalHeader
        color={'#5F5F5F'}
        fontSize={32}
        fontWeight={700}
        textAlign={'center'}
      >
        Add Subject for Ward
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {selected?.length ? (
          <HStack
            flexWrap={'wrap'}
            gap={4}
            mb={10}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            alignSelf={'flex-start'}
          >
            {selected?.map((item: any) => (
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
            Select 5 Subject of Interest
          </FormLabel>

          <Input
            placeholder="Search"
            bg="#ffffff"
            borderWidth={1}
            borderColor="#E9EAF0"
            value={filterText}
            p={5}
            color="#1D2026"
            _placeholder={{ color: '#8C94A3' }}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <Text>{''}</Text>
        </FormControl>
        <HStack flexWrap={'wrap'} gap={4} mb={10}>
          {data?.map((item: any) => (
            <Stack
              onClick={() => {
                console.log(selected, item);
                if (
                  selected?.length &&
                  selected?.find((itemm: any) => itemm?.name === item?.name)
                ) {
                  const lastSelectedIndex = selected.lastIndexOf(item);
                  const updatedSelected = [...selected];
                  updatedSelected.splice(lastSelectedIndex, 1); // Remove the last selected item
                  setSelected(updatedSelected);
                } else {
                  setSelected((prev: any) => [...prev, item]);
                }
              }}
              borderWidth={1.5}
              bgColor={'#5F5F5F'}
              bg={
                selected.find((itemm: any) => itemm?.name === item.name)
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
                  selected.find((itemm: any) => itemm?.name === item?.name)
                    ? 'white'
                    : '#5F5F5F'
                }
              >
                {item?.name}
              </Text>
            </Stack>
          ))}
        </HStack>
      </ModalBody>

      <ModalFooter>
        <Button
          text="Submit"
          bg="#0065FF"
          isLoading={isLoading}
          isDisabled={isLoading}
          onClick={handleSubmit}
        />
      </ModalFooter>
    </ModalContent>
  );
};
