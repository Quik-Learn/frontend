import { Box, SimpleGrid, VStack, Text, Button, Flex } from '@chakra-ui/react';

import TopNav from '~/lib/layout/TopNav';
import ParentNav from './ParentNav';
import { tokenState } from '../store/reducers/token-slice';
import { useAppDispatch, useAppSelector } from '../store';
import { typeState } from '../store/reducers/type-slice';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clearRedirect, setRedirect } from '../store/reducers/redirect-slice';
import TutorNav from './TutorNav';
import TopNavTutor from './TopNavTutor';

const TutorContainer = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(tokenState);
  const router = useRouter();
  // useEffect(() => {
  //   if (token?.length === 0) {
  //     router.replace('/');
  //   }
  // }, [token, router]);
  // useEffect(() => {
  //   dispatch(clearRedirect());
  // }, []);

  return (
    <Flex
      minH={'100vh'}
      maxW={'100vw'}
      width={'100vw'}
      maxH={'100vh'}
      height={'100vh'}
      bg={'#FFFFFF'}
      overflowX={'hidden'}
      overflowY={'scroll'}
    >
      <TopNavTutor />
      <TutorNav />
      <Box flex="1" ml={261} mt={98} overflowX={'hidden'}>
        {children}
      </Box>
    </Flex>
  );
};

export default TutorContainer;
