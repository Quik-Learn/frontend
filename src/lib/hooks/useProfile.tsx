import React, { useEffect, useState } from 'react';
import { useLazyGetUserQuery } from '~/lib/services/user-service';
import { setType } from '~/lib/store/reducers/type-slice';
import { useAppDispatch } from '../store';

const useProfileHook = () => {
  const dispatch = useAppDispatch();
  const [trigger, { data, isLoading, isSuccess }] = useLazyGetUserQuery();

  const [profileData, setProfileData] = useState<any>();
  useEffect(() => {
    trigger({});
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log(data?.data);
      setProfileData(data?.data);
      dispatch(setType(data?.data?.account_type?.toLowerCase()));
    }
  }, [data, isSuccess]);

  return {
    data: profileData,
    type: data?.data?.account_type?.toLowerCase(),
    isLoading,
    trigger,
    isSuccess,
  };
};

export default useProfileHook;
