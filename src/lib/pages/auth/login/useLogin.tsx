import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useLoginAccountMutation } from '~/lib/services/auth-service';
import { useAppDispatch } from '~/lib/store';
import { setToken } from '~/lib/store/reducers/token-slice';
import { setType } from '~/lib/store/reducers/type-slice';

const useLoginHook = () => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [loginAccount, { data, isSuccess, isError, error, isLoading }] =
    useLoginAccountMutation();

  useEffect(() => {
    // Get redirect path from URL query parameter when the login page loads
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    if (redirect) {
      setRedirectPath(redirect); // Store the intended path
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      // Set token in Redux state and cookies
      dispatch(setToken(data?.data?.auth_token));
      dispatch(setType(data?.data?.user?.account_type));

      // Redirect user to the originally intended path after login
      if (redirectPath) {
        router.push(redirectPath); // Redirect to original path
      } else {
        // If no redirect path, use account type-based redirection
        if (data?.data?.user?.account_type === 'Parent') {
          router.push('/parent');
        } else {
          router.push('/student');
        }
      }
    }

    if (isError) {
      toast({
        //@ts-ignore
        title: error?.error?.message || 'An error occurred',
        description: 'An Error occurred.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isSuccess, isError, error, redirectPath]);

  return {
    loginAccount,
    isLoading,
  };
};

export default useLoginHook;
