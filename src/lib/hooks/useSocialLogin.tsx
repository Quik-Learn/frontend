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
import { useAppDispatch } from '../store';
import { useToast } from '@chakra-ui/react';
// import { useSetTypeFromSocialMutation } from '../services/auth-service';

const useSocialLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toast = useToast();
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
    } else if (role?.toLowerCase() === 'parent') {
      router.push('/parent');
    } else if (role?.toLowerCase() === 'tutor') {
      router.push('/dashboard/tutor');
    } else {
      router.push('/unauthorized');
    }
  };
  const redirectToDashboardOnLogin = (role: string) => {
    console.log(role);
    if (role?.toLowerCase() === 'student') {
      router.push('/student');
    } else if (role?.toLowerCase() === 'parent') {
      router.push('/parent');
    } else if (role?.toLowerCase() === 'tutor') {
      router.push('/tutor');
    } else {
      router.push('/unauthorized');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setType(socialData?.data?.user?.account_type));
      redirectToDashboard(socialData?.data?.user?.account_type);
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
  useEffect(() => {
    if (isUserSuccess) {
      console.log(userData?.data?.account_type);
      dispatch(setType(userData?.data?.account_type));
      redirectToDashboardOnLogin(userData?.data?.account_type);

      setTimeout(() => {
        // handleInvalidateAndRefetch();
        dispatch(userService.util.resetApiState());
      }, 1000);
    }
    if (isUserError) {
      toast({
        //@ts-ignore
        title: userError?.error?.message || 'An error occured',
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
  }, [isUserError, isUserSuccess, userError, userData]);

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
