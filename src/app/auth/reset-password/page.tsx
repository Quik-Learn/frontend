import type { Metadata } from 'next';
import Forgot from '~/lib/pages/auth/forgot';
import Login from '~/lib/pages/auth/login';
import Reset from '~/lib/pages/auth/reset';

export const metadata: Metadata = {
  title: 'Reset Password',
};

export default Reset;
