import React, { useEffect, useState } from 'react';
import {
  useLazyGetAuthUserQuery,
  useLazyGetStudentDashboardQuery,
} from '~/lib/services/student-mutation';
import { useAppDispatch, useAppSelector } from '~/lib/store';
import { setType } from '~/lib/store/reducers/type-slice';
import { setUser, userState } from '~/lib/store/reducers/user-slice';

const useDashboardHook = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userState);
  const [profileData, setProfileData] = useState<any>();
  const [trigger, { data, isLoading, isSuccess }] = useLazyGetAuthUserQuery();
  const [triggerDashboard, dashboardData] = useLazyGetStudentDashboardQuery();
  useEffect(() => {
    trigger({});
    triggerDashboard({});
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setProfileData(data?.data);
      const accountType = data.data.user?.account_type
        ? data.data.user.account_type.toLowerCase()
        : 'student';
      dispatch(setType(accountType));
      dispatch(setUser(data?.data));
      console.log(data, 'check');
    }
  }, [data, isSuccess]);
  console.log(data, profileData);
  return {
    data: profileData,
    isLoading: isLoading || dashboardData?.isLoading,
    trigger,
    dashboardData: dashboardData?.data?.data,
  };
};

export default useDashboardHook;
