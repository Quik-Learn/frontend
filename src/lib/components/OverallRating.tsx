import { HStack, VStack, Text, Select, Stack } from '@chakra-ui/react';
import React from 'react';
import Rating from './Rating';
import AreaChartsComponent from './AreaCharts';

const OverallRating = () => {
  return (
    <VStack bg={'#fff'} w={'536px'}>
      <HStack
        paddingX={'16px'}
        w={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        borderBottomWidth={'1px'}
        borderColor={'#E9EAF0'}
      >
        <Text color={'#1D2026'} fontSize={16} fontWeight={500}>
          Overall Rating
        </Text>
        <Select
          w={'100px'}
          placeholder="This week"
          _placeholder={{
            color: '#6E7485',
            fontWeight: '400',
            fontSize: 12,
          }}
        >
          <option>This week</option>
        </Select>
      </HStack>
      <HStack w={'100%'}>
        <Stack
          width={'180px'}
          h={'180px'}
          bg={'#FFF2E5'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text color={'#1D2026'} fontSize={40} fontWeight={600}>
            4.6
          </Text>
          <Rating rate={4.5} />
          <Text fontWeight={500} color={'#1D2026'} fontSize={14}>
            Overall Rating
          </Text>
        </Stack>
        <Stack w={'292px'} h={'180px'}>
          <AreaChartsComponent />
        </Stack>
      </HStack>
    </VStack>
  );
};

export default OverallRating;
