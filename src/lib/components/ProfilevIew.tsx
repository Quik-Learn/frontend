import { HStack, VStack, Text, Select, Stack } from '@chakra-ui/react';
import React from 'react';
import BarChartsComponent from './BarChart';

const ProfilevIew = () => {
  const empty = false;
  return (
    <VStack bg={'#fff'} w={'100%'}>
      <HStack
        paddingX={'16px'}
        w={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        borderBottomWidth={'1px'}
        borderColor={'#E9EAF0'}
      >
        <Text color={'#1D2026'} fontSize={16} fontWeight={500}>
          Profile View
        </Text>
        <Select
          w={'100px'}
          placeholder="Today"
          color="#6E7485"
          _placeholder={{
            color: '#6E7485',
            fontWeight: '400',
            fontSize: 10,
          }}
        >
          <option>Today</option>
        </Select>
      </HStack>
      <Stack w={'100%'} h={254}>
        <BarChartsComponent />
      </Stack>

      <Stack>
        <Text
          color={'#1D2026'}
          fontSize={20}
          textAlign={'left'}
          alignSelf={'flex-start'}
        >
          0
        </Text>
        <Text color={'#6E7485'} fontSize={14}>
          A total of 0 users have viewed your profile
        </Text>
      </Stack>
    </VStack>
  );
};

export default ProfilevIew;
