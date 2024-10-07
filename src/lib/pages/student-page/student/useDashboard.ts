import React, { useEffect, useState } from 'react';
import {
  useLazyGetAuthUserQuery,
  useLazyGetStudentDashboardQuery,
} from '~/lib/services/student-mutation';
import { useAppDispatch } from '~/lib/store';
import { setType } from '~/lib/store/reducers/type-slice';

const useDashboardHook = () => {
  const dispatch = useAppDispatch();
  const [profileData, setProfileData] = useState<any>();
  const [trigger, { data, isLoading, isSuccess }] = useLazyGetAuthUserQuery();
  const [triggerDashboard, dashboardData] = useLazyGetStudentDashboardQuery();
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
    isLoading: isLoading || dashboardData?.isLoading,
    trigger,
    dashboardData: dashboardData?.data?.data,
  };
};

export default useDashboardHook;
