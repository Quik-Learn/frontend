import { useFocusEffect } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useLazyGetUserQuery } from '~/lib/services/user-service';

const useDashboardHook = () => {
  const [trigger, { data, isLoading }] = useLazyGetUserQuery();

  useEffect(() => {
    trigger({});
  }, []);
  return { data: data?.data, isLoading };
};

export default useDashboardHook;
