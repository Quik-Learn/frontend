import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useLoginAccountMutation } from '~/lib/services/auth-service';
import { useAppDispatch } from '~/lib/store';
import { setToken } from '~/lib/store/reducers/token-slice';

const useLoginHook = () => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginAccount, { data, isSuccess, isError, error, isLoading }] =
    useLoginAccountMutation();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      dispatch(setToken(data?.data?.auth_token));
      if (data?.data?.user?.account_type === 'Parent') {
        router.push('/parent');
      } else {
        router.push('/student');
      }
    }
    if (isError) {
      toast({
        //@ts-ignore
        title: error?.error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isSuccess, isError, error]);
  return {
    loginAccount,
    isLoading,
  };
};

export default useLoginHook;
