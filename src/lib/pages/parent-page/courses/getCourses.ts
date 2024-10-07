import React, { useEffect, useState } from 'react';
import { useGetSubjectsQuery } from '~/lib/services/user-service';

const useGetCourses = () => {
  const [courses, setCourses] = useState([]);
  const { data, isSuccess, isError, error, isLoading } = useGetSubjectsQuery(
    null,
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setCourses(data?.data);
    }
  }, [isSuccess]);

  return { courses };
};

export default useGetCourses;
