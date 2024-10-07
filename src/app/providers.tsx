'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { redirect } from 'next/navigation';
import { Chakra as ChakraProvider } from '~/lib/components/Chakra';
import SuccessModal from '~/lib/components/ui/success-modal';
import { store, useAppSelector } from '~/lib/store';
import { tokenState } from '~/lib/store/reducers/token-slice';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <Provider store={store}>
        <ChakraProvider>{children}</ChakraProvider>
      </Provider>
    )
  );
};

export default Providers;
