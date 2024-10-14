import next from 'next';
import React, { useEffect, useState } from 'react';
import {
  parentService,
  useLazyGetSubjectsQuery,
} from '~/lib/services/parent-mutation';
import {
  studentService,
  useLazyGetActiveCoursesQuery,
  useLazyGetCompletedCoursesQuery,
} from '~/lib/services/student-mutation';
import { useAppDispatch } from '~/lib/store';

const useGetCourses = () => {
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<any>([]);
  const [pageData, setPageData] = useState<any>({
    total_pages: 0,
    next: 0,
    previous: 0,
    current_page: 0,
  });
  const [
    getSubjects,
    {
      data: subjectsData,
      isLoading: isLoadingSubjects,
      isSuccess: isSubjectSuccess,
    },
  ] = useLazyGetSubjectsQuery();
  const [
    getActiveCourses,
    {
      data: activeData,
      isLoading: isLoadingActive,
      isSuccess: isActiveSuccess,
    },
  ] = useLazyGetActiveCoursesQuery();
  const [
    getCompletedCourses,
    {
      data: completedData,
      isLoading: isLoadingCompleted,
      isSuccess: isCompleteSuccess,
    },
  ] = useLazyGetCompletedCoursesQuery();

  const [currentPage, setCurrentPage] = useState(1);

  // Handle fetching data based on the tab
  const fetchCourses = (data: any) => {
    if (data) {
      setCourses(data?.data);
    }
  };

  useEffect(() => {
    if (isSubjectSuccess) {
      setCourses(subjectsData?.data);
      setPageData({
        total_pages: subjectsData?.total_pages,
        next: subjectsData?.next,
        previous: subjectsData?.previous,
        current_page: subjectsData?.current_page,
      });
      console.log(subjectsData?.data, 'pp');
      setTimeout(() => {
        // handleInvalidateAndRefetch();
        dispatch(parentService.util.resetApiState());
      }, 5000);
    }
  }, [subjectsData, isSubjectSuccess]);

  useEffect(() => {
    if (isActiveSuccess) {
      setCourses(activeData?.data);
      setPageData({
        total_pages: activeData?.total_pages,
        next: activeData?.next,
        previous: activeData?.previous,
        current_page: activeData?.current_page,
      });
      setTimeout(() => {
        // handleInvalidateAndRefetch();
        dispatch(studentService.util.resetApiState());
      }, 1000);
    }
  }, [activeData, isActiveSuccess]);

  useEffect(() => {
    if (isCompleteSuccess) {
      setCourses(completedData?.data);
      console.log(completedData, 'll');
      setPageData({
        total_pages: completedData?.total_pages,
        next: completedData?.next,
        previous: completedData?.previous,
        current_page: completedData?.current_page,
      });
      setTimeout(() => {
        // handleInvalidateAndRefetch();
        dispatch(studentService.util.resetApiState());
      }, 5000);
    }
  }, [isCompleteSuccess, completedData]);
  console.log(courses, isLoadingActive, isLoadingCompleted, isLoadingSubjects);
  return {
    ...pageData,
    courses,
    isLoading: isLoadingSubjects || isLoadingActive || isLoadingCompleted,
    currentPage,
    getSubjects,
    getActiveCourses,
    getCompletedCourses,
    setCourses,
  };
};

export default useGetCourses;
