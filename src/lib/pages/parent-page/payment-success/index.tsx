'use client';

import { VStack, Text, Stack, Spinner } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useVerifyPaymentMutation } from '~/lib/services/parent-mutation';
import { Image } from '@chakra-ui/react';
import ParentContainer from '~/lib/layout/ParentContainer';
import { Bars } from 'react-loader-spinner';

const PaymentSuccess = () => {
  const router = useRouter();
  const hasVerifiedPayment = useRef(false); // Use ref to track first call
  const [verifyPayment, { data, isSuccess, isLoading, isError, error }] =
    useVerifyPaymentMutation();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  useEffect(() => {
    if (reference && !hasVerifiedPayment.current) {
      // Ensure it runs only once
      hasVerifiedPayment.current = true;
      verifyPayment(reference);
    }
  }, [reference, verifyPayment]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsLoadingData(false);
        router.push('/parent/wards');
      }, 4 * 1000);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, router, error]);

  return (
    <ParentContainer>
      <VStack
        padding={{ base: 5, md: 8, lg: 10 }}
        maxHeight="100vh"
        overflowY="scroll"
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        justify="center"
        align="center"
        gap={10}
      >
        {isLoadingData ? (
          <Stack align={'center'} justify={'center'}>
            <Bars height="80" width="80" color="#0A52A8" />
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
                Payment Successful
              </Text>
            ) : null}
            {isError ? (
              <Text
                color="#F00"
                fontSize={{ base: 20, lg: 24 }}
                textAlign="center"
                mt={20}
              >
                Payment Failed, try again
              </Text>
            ) : null}
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

export default memo(PaymentSuccess);
