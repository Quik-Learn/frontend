'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { Chakra as ChakraProvider } from '~/lib/components/Chakra';
import SuccessModal from '~/lib/components/ui/success-modal';
import { store } from '~/lib/store';

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
