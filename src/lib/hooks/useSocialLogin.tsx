import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup, getIdToken } from 'firebase/auth';
import {
  authProvider,
  googleProvider,
  facebookProvider,
} from '../../../firebase'; // Import Firebase auth and providers
import { useLazyGetUserQuery } from '../services/user-service';

const useSocialLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [trigger, { data, isLoading }] = useLazyGetUserQuery();

  // Middleware to redirect based on user role
  const redirectToDashboard = (role: string) => {
    if (role === 'student') {
      router.push('/student');
    } else if (role === 'parent') {
      router.push('/parent');
    } else if (role === 'tutor') {
      router.push('/dashboard/tutor');
    } else {
      router.push('/unauthorized'); // Handle unknown roles
    }
  };

  // This is a sample function that determines the user's role
  // You should customize this based on your actual backend or user data
  const getUserRole = async (userId: string) => {
    // Fetch the user's role from your backend or Firebase Firestore
    // For now, return a dummy role
    trigger(userId);
    const role = 'student'; // Replace with actual role fetching logic
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
