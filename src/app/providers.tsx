'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { Provider } from 'react-redux';

import { Chakra as ChakraProvider } from '~/lib/components/Chakra';
import SuccessModal from '~/lib/components/ui/success-modal';
import { store } from '~/lib/store';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </Provider>
  );
};

export default Providers;
