import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import useDashboardHook from '../parent/useDashboard';
import { useUpdateUserProfileMutation } from '~/lib/services/parent-mutation';
import { useToast } from '@chakra-ui/react';

const useAccount = () => {
  const { data, isLoading, trigger } = useDashboardHook();
  const [updateUserProfile, responseData] = useUpdateUserProfileMutation();
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
  });

  useEffect(() => {
    if (data) {
      setInitialData({
        firstname: data.firstname || '',
        lastname: data.lastname || '',
        phone: data.phone || '',
        email: data.email || '',
        province: data?.province || '',
        address: data?.address || '',
      });
    }
  }, [data]);

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
  };
};

export default useAccount;
