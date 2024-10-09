/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { VStack, Image, Text, Stack, useToast } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Bars } from 'react-loader-spinner';

import SignupWrapper from '~/lib/components/ui/signup-wrapper';
import {
  useRegisterAccountMutation,
  useVerifyOTPMutation,
} from '~/lib/services/auth-service';
import { useAppDispatch } from '~/lib/store';
import { setToken } from '~/lib/store/reducers/token-slice';
import { setType } from '~/lib/store/reducers/type-slice';

const VerifyWard = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const hasVerified = useRef(false); // Use ref to track first call
  const [firstRender, setFirstRender] = useState(true); // Track first render
  const searchParams = useSearchParams();
  const [verifyOTP, { data, isSuccess, isLoading, isError, error }] =
    useVerifyOTPMutation();
  const token = useMemo(() => searchParams.get('token'), [searchParams]);
  const email = useMemo(() => searchParams.get('email'), [searchParams]);

  useEffect(() => {
    if (token && email && !hasVerified.current) {
      hasVerified.current = true;
      verifyOTP({ token, email });
    }
  }, [token, email, hasVerified, verifyOTP]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Verified Successfully',
        description: 'You have successfully verified your email address',
        status: 'success',
        duration: 9000,
        position: 'top',
        isClosable: true,
      });
      console.log(data);
      dispatch(setToken(data?.data?.auth_token));

      dispatch(setType('Student'));
      router.push('/student');
    }
    if (isError) {
      toast({
        //@ts-ignore
        title: error?.error?.message,
        description: 'An error occured, try again',
        status: 'error',
        duration: 9000,
        position: 'top',
        isClosable: true,
      });
    }
  }, [isSuccess, data?.data, isError, error]);

  return (
    <SignupWrapper img="/images/login.png" bg="#FF8C00">
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
            {isSuccess ? (
              <Text
                color="#59595A"
                fontSize={{ base: 20, lg: 24 }}
                textAlign="center"
                mt={20}
              >
                Your account has been verified successfully! You will be
                redirected to your dashboard in a few seconds
              </Text>
            ) : null}
            {isError ? (
              <Text>There was a problem with your verification!</Text>
            ) : null}
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

export default memo(VerifyWard);
