'use client';

import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  useToast,
  Stack,
} from '@chakra-ui/react';
import Button from '~/lib/components/ui/button';
import ParentContainer from '~/lib/layout/ParentContainer';
import { useParams, useRouter } from 'next/navigation';
import {
  useLazyGetAPaymentQuery,
  useSubscribeMutation,
} from '~/lib/services/parent-mutation';
import { useEffect, useState } from 'react';
import moment from 'moment';
import InvoicesData from '~/lib/components/InvoicesData';
import Loader from '~/lib/components/Loader';
const SubscriptionPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const toast = useToast();
  const [paymentData, setPaymentData] = useState<any>([]);
  const [renew, setRenew] = useState(false);
  const [subscribe, subscriptionData] = useSubscribeMutation();
  const [trigger, { data, isLoading, isError, error, isSuccess }] =
    useLazyGetAPaymentQuery();
  useEffect(() => {
    trigger(id);
  }, [id]);

  useEffect(() => {
    if (isSuccess) {
      setPaymentData(data?.data);
      const secondsApart =
        new Date(data?.data?.subscription?.next_payment).getTime() -
          new Date().getTime() <
        0;

      setRenew(secondsApart);
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
      router.back();
    }
  }, [isSuccess, data, isError, error]);
  useEffect(() => {
    const { data, isLoading, isError, error, isSuccess } = subscriptionData;
    if (isSuccess) {
      window.location.href = data?.data?.payment_url;
    }
    if (isError) {
      toast({
        title:
          //@ts-ignore
          error?.data?.error?.message || error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [subscriptionData]);

  return (
    <ParentContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <Box p={8} bg="gray.50" minH="100vh">
          {/* Subscription Details */}
          <HStack alignItems={'center'} w={'100%'} my={5}>
            <VStack
              bg={'#FFFFFF'}
              w={'50%'}
              height={220}
              p={6}
              borderRadius={10}
            >
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
                      <Text>{paymentData?.subscription?.plan_name} </Text>
                    </Box>
                    <Text fontSize={20} fontWeight={500} color={'#000'}></Text>
                  </HStack>

                  <HStack>
                    <Heading
                      as="h2"
                      fontSize={80}
                      fontWeight={900}
                      color={'#000'}
                    >
                      ₦{paymentData?.subscription?.plan_amount}
                    </Heading>
                    <Text color={'#000'}>/month</Text>
                  </HStack>
                </HStack>
              </VStack>
              <HStack w={'100%'} justifyContent={'space-between'}>
                <Text
                  fontSize={14}
                  fontWeight={500}
                  color={'#000'}
                  textTransform={'capitalize'}
                >
                  {paymentData?.firstname} {paymentData?.lastname}
                </Text>
                <HStack spacing={3}>
                  <Button bg="#FBA333" text="Upgrade Plan" isDisabled={true} />
                  <Button
                    bg="#0065FF"
                    text="Renew Plan"
                    isDisabled={!renew}
                    onClick={() =>
                      subscribe({
                        ward_id: id,
                        plan_id: paymentData?.subscription?.id || '',
                      })
                    }
                  />
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
                  {moment(paymentData?.subscription?.end_date).format('ll')}
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
          <InvoicesData data={paymentData?.invoices} />
        </Box>
      )}
    </ParentContainer>
  );
};

export default SubscriptionPage;
