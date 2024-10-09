import { Box, HStack, Stack } from '@chakra-ui/react';
import React from 'react';

const ProgressBar = ({
  firstPercentage,
  secondPercentage,
}: {
  firstPercentage: string;
  secondPercentage: string;
}) => {
  return (
    <HStack
      w={'100%'}
      borderRadius={10}
      height={15}
      bg={'ButtonShadow'}
      overflow={'hidden'}
      gap={0}
    >
      <Stack w={secondPercentage} bg={'#0065FF'} h={'100%'}>
        <Stack w={firstPercentage} bg={'#FFC727'} h={'100%'} />
      </Stack>
    </HStack>
  );
};

export default ProgressBar;
