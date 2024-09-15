import { Box, SimpleGrid, VStack, Text, Button, Flex } from '@chakra-ui/react';

import TopNav from '~/lib/layout/TopNav';
import ParentNav from './ParentNav';

const ParentContainer = ({ children }: any) => {
  return (
    <Flex minH={'100vh'}>
      <ParentNav />
      <Box flex="1" bg="#f0f0f0">
        <TopNav />
        {children}
      </Box>
    </Flex>
  );
};

export default ParentContainer;
