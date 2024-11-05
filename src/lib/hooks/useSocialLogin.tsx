import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup, getIdToken } from 'firebase/auth';
import {
  authProvider,
  googleProvider,
  facebookProvider,
  appleProvider,
} from '../../../firebase'; // Import Firebase auth and providers
import { useLazyGetUserQuery, userService } from '../services/user-service';
import useDashboardHook from '../pages/parent-page/parent/useDashboard';
import { useSetTypeFromSocialMutation } from '../services/parent-mutation';
import { setToken } from '../store/reducers/token-slice';
import { setType } from '../store/reducers/type-slice';
import { useAppDispatch, useAppSelector } from '../store';
import { useToast } from '@chakra-ui/react';
import { redirectState } from '../store/reducers/redirect-slice';
// import { useSetTypeFromSocialMutation } from '../services/auth-service';

const useSocialLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [userRole, setUserRole] = useState();
  const redirect = useAppSelector(redirectState);
  const [
    setTypeFromSocial,
    { data: socialData, isLoading: isSocialLoading, isSuccess, isError, error },
  ] = useSetTypeFromSocialMutation();
  const [
    getUser,
    {
      data: userData,
      isLoading: isUserLoading,
      isSuccess: isUserSuccess,
      isError: isUserError,
      error: userError,
    },
  ] = useLazyGetUserQuery();

  const redirectToDashboard = (role: string) => {
    if (role?.toLowerCase() === 'student') {
      router.push('/auth/subject');
      document.cookie = `accountType=student; path=/;`;
    } else if (role?.toLowerCase() === 'parent') {
      router.push('/parent');
      document.cookie = `accountType=parent; path=/;`;
    } else if (role?.toLowerCase() === 'tutor') {
      router.push('/dashboard/tutor');
      document.cookie = `accountType=tutor; path=/;`;
    } else {
      router.push('/unauthorized');
    }
  };
  const redirectToDashboardOnLogin = (role: string) => {
    console.log(role?.toLowerCase());
    if (role === 'student') {
      router.push('/student');
      document.cookie = `accountType=student; path=/;`;
    } else if (role === 'parent') {
      document.cookie = `accountType=parent; path=/;`;
      router.push('/parent');
    } else if (role === 'tutor') {
      document.cookie = `accountType=tutor; path=/;`;
      router.push('/tutor');
    } else {
      router.push('/unauthorized');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (redirect) {
        router.push(redirect); // Redirect to original path
      } else {
        dispatch(setType(socialData?.data?.user?.account_type));
        redirectToDashboard(socialData?.data?.user?.account_type);
      }
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
  }, [isSuccess, isError, error, redirect]);
  useEffect(() => {
    if (isUserSuccess) {
      console.log(userData?.data?.account_type);
      if (redirect) {
        router.push(redirect); // Redirect to original path
      } else {
        if (userData?.data?.account_type) {
          document.cookie = `accountType=${userData?.data?.account_type?.toLowerCase()}; path=/;`;
          setUserRole(userData?.data?.account_type?.toLowerCase());
          dispatch(setType(userData?.data?.account_type?.toLowerCase()));
        }
      }

      setTimeout(() => {
        // handleInvalidateAndRefetch();
        dispatch(userService.util.resetApiState());
      }, 1000);
    }
    if (isUserError) {
      console.log(userError);
      toast({
        //@ts-ignore
        title: userError?.data?.error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      setTimeout(() => {
        // handleInvalidateAndRefetch();
        dispatch(userService.util.resetApiState());
      }, 1000);
    }
  }, [
    isUserError,
    isUserSuccess,
    userError,
    userData?.data?.account_type,
    redirect,
  ]);
  console.log(userRole);
  useEffect(() => {
    if (userRole) {
      redirectToDashboardOnLogin(userRole);
      dispatch(setType(userRole));
    }
  }, [userRole]);

  const handleSocialLogin = async (
    provider: 'google' | 'facebook',
    role: any
  ) => {
    setLoading(true);
    try {
      let providerInstance: any = null;
      if (provider === 'google') {
        providerInstance = googleProvider;
      } else if (provider === 'facebook') {
        providerInstance = facebookProvider;
      } else if (provider === 'apple') {
        providerInstance = appleProvider;
      }

      // Sign in with the selected provider
      const result: any = await signInWithPopup(authProvider, providerInstance);
      const user = result.user;
      console.log(result);

      dispatch(setToken(result?.user?.accessToken));
      document.cookie = `token=${result?.user?.accessToken}; path=/;`;

      if (result?._tokenResponse?.isNewUser) {
        setTypeFromSocial({ account_type: role });
      } else {
        getUser({});
      }
    } catch (error) {
      console.error('Error during social login:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSocialLogin,
    loading: loading || isSocialLoading,
  };
};

export default useSocialLogin;
