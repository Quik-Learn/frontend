'use client';

import { HStack, VStack, Image, IconButton, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

const SignupWrapper = ({
  img,
  children,
  bg,
  flexDirection = 'row-reverse',
}: {
  img: string;
  children: ReactElement;
  bg?: string;
  flexDirection?: any;
}) => {
  const router = useRouter();
  return (
    <Stack minH="100vh" maxH="100vh" bg={'white'} flexDir={flexDirection}>
      <VStack
        width={{ base: '100%', md: '50%', lg: '50x' }}
        height="100%"
        minH="100vh"
        bg={bg}
        justifyContent="space-between"
        display={{ base: 'none', md: 'flex' }}
      >
        <Image src={img} width={1000} height={800} alt="signup" />
      </VStack>
      <IconButton
        position={'absolute'}
        top={10}
        left={10}
        icon={<MdOutlineKeyboardBackspace color="white" />}
        aria-label="icon"
        bg="#1F89DB"
        borderRadius={8}
        width="56px"
        height="56px"
        alignSelf="flex-start"
        onClick={() => router.back()}
      />
      <Stack width={{ base: '100%', md: '50%', lg: '50x' }}>{children}</Stack>
    </Stack>
  );
};

export default SignupWrapper;
