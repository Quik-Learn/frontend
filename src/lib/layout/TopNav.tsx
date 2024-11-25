'use client';

import {
  HStack,
  Text,
  IconButton,
  Avatar,
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  Icon,
  FormControl,
  calc,
} from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';
import { CiSearch } from 'react-icons/ci';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useDashboardHook from '../pages/parent-page/parent/useDashboard';

const TopNav = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { data, isLoading } = useDashboardHook();
  return (
    <HStack
      justify="space-between"
      h={98}
      p="4"
      bg="white"
      boxShadow="sm"
      gap={17}
      left={261}
      width={`calc(100vw - 261px)`}
      position={'fixed'}
      zIndex={100}
    >
      <FormControl borderRadius={70} flex={1}>
        <InputGroup
          color="#1D2026"
          _placeholder={{ color: '#8C94A3' }}
          bg="#F9F9F9"
          borderRadius={700}
          borderWidth={1}
          borderColor="#F1F1F3"
        >
          <InputLeftElement width="3.5rem">
            <Icon as={CiSearch} />
          </InputLeftElement>
          <Input
            placeholder={'Search'}
            value={search}
            fontSize={14}
            borderRadius={700}
            pl={12}
            _active={{
              border: 'none',
              outlineColor: 'transparent',
              outline: 0,
            }}
            _focus={{
              border: 'none',
              outlineColor: 'transparent',
              outline: 0,
            }}
            onChange={(e) => setSearch(e.target.value)}
            border="none"
          />
        </InputGroup>
      </FormControl>

      <IconButton
        icon={<FiBell color="black" size={23} />}
        aria-label="Notifications"
        onClick={() => router.push('/notifications')}
      />

      <HStack>
        <Avatar
          bg={'#0065FF'}
          color={'#fff'}
          size="sm"
          name={`${data?.firstname} ${data?.lastname}`}
        />
        <Box>
          <Text color={'#5F5F5F'} fontSize={14}>
            {data?.firstname} {data?.lastname}
          </Text>
          <Text fontSize={14} color="#5F5F5F" fontWeight={700}>
            {data?.account_type}
          </Text>
        </Box>
      </HStack>
    </HStack>
  );
};

export default TopNav;
