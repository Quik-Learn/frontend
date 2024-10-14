import { Box, HStack, Stack } from '@chakra-ui/react';
import React from 'react';

const ProgressBar = ({
  firstPercentage,
  secondPercentage,
  bg1 = '#0065FF',
  bg2 = '#FFC727',
}: {
  firstPercentage: string;
  secondPercentage: string;
  bg1?: string;
  bg2?: string;
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
      <Stack w={secondPercentage} bg={bg1} h={'100%'}>
        <Stack w={firstPercentage} bg={bg2} h={'100%'} />
      </Stack>
    </HStack>
  );
};

export default ProgressBar;
