import type { GetServerSideProps, Metadata } from 'next';
import { requireAuthentication } from '~/lib/helpers/auth';
import Dashboard from '~/lib/pages/parent-page/parent';

export const metadata: Metadata = {
  title: 'Parents Dashboard',
};

export default Dashboard;
