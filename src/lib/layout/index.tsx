'use client';
<<<<<<< HEAD

import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';
=======
import '../styles';
import { Box } from '@chakra-ui/react';
import { useEffect, useState, type ReactNode } from 'react';
import { useAppSelector } from '../store';
>>>>>>> ui-work

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
<<<<<<< HEAD
    <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out">
      <Box margin="8">
        {/* <Header /> */}
        <Box as="main" marginY={22}>
=======
    <Box
      margin="0 auto"
      maxWidth={'100vw'}
      transition="0.5s ease-out"
      bg={'#fff'}
    >
      <Box margin="8">
        {/* <Header /> */}
        <Box as="main" marginY={22} maxW={'100vw'}>
>>>>>>> ui-work
          {children}
        </Box>
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};

export default Layout;
