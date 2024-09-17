/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { VStack, Image, Text } from '@chakra-ui/react';
import { usePathname, useSearchParams } from 'next/navigation';

import SignupWrapper from '~/lib/components/ui/signup-wrapper';

const Success = () => {
  const searchParams = useSearchParams();

  const type = searchParams.get('type');
  return (
    <SignupWrapper
      img={
        type === 'student'
          ? '/images/big-student.png'
          : '/images/big-parent.png'
      }
      bg={type === 'student' ? '#0A52A8' : '#FF8C00'}
    >
      <VStack
        padding={{ base: 5, md: 8, lg: 10 }}
        maxHeight="100vh"
        overflowY="auto"
        justify="center"
        align="center"
        gap={10}
      >
        <Text
          color="#59595A"
          fontSize={{ base: 20, lg: 24 }}
          textAlign="center"
          mt={20}
        >
          We have sent you a link, visit your email and click on the link to
          verify you account!
        </Text>
        <Image src="/images/success.svg" alt="success" w="600px" h="500px" />
      </VStack>
    </SignupWrapper>
  );
};

export default Success;
