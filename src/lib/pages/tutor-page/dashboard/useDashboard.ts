import React, { useEffect, useState } from 'react';
import {
  useLazyGetAuthUserQuery,
  useLazyGetStudentDashboardQuery,
} from '~/lib/services/student-mutation';
import {
  useLazyGetTutorDashboardQuery,
  useLazyGetRatingsQuery,
  useLazyGetActivitiesQuery,
} from '~/lib/services/tutor-mutation';
import { useAppDispatch } from '~/lib/store';
import { setType } from '~/lib/store/reducers/type-slice';

const useDashboardHook = () => {
  const dispatch = useAppDispatch();

  const [dashboardData, setDashboardData] = useState<any>();
  const [ratingsData, setRatingsData] = useState<any>();
  const [activitiesData, setActivitiesData] = useState<any>();

  const [triggerDashboard, dashboardDetails] = useLazyGetTutorDashboardQuery();
  const [triggerRatings, ratingsDetails] = useLazyGetRatingsQuery();
  const [triggerActivities, activitiesDetails] = useLazyGetActivitiesQuery();
  useEffect(() => {
    triggerDashboard({});
    triggerRatings({});
    triggerActivities({});
  }, []);

  useEffect(() => {
    if (dashboardDetails.isSuccess) {
      setDashboardData(dashboardDetails?.data?.data);
    }
  }, [dashboardDetails.isSuccess]);
  useEffect(() => {
    if (ratingsDetails.isSuccess) {
      setRatingsData(ratingsDetails?.data?.data);
    }
  }, [ratingsDetails.isSuccess]);
  useEffect(() => {
    if (activitiesDetails.isSuccess) {
      setActivitiesData(activitiesDetails?.data?.data);
    }
  }, [activitiesDetails.isSuccess]);
  return {
    isLoading: dashboardDetails.isLoading,
    dashboardData,
    ratingsData,
    activitiesData,
    ratingsLoading: ratingsDetails.isLoading,
    activitiesLoading: activitiesDetails.isLoading,
  };
};

export default useDashboardHook;
