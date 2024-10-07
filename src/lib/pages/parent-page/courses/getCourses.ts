import React, { useEffect, useState } from 'react';
import { useLazyGetSubjectsQuery } from '~/lib/services/parent-mutation';

const useGetCourses = () => {
  const [courses, setCourses] = useState<any>([]);
  const [getSubjects, { data, isSuccess, isError, error, isLoading }] =
    useLazyGetSubjectsQuery();

  useEffect(() => {
    if (isSuccess) {
      setCourses(data?.data);
    }
  }, [isSuccess]);
  useEffect(() => {
    getSubjects(1);
  }, []);

  return {
    courses,
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
    isLoading,
  };
};

export default useGetCourses;
