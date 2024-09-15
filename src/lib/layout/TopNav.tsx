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
} from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';
import { CiSearch } from 'react-icons/ci';
import { useState } from 'react';

const TopNav = () => {
  const [search, setSearch] = useState('');
  return (
    <HStack
      justify="space-between"
      h={98}
      p="4"
      bg="white"
      boxShadow="sm"
      gap={17}
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
      />

      <HStack>
        <Avatar bg={'#0065FF'} color={'#fff'} size="sm" name="Julian Doe" />
        <Box>
          <Text color={'#5F5F5F'} fontSize={14}>
            Julian Doe
          </Text>
          <Text fontSize={14} color="#5F5F5F" fontWeight={700}>
            Parent
          </Text>
        </Box>
      </HStack>
    </HStack>
  );
};

export default TopNav;
