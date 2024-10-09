import React, { useEffect, useState } from 'react';
import { useLazyGetSubjectsQuery } from '~/lib/services/parent-mutation';

const useGetCourses = () => {
  const [courses, setCourses] = useState<any>([]);
  const [getSubjects, { data, isSuccess, isError, error, isLoading }] =
    useLazyGetSubjectsQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log(data, data, 'here');
      setCourses(data?.data);
    }
  }, [isSuccess, data]);
  // useEffect(() => {
  //   getSubjects(1);
  // }, []);

  return {
    courses,
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
    isLoading,
    total_pages: data?.total_pages,
    getSubjects,
    currentPage: data?.current_page,
  };
};

export default useGetCourses;
