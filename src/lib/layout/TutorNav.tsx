'use client';

import {
  Image,
  VStack,
  Link as ChakraLink,
  HStack,
  Text,
  Icon,
  Box,
  Stack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { parentNav, studentNav, tutorNav } from '../utils/nav';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../store';
import { clearType, typeState } from '../store/reducers/type-slice';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { clearToken } from '../store/reducers/token-slice';
import { clearUser } from '../store/reducers/user-slice';

const TutorNav = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [nav, setNav] = useState<any[]>([]);
  const type = useAppSelector(typeState);
  const path =
    pathname.split('/').length > 2 ? pathname.split('/')[2] : 'dashboard';
  // const type = pathname.split('/')[1] || 'parent';
  console.log(pathname, path);
  // useEffect(() => {
  //   if (type?.toLowerCase() === 'tutor') {
  //     setNav(tutorNav);
  //   } else {
  //     setNav(parentNav);
  //   }
  // }, [type]);
  console.log(type, 'typetype');

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(clearType());
    dispatch(clearUser());
    router.push('/');
  };
  return (
    <VStack
      bg="#0A52A8"
      padding={{ base: 5, md: 8, lg: 10 }}
      width={{ lg: 261 }}
      position={'fixed'}
      height={'100vh'}
      display={{ base: 'none', md: 'flex' }}
    >
      {!tutorNav.length ? (
        <Box
          padding="6"
          boxShadow="lg"
          bg="white"
          h={'100vh'}
          width={{ lg: 261 }}
        >
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      ) : (
        <>
          <Stack p={3} backgroundColor={'#fff'} borderRadius={10}>
            <Image src="/images/tutor-logo.png" alt="logo" />
          </Stack>
          <VStack mt={30} p={5}>
            {tutorNav?.map((item) => (
              <Link href={item.route} key={item.id} passHref>
                <ChakraLink
                  display={'flex'}
                  gap={10}
                  padding={4}
                  width={{ lg: 255 }}
                  borderRadius={8}
                  fontWeight={700}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                  _activeLink={{
                    borderLeftWidth: 3,

                    backgroundColor: '#FBA333',

                    color: '#fff',
                  }}
                  _hover={{
                    borderLeftWidth: 3,
                    backgroundColor: '#FBA333',
                    color: '#fff',
                  }}
                  borderColor={path === item.value ? '#FBA333' : 'transparent'}
                  backgroundColor={
                    path === item.value ? '#FBA333' : 'transparent'
                  }
                  color={'#FFFFFF'}
                  borderLeftWidth={path === item.value ? '3px' : '0px'}
                >
                  <Image
                    src={path === item.value ? item.active : item.icon}
                    w={6}
                    h={6}
                    alt="icon"
                  />

                  <Text>{item.name}</Text>
                </ChakraLink>
              </Link>
            ))}
          </VStack>

          <HStack
            color={'#FFFFFF'}
            display={'flex'}
            gap={10}
            mb={100}
            padding={4}
            fontWeight={700}
            width={{ lg: 261 }}
            justifyContent={'flex-start'}
            alignItems={'center'}
            _hover={{
              borderLeftWidth: 3,
              borderColor: '#FF4141',
              color: '#FF4141',
            }}
            onClick={handleLogout}
          >
            <Image src="/images/log-out-white.svg" w={6} h={6} alt="icon" />

            <Text>Logout</Text>
          </HStack>
        </>
      )}
    </VStack>
  );
};

export default TutorNav;
