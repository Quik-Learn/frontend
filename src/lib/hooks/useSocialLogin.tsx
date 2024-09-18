import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup, getIdToken } from 'firebase/auth';
import {
  authProvider,
  googleProvider,
  facebookProvider,
} from '../../../firebase'; // Import Firebase auth and providers
import { useLazyGetUserQuery } from '../services/user-service';
import useDashboardHook from '../pages/parent/useDashboard';
import { useSetTypeFromSocialMutation } from '../services/auth-service';

const useSocialLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data, isLoading } = useDashboardHook();
  // const [setTypeFromSocial, { data: socialData, isLoading: isSocialLoading }] =
  //   useSetTypeFromSocialMutation();

  const redirectToDashboard = (role: string) => {
    if (role === 'student') {
      router.push('/student');
    } else if (role === 'parent') {
      router.push('/parent');
    } else if (role === 'tutor') {
      router.push('/dashboard/tutor');
    } else {
      router.push('/unauthorized');
    }
  };

  const getUserRole = async (userId: string) => {
    const role = 'student';
    return role;
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setLoading(true);
    try {
      let providerInstance: any = null;
      if (provider === 'google') {
        providerInstance = googleProvider;
      } else if (provider === 'facebook') {
        providerInstance = facebookProvider;
      }

      // Sign in with the selected provider
      const result = await signInWithPopup(authProvider, providerInstance);
      const user = result.user;

      // Get the Firebase ID token
      const token = await getIdToken(user);

      // Assuming you fetch user role from your backend or Firestore
      const role = await getUserRole(user.uid);

      // Save token and role (You can store in context, localStorage, or manage it your way)
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect to the appropriate dashboard
      redirectToDashboard(role);
    } catch (error) {
      console.error('Error during social login:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSocialLogin,
    loading,
  };
};

export default useSocialLogin;
