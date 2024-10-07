import { useFocusEffect } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLazyGetParentDashboardQuery } from '~/lib/services/parent-mutation';
import { useLazyGetUserQuery } from '~/lib/services/user-service';
import { setType } from '~/lib/store/reducers/type-slice';

const useDashboardHook = () => {
  const [trigger, { data, isLoading }] = useLazyGetUserQuery();
  const [triggerDashboard, dashboardData] = useLazyGetParentDashboardQuery();
  const [profileData, setProfileData] = useState<any>();
  useEffect(() => {
    trigger({});
    triggerDashboard({});
  }, []);

  useEffect(() => {
    if (data?.data) {
      setProfileData(data?.data);
      setType(data?.data?.account_type?.toLowerCase());
    }
  }, [data]);

  return {
    data: profileData,
    isLoading,
    trigger,
    dashboardData: dashboardData?.data?.data,
  };
};

export default useDashboardHook;
