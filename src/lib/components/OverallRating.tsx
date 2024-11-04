import { HStack, VStack, Text, Select, Stack } from '@chakra-ui/react';
import React from 'react';
import Rating from './Rating';
import AreaChartsComponent from './AreaCharts';
import ProgressBar from './ui/progress-bar';

const OverallRating = () => {
  // const data = [
  //   { id: 1, rating: 5, count: '56%' },
  //   { id: 2, rating: 4, count: '37%' },
  //   { id: 3, rating: 3, count: '8%' },
  //   { id: 4, rating: 2, count: '1%' },
  //   { id: 5, rating: 1, count: '0.023%' },
  // ];
  const data = [
    { id: 1, rating: 5, count: '0%' },
    { id: 2, rating: 4, count: '0%' },
    { id: 3, rating: 3, count: '0%' },
    { id: 4, rating: 2, count: '0%' },
    { id: 5, rating: 1, count: '0%' },
  ];
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
          Overall Rating
        </Text>
        <Select
          w={'150px'}
          placeholder="This week"
          color="#6E7485"
          _placeholder={{
            color: '#6E7485',
            fontWeight: '400',
            fontSize: 12,
          }}
        >
          <option>This week</option>
        </Select>
      </HStack>
      <HStack
        w={'100%'}
        h={'180px'}
        alignItems={'flex-end'}
        justifyContent={'space-between'}
      >
        <Stack
          width={'50%'}
          h={'100%'}
          bg={'#FFF2E5'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text color={'#1D2026'} fontSize={40} fontWeight={600}>
            0
          </Text>
          <Rating rate={4.5} color="#FD8E1F" />
          <Text fontWeight={500} color={'#1D2026'} fontSize={14}>
            Overall Rating
          </Text>
        </Stack>
        <Stack
          w={'100%'}
          h={'100%'}
          alignItems={'flex-end'}
          justifyContent={'flex-end'}
        >
          <AreaChartsComponent />
        </Stack>
      </HStack>
      <Stack w={'100%'} mt={5}>
        {data?.map((item) => (
          <HStack w={'100%'} flex={1}>
            <Rating rate={item.rating} color="#FD8E1F" />
            <Stack flex={1}>
              <ProgressBar
                firstPercentage={item.count}
                secondPercentage="100%"
                bg2="#FD8E1F"
                bg1="#E9EAF0"
              />
            </Stack>
            <Text color={'#1D2026'} fontWeight={500} fontSize={14}>
              {item.count}
            </Text>
          </HStack>
        ))}
      </Stack>
    </VStack>
  );
};

export default OverallRating;
