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
} from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/ui/button';
import ParentContainer from '~/lib/layout/ParentContainer';

const Account = () => {
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
          >
            <Image src="/images/upload.svg" alt="upload" />
            <Text mt={2} color={'#4C535F'} fontWeight={500} fontSize={10}>
              Upload your photo
            </Text>
          </VStack>
        </VStack>
        <Divider />

        <FormControl my={4}>
          <FormLabel fontSize={14} color="#4C535F">
            Full name
          </FormLabel>
          <Input
            placeholder="Please enter your full name"
            bg="#EDF2F6"
            borderWidth={1}
            borderColor="#F1F1F3"
            w={'100%'}
            color="#4C535F"
            _placeholder={{ color: '#656567' }}
            onChange={(e) => {}}
          />

          <FormErrorMessage></FormErrorMessage>
        </FormControl>
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
              color="#4C535F"
              _placeholder={{ color: '#656567' }}
              onChange={(e) => {}}
            />

            <FormErrorMessage></FormErrorMessage>
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
              onChange={(e) => {}}
            />

            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </HStack>

        <Divider />
        <Stack borderBottomWidth={2.23} borderColor={'#FF8C00'} pb={1} my={4}>
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
              placeholder="United Kingdom"
              bg="#EDF2F6"
              borderWidth={1}
              borderColor="#F1F1F3"
              w={'100%'}
              color="#4C535F"
              _placeholder={{ color: '#656567' }}
              onChange={(e) => {}}
            />

            <FormErrorMessage></FormErrorMessage>
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
              onChange={(e) => {}}
            />

            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </HStack>
        <HStack
          justifyContent={'flex-start'}
          gap={4}
          alignItems={'center'}
          mt={4}
        >
          <Button text="Update Profile" bg="#02659C" />
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
