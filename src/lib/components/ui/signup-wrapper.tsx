'use client';

import { HStack, VStack, Image, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

const SignupWrapper = ({
  img,
  children,
}: {
  img: string;
  children: ReactElement;
}) => {
  const router = useRouter();
  return (
    <HStack minH="100vh" maxH="100vh">
      <VStack
        width={{ md: '40%', lg: '602px' }}
        height="100%"
        minH="100vh"
        justifyContent="space-between"
        p={{ base: 4, md: 20 }}
        display={{ base: 'none', md: 'flex' }}
      >
        <IconButton
          icon={<MdOutlineKeyboardBackspace color="white" />}
          aria-label="icon"
          bg="#1F89DB"
          borderRadius={8}
          width="56px"
          height="56px"
          alignSelf="flex-start"
          onClick={() => router.back()}
        />
        <Image src={img} width={800} height={600} alt="signup" />
      </VStack>

      {children}
    </HStack>
  );
};

export default SignupWrapper;
