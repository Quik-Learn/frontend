import { Box, SimpleGrid, VStack, Text, Button, Flex } from '@chakra-ui/react';

import TopNav from '~/lib/layout/TopNav';
import ParentNav from './ParentNav';
import { tokenState } from '../store/reducers/token-slice';
import { useAppDispatch, useAppSelector } from '../store';
import { typeState } from '../store/reducers/type-slice';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { clearRedirect, setRedirect } from '../store/reducers/redirect-slice';
import { GetServerSideProps } from 'next';
import { requireAuthentication } from '../helpers/auth';

const ParentContainer = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(tokenState);
  const type = useAppSelector(typeState);
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split('/')[1];
  console.log(path, 'path');
  useEffect(() => {
    if (token?.length === 0) {
      router.replace('/');
    }
  }, [token, router]);
  useEffect(() => {
    if (type?.toLowerCase() !== path?.toLowerCase()) {
      router.replace(`/${type?.toLowerCase()}`);
    }
  }, [type, path]);
  useEffect(() => {
    dispatch(clearRedirect());
  }, []);

  return (
    <Flex
      minH={'100vh'}
      maxW={'100vw'}
      width={'100vw'}
      maxH={'100vh'}
      bg={'#fafafa'}
      overflowX={'hidden'}
      overflowY={'scroll'}
    >
      <TopNav />
      <ParentNav />
      <Box flex="1" ml={261} mt={98} overflowX={'hidden'}>
        {children}
      </Box>
    </Flex>
  );
};

export default ParentContainer;
// export const getServerSideProps: GetServerSideProps = requireAuthentication(
//   async (_ctx) => {
//     return {
//       props: {},
//     };
//   }
// );
