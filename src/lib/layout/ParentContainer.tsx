import { Box, SimpleGrid, VStack, Text, Button, Flex } from '@chakra-ui/react';

import TopNav from '~/lib/layout/TopNav';
import ParentNav from './ParentNav';

const ParentContainer = ({ children }: any) => {
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
