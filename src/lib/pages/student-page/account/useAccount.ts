'use client';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { useUpdateUserProfileMutation } from '~/lib/services/parent-mutation';
import { useToast } from '@chakra-ui/react';
import {
  useLazyGetAuthUserQuery,
  useReceieveConnectionMutation,
} from '~/lib/services/student-mutation';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '~/lib/store';
import {
  clearRedirect,
  redirectState,
  setRedirect,
} from '~/lib/store/reducers/redirect-slice';
import {
  useLazyGetConnectionQuery,
  userService,
} from '~/lib/services/user-service';
import { setUser } from '~/lib/store/reducers/user-slice';

const useAccount = (callbackRecieve: any, onOpen: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const redirect = useAppSelector(redirectState);
  const searchParams = useSearchParams();

  const [incomingData, setIncomingData] = useState();
  const action = searchParams.get('action');
  const token = searchParams.get('token');
  const authenticated = searchParams.get('authenticated');
  const [trigger, { data, isLoading, isSuccess }] = useLazyGetAuthUserQuery();
  const [getConnection, getConnectionData] = useLazyGetConnectionQuery();
  const [updateUserProfile, responseData] = useUpdateUserProfileMutation();
  const [receieveConnection, receieveConnectionData] =
    useReceieveConnectionMutation();
  const {
    isSuccess: isReqSuccess,
    isError: isReqError,
    error: reqError,
    data: reqData,
  } = getConnectionData;
  const toast = useToast();
  const signInSchema = yup.object().shape({
    firstname: yup.string().required('Please enter your firstname'),
    lastname: yup.string().required('Please enter your last name'),
    phone: yup.string().required('Please enter your phone number'),
    email: yup.string().required('Please enter your email'),
    province: yup.string(),
    address: yup.string(),
    profile_image: yup.string(),
  });

  const [initialValues, setInitialData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    province: '',
    address: '',
    parentName: '',
    profile_image: '',
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
        profile_image: data?.data?.user?.profile_image || '',
        parentName:
          `${data?.data?.bio?.parent?.firstname || ''} ${data?.data?.bio?.parent?.lastname || ''}` ||
          '',
      });
      dispatch(setUser(data?.data?.user));
    }
  }, [data, isSuccess]);
  useEffect(() => {
    if (isReqSuccess) {
      onOpen();
      setIncomingData(reqData?.data);
      setTimeout(() => {
        dispatch(userService.util.resetApiState());
      }, 5000);
    }
    if (isReqError && !authenticated) {
      console.log(reqError, 'here');
      toast({
        //@ts-ignore
        description: reqError?.data?.detail || 'An error occured',
        title: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      if (reqError?.data?.detail?.toLowerCase().includes('permission')) {
        dispatch(
          setRedirect(
            `/student/account?action=${action}&token=${token}&authenticated=true`
          )
        );
        router.push('/');
      }

      dispatch(userService.util.resetApiState());
    }
  }, [isReqSuccess, isReqError, reqError, reqData]);
  useEffect(() => {
    if (receieveConnectionData.isSuccess) {
      trigger({});
      callbackRecieve();
      dispatch(clearRedirect());
      router.push('/student/account');
    }
    if (receieveConnectionData?.isError) {
      toast({
        description:
          //@ts-ignore
          receieveConnectionData?.error?.data?.detail || 'An error occured',
        title: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [receieveConnectionData]);
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
  console.log(redirect);
  console.log(action, token, authenticated);
  useEffect(() => {
    if (action === 'connectionRequest') {
      console.log('land');
      getConnection(token);
    }
  }, [action, token]);
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
    connectionData: incomingData,
  };
};

export default useAccount;
