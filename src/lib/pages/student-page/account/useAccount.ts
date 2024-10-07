import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { useUpdateUserProfileMutation } from '~/lib/services/parent-mutation';
import { useToast } from '@chakra-ui/react';
import {
  useLazyGetAuthUserQuery,
  useLazyGetConnectionQuery,
  useReceieveConnectionMutation,
} from '~/lib/services/student-mutation';

const useAccount = (callbackRecieve: any, onOpen: any) => {
  const [trigger, { data, isLoading, isSuccess }] = useLazyGetAuthUserQuery();
  const [getConnection, getConnectionData] = useLazyGetConnectionQuery();
  const [updateUserProfile, responseData] = useUpdateUserProfileMutation();
  const [receieveConnection, receieveConnectionData] =
    useReceieveConnectionMutation();
  const toast = useToast();
  const signInSchema = yup.object().shape({
    firstname: yup.string().required('Please enter your firstname'),
    lastname: yup.string().required('Please enter your last name'),
    phone: yup.string().required('Please enter your phone number'),
    email: yup.string().required('Please enter your email'),
    province: yup.string(),
    address: yup.string(),
  });

  const [initialValues, setInitialData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    province: '',
    address: '',
    parentName: '',
  });
  useEffect(() => {
    trigger({});
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setInitialData({
        firstname: data?.data?.user?.firstname || '',
        lastname: data?.data?.user?.lastname || '',
        phone: data?.data?.user?.phone || '',
        email: data?.data?.user?.email || '',
        province: data?.data?.user?.state || '',
        address: data?.data?.user?.address || '',
        parentName: data?.data?.bio?.parent || '',
      });
    }
  }, [data, isSuccess]);
  useEffect(() => {
    const { isSuccess, isError, error } = receieveConnectionData;
    if (isSuccess) {
      trigger({});
      callbackRecieve();
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
  }, [receieveConnectionData]);
  useEffect(() => {
    if (getConnectionData.isSuccess) {
      onOpen();
    }
  }, [getConnectionData.isSuccess]);
  useEffect(() => {
    if (responseData.isSuccess) {
      toast({
        //@ts-ignore
        description:
          responseData.data?.message ||
          'Your account information has been updated successfully',
        title: 'Success!',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      trigger({});
    }
    if (responseData.isError) {
      toast({
        //@ts-ignore
        title: responseData.error?.error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [responseData]);

  return {
    initialValues,
    signInSchema,
    updateUserProfile,
    isLoading,
    buttonLoading: responseData?.isLoading,
    receieveConnection,
    recieveLoading: receieveConnectionData?.isLoading,
    getConnection,
    isConnectionLoading: getConnectionData?.isLoading,
    connectionData: getConnectionData?.data?.data,
  };
};

export default useAccount;
