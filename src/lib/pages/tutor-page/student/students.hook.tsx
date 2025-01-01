'use client';

import React, { useEffect, useState } from 'react';
import { useLazyGetStudentsQuery } from '~/lib/services/tutor-mutation';

const StudentsHook = () => {
  const [students, setStudents] = useState<any>([]);
  const [getStudents, { data, isSuccess, isLoading }] =
    useLazyGetStudentsQuery();

  useEffect(() => {
    getStudents({});
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setStudents(data?.data);
    }
  }, [isSuccess, data]);

  return {
    students,
    isLoading,
    getStudents,
  };
};

export default StudentsHook;
