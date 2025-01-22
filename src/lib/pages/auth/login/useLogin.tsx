import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useLoginAccountMutation } from '~/lib/services/auth-service';
import { useAppDispatch, useAppSelector } from '~/lib/store';
import { redirectState } from '~/lib/store/reducers/redirect-slice';

import { setToken } from '~/lib/store/reducers/token-slice';
import { setType } from '~/lib/store/reducers/type-slice';
import { setUser } from '~/lib/store/reducers/user-slice';

const useLoginHook = () => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const redirect = useAppSelector(redirectState);

  const [loginAccount, { data, isSuccess, isError, error, isLoading }] =
    useLoginAccountMutation();

  // useEffect(() => {
  //   // Get redirect path from URL query parameter when the login page loads
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const redirect = urlParams.get('redirect');
  //   if (redirect) {
  //     setRedirectPath(redirect); // Store the intended path
  //   }
  // }, []);

  useEffect(() => {
    if (isSuccess) {
      if (data?.data?.message?.includes('inactive')) {
        router.push('/auth/success');
      } else {
        document.cookie = `token=${data?.data?.auth_token}; path=/;`;
        document.cookie = `accountType=${data?.data?.user?.account_type}; path=/;`;
        // Set token in Redux state and cookies
        dispatch(setToken(data?.data?.auth_token));

        dispatch(
          setType(
            data?.data?.user?.account_type === 'Instructor'
              ? 'Tutor'
              : data?.data?.user?.account_type
          )
        );

        // Redirect user to the originally intended path after login
        if (redirect) {
          router.push(redirect); // Redirect to original path
        } else {
          dispatch(setUser(data?.data?.user));
          // If no redirect path, use account type-based redirection
          if (data?.data?.user?.account_type === 'Parent') {
            router.push('/parent');
          } else if (data?.data?.user?.account_type === 'Student') {
            router.push('/student');
          } else if (data?.data?.user?.account_type === 'Instructor') {
            router.push('/tutor');
          } else {
            router.push('/');
          }
        }
      }
    }

    if (isError) {
      toast({
        //@ts-ignore
        title: error?.data?.error?.message || 'An error occurred',
        description: 'An Error occurred.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isSuccess, isError, error, redirect]);

  return {
    loginAccount,
    isLoading,
  };
};

export default useLoginHook;
