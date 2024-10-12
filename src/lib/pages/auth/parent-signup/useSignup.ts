import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useRegisterAccountMutation } from '~/lib/services/auth-service';

const useSignup = () => {
  const toast = useToast();
  const router = useRouter();
  const [
    registerAccount,
    { isSuccess, data, isLoading, isError, error, reset },
  ] = useRegisterAccountMutation();

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
      router.push('/auth/success');
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
    }
  }, [isSuccess, isError, error]);

  return { registerAccount, isLoading };
};

export default useSignup;
