import type { Metadata } from 'next';
import Forgot from '~/lib/pages/auth/forgot';
import Login from '~/lib/pages/auth/login';
import Verify from '~/lib/pages/auth/verify';

export const metadata: Metadata = {
  title: 'Verify Email',
};

export default Verify;
