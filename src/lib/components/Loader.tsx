import { Stack } from '@chakra-ui/react';
import { BallTriangle } from 'react-loader-spinner';
import React from 'react';

const Loader = () => {
  return (
    <Stack justifyContent={'center'} alignItems={'center'} w={'100%'}>
      <BallTriangle
        height={200}
        width={200}
        radius={5}
        color="#02659C"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Stack>
  );
};

export default Loader;
