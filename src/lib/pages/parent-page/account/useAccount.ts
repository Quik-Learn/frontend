import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import useDashboardHook from '../parent/useDashboard';
import { useUpdateUserProfileMutation } from '~/lib/services/parent-mutation';
import { useToast } from '@chakra-ui/react';
import { useLazyGetUserQuery } from '~/lib/services/user-service';
import { useAppDispatch } from '~/lib/store';
import { setUser } from '~/lib/store/reducers/user-slice';

const useAccount = () => {
  const dispatch = useAppDispatch();
  const [trigger, { data, isLoading, isSuccess }] = useLazyGetUserQuery();
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
    bio: '',
  });
  useEffect(() => {
    trigger({});
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setInitialData({
        firstname: data?.data?.firstname || '',
        lastname: data?.data?.lastname || '',
        phone: data?.data?.phone || '',
        email: data?.data?.email || '',
        province: data?.data?.province || '',
        address: data?.data?.address || '',
        bio: data?.data?.bio || '',
      });
      dispatch(setUser(data?.data?.user));
    }
  }, [data, isSuccess]);

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
        title: responseData.error?.data?.error?.message || 'An error occured',
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
