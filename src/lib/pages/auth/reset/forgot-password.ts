import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import {
  useForgotPasswordMutation,
  useVerifyPasswordMutation,
} from '~/lib/services/auth-service';

const useForgotPassword = (callback1: any, callback2: any) => {
  const toast = useToast();
  const [forgotPassword, { data, isLoading, isSuccess, isError, error }] =
    useForgotPasswordMutation();

  const [
    verifyPassword,
    {
      data: verifyData,
      isLoading: verifyLoading,
      isSuccess: verifySuccess,
      isError: isVerifyError,
      error: verifyError,
    },
  ] = useVerifyPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      callback1();
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
  useEffect(() => {
    if (verifySuccess) {
      callback2();
    }
    if (isVerifyError) {
      toast({
        //@ts-ignore
        title: verifyerror?.data?.error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isVerifyError, verifySuccess, verifyError]);

  return { forgotPassword, verifyPassword, isLoading, verifyLoading };
};

export default useForgotPassword;
