/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

'use client';
import { onAuthStateChanged } from 'firebase/auth';

import { useEffect } from 'react';
import { Text } from '@chakra-ui/react';

const Dashboard = () => {
  useEffect(() => {
    const sign = async () => {};
    sign();
  }, []);

  return (
    <div>
      <Text>Welcome</Text>
    </div>
  );
};

export default Dashboard;
