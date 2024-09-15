import {
  Image,
  VStack,
  Link as ChakraLink,
  HStack,
  Text,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { parentNav } from '../utils/nav';
import Link from 'next/link';

const ParentNav = () => {
  return (
    <VStack bg="#fff" padding={{ base: 5, md: 8, lg: 10 }} width={{ lg: 261 }}>
      <Image src="./images/logo.svg" alt="logo" />

      <VStack mt={30} p={5}>
        {parentNav?.map((item) => (
          <Link href={item.route} key={item.id}>
            <ChakraLink
              color={'#5F5F5F'}
              display={'flex'}
              gap={10}
              bg={'white'}
              padding={4}
              width={{ lg: 255 }}
              justifyContent={'flex-start'}
              alignItems={'center'}
              _activeLink={{
                borderLeftWidth: 3,
                borderColor: '#0A52A8',

                color: '#0A52A8',
              }}
              _hover={{
                borderLeftWidth: 3,
                borderColor: '#0A52A8',
                color: '#0A52A8',
              }}
            >
              <Image src={item.icon} w={6} h={6} alt="icon" />

              <Text>{item.name}</Text>
            </ChakraLink>
          </Link>
        ))}
      </VStack>

      <HStack
        color={'#FF4141'}
        display={'flex'}
        gap={10}
        mt={50}
        marginLeft={20}
        bg={'white'}
        padding={4}
        width={{ lg: 305 }}
        justifyContent={'flex-start'}
        alignItems={'center'}
        _hover={{
          borderLeftWidth: 3,
          borderColor: '#FF4141',
          color: '#FF4141',
        }}
      >
        <Image src="/images/log-out.svg" w={6} h={6} alt="icon" />

        <Text>Logout</Text>
      </HStack>
    </VStack>
  );
};

export default ParentNav;
