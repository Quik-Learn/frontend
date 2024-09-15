/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { VStack, Image, Text, Stack, useToast } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';

import SignupWrapper from '~/lib/components/ui/signup-wrapper';
import {
  useRegisterAccountMutation,
  useVerifyOTPMutation,
} from '~/lib/services/auth-service';

const Verify = () => {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [verifyOTP, { data, isSuccess, isLoading, isError, error }] =
    useVerifyOTPMutation();

  const token = searchParams.get('otp');
  const email = searchParams.get('email');
  // const role = searchParams.get('role');
  console.log('first', token, email);
  useEffect(() => {
    if (token && email) verifyOTP({ token, email });
  }, []);
  useEffect(() => {
    if (isSuccess) {
      if (data?.data?.user?.account_type === 'Parent') {
        toast({
          title: 'Verified Successfully',
          description: 'You have successfully logged in with Facebook',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        router.push('/auth/login');
      } else {
        router.push('/auth/subject');
      }
    }
  }, [isSuccess, router]);

  return (
    <SignupWrapper img="/images/login.svg" bg="#FF8C00">
      <VStack
        padding={{ base: 5, md: 8, lg: 10 }}
        maxHeight="100vh"
        overflowY="auto"
      >
        {isLoading ? (
          <Stack align={'center'} justify={'center'}>
            <Bars />
          </Stack>
        ) : (
          <VStack
            alignItems="center"
            justifyContent="center"
            w={{ base: '100%', lg: '536px' }}
          >
            <Text
              color="#59595A"
              fontSize={{ base: 20, lg: 24 }}
              textAlign="center"
              mt={20}
            >
              Your account has been verified successfully! You will be
              redirected to the login page in few seconds
            </Text>
            <Image
              src="/images/success.svg"
              alt="success"
              w="500px"
              h="500px"
            />
          </VStack>
        )}
      </VStack>
    </SignupWrapper>
  );
};

export default Verify;
