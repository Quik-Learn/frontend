import { Box, SimpleGrid, VStack, Text, Button, Flex } from '@chakra-ui/react';

import TopNav from '~/lib/layout/TopNav';
import ParentNav from './ParentNav';
import { tokenState } from '../store/reducers/token-slice';
import { useAppSelector } from '../store';
import { typeState } from '../store/reducers/type-slice';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ParentContainer = ({ children }: any) => {
  const token = useAppSelector(tokenState);
  const router = useRouter();
  useEffect(() => {
    if (token?.length === 0) {
      router.replace('/');
    }
  }, [token, router]);

  return (
    <Flex minH={'100vh'} maxH={'100vh'} bg={'#fafafa'} overflowY={'scroll'}>
      <TopNav />
      <ParentNav />
      <Box flex="1" ml={261} mt={98}>
        {children}
      </Box>
    </Flex>
  );
};

export default ParentContainer;
