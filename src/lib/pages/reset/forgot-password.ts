import React, { useEffect } from 'react';
import {
  useForgotPasswordMutation,
  useVerifyPasswordMutation,
} from '~/lib/services/auth-service';

const useForgotPassword = (callback1: any, callback2: any) => {
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
    }
  }, []);

  return { forgotPassword, verifyPassword, isLoading, verifyLoading };
};

export default useForgotPassword;
