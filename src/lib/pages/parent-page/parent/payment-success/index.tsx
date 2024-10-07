'use client';

import { VStack, Text, Stack, Spinner } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useVerifyPaymentMutation } from '~/lib/services/parent-mutation';
import { Image } from '@chakra-ui/react';
import ParentContainer from '~/lib/layout/ParentContainer';
const PaymentSuccess = () => {
  const router = useRouter();
  const [verifyPayment, { data, isSuccess, isLoading, isError, error, reset }] =
    useVerifyPaymentMutation();

  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  console.log(reference);
  useEffect(() => {
    if (reference) {
      verifyPayment(reference);
    }
  }, [reference]);

  useEffect(() => {
    if (isSuccess) {
      router.push('/parent/payment');
    }
  }, [isSuccess]);

  return (
    <ParentContainer>
      <VStack
        padding={{ base: 5, md: 8, lg: 10 }}
        maxHeight="100vh"
        overflowY="auto"
        justify="center"
        align="center"
        gap={10}
      >
        {isLoading ? (
          <Stack align={'center'} justify={'center'}>
            <Spinner />
          </Stack>
        ) : (
          <>
            {isSuccess ? (
              <Text
                color="#59595A"
                fontSize={{ base: 20, lg: 24 }}
                textAlign="center"
                mt={20}
              >
                Payment Successfull
              </Text>
            ) : (
              <Text
                color="#590000"
                fontSize={{ base: 20, lg: 24 }}
                textAlign="center"
                mt={20}
              >
                Payment Failed, try again
              </Text>
            )}

            <Image
              src="/images/success.svg"
              alt="success"
              w="600px"
              h="500px"
            />
          </>
        )}
      </VStack>
    </ParentContainer>
  );
};

export default PaymentSuccess;
