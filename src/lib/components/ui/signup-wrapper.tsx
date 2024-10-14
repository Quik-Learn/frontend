'use client';

<<<<<<< HEAD
import { HStack, VStack, Image, IconButton } from '@chakra-ui/react';
=======
import { HStack, VStack, Image, IconButton, Stack } from '@chakra-ui/react';
>>>>>>> ui-work
import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

const SignupWrapper = ({
  img,
  children,
<<<<<<< HEAD
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
=======
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
        zIndex={80}
        alignSelf="flex-start"
        onClick={() => router.back()}
      />
      <Stack width={{ base: '100%', md: '50%', lg: '50x' }}>{children}</Stack>
    </Stack>
>>>>>>> ui-work
  );
};

export default SignupWrapper;
