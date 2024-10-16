'use client';
import '../styles';
import { Box } from '@chakra-ui/react';
import { useEffect, useState, type ReactNode } from 'react';
import { useAppSelector } from '../store';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      margin="0 auto"
      maxWidth={'100vw'}
      transition="0.5s ease-out"
      bg={'#fff'}
    >
      <Box margin="8">
        {/* <Header /> */}
        <Box as="main" marginY={22} maxW={'100vw'}>
          {children}
        </Box>
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};

export default Layout;
