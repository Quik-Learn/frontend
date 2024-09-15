'use client';

import {
  Box,
  Text,
  Flex,
  Heading,
  VStack,
  HStack,
  Divider,
  Icon,
  Link,
  Stack,
  Button as ChakraButton,
} from '@chakra-ui/react';
import { MdDownload } from 'react-icons/md';
import Button from '~/lib/components/ui/button';
import ParentContainer from '~/lib/layout/ParentContainer';
import { BiSolidFilePdf } from 'react-icons/bi';
import { TbFileSearch } from 'react-icons/tb';
const SubscriptionPage = () => {
  const invoices = [
    { id: 'Invoice_JD1124', date: '19th, November 2024' },
    { id: 'Invoice_JD1024', date: '19th, October 2024' },
    { id: 'Invoice_JD0924', date: '19th, September 2024' },
    { id: 'Invoice_JD0824', date: '19th, August 2024' },
    { id: 'Invoice_JD0724', date: '19th, July 2024' },
    { id: 'Invoice_JD0624', date: '19th, June 2024' },
  ];

  return (
    <ParentContainer>
      <Box p={8} bg="gray.50" minH="100vh">
        {/* Subscription Details */}
        <HStack alignItems={'center'} w={'100%'} my={5}>
          <VStack bg={'#FFFFFF'} w={'50%'} height={220} p={6} borderRadius={10}>
            <VStack align="start" mb={10} w={'100%'}>
              <HStack spacing={3} w={'100%'} justifyContent={'space-between'}>
                <HStack>
                  <Box
                    bg="#0065FF"
                    px={1}
                    py={1}
                    borderRadius="md"
                    color="white"
                  >
                    <Text>Standard </Text>
                  </Box>
                  <Text fontSize={20} fontWeight={500} color={'#000'}>
                    Plan
                  </Text>
                </HStack>

                <HStack>
                  <Heading
                    as="h2"
                    fontSize={80}
                    fontWeight={900}
                    color={'#000'}
                  >
                    £10
                  </Heading>
                  <Text>/month</Text>
                </HStack>
              </HStack>
            </VStack>
            <HStack w={'100%'} justifyContent={'space-between'}>
              <Text fontSize={24} fontWeight={500} color={'#000'}>
                Joseph Doe
              </Text>
              <HStack spacing={3}>
                <Button bg="#FBA333" text="Upgrade Plan" />
                <Button bg="#0065FF" text="Renew Plan" />
              </HStack>
            </HStack>
          </VStack>
          <VStack
            bg={'#FFFFFF'}
            w={'50%'}
            height={220}
            p={6}
            borderRadius={10}
            justifyContent={'space-between'}
            alignItems={'flex-start'}
          >
            <Stack>
              <Text fontSize={18} fontWeight={500} color={'#5F5F5F'}>
                Next Payment
              </Text>
              <Text fontSize={20} fontWeight={700} color={'#000'}>
                on November 30, 2024
              </Text>
            </Stack>
            <Button
              bg="transparent"
              text="Manage Payments"
              variant="outline"
              border="#5F5F5F"
              color="#5F5F5F"
              width={'183px'}
            />
          </VStack>
        </HStack>

        {/* Invoices List */}
        <Box p={8} borderRadius="md" boxShadow="sm">
          <Heading
            as="h3"
            color="#5F5F5F"
            fontSize={24}
            fontWeight={500}
            mb={4}
          >
            Invoices (12)
          </Heading>
          <VStack align="stretch" spacing={4}>
            {invoices.map((invoice) => (
              <Flex
                key={invoice.id}
                justify="space-between"
                align="center"
                p={4}
                bg="white"
                borderRadius="5px"
              >
                <HStack spacing={3}>
                  <Icon as={BiSolidFilePdf} w={6} h={6} />
                  <Text color="#5F5F5F" fontSize={15} fontWeight={500}>
                    {invoice.id}.pdf
                  </Text>
                </HStack>
                <Text
                  color="#5F5F5F"
                  fontSize={15}
                  fontWeight={500}
                  textAlign={'start'}
                >
                  {invoice.date}
                </Text>

                <HStack spacing={4}>
                  <Icon as={TbFileSearch} w={6} h={6} />{' '}
                  <Icon as={MdDownload} w={6} h={6} />
                </HStack>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Box>
    </ParentContainer>
  );
};

export default SubscriptionPage;
