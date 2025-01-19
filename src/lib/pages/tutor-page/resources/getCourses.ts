import React, { useEffect, useState } from 'react';
import {
  useLazyGetCoursesQuery,
  useLazyGetSubjectsQuery,
} from '~/lib/services/tutor-mutation';
import { useGetSubjectsQuery } from '~/lib/services/user-service';

const useGetCourses = () => {
  const [courses, setCourses] = useState<any>([]);
  const [getCourses, { data, isSuccess, isLoading }] =
    useLazyGetSubjectsQuery();

  const baseSubjectData = useGetSubjectsQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const fetchCourses = (filters: { Name?: string; Base_Subject?: string }) => {
    getCourses(filters); // Pass filters to the query here
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data, data, 'here');
      setCourses(data?.data);
    }
  }, [isSuccess, data]);

  return {
    courses,
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
    isLoading,
    total_pages: data?.total_pages,
    getCourses,
    currentPage: data?.current_page,
    fetchCourses,
    baseSubjectData: baseSubjectData?.data?.data,
  };
};

export default useGetCourses;
