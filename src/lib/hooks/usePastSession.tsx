'use client';

import { useEffect, useState } from 'react';
import { useLazyGetPastSessionsQuery } from '../services/student-mutation';
import { Session } from '../types/data';

export const usePastSessions = () => {
  const [pastSessions, setPastSessions] = useState<Session[]>([]);
  const [getPastSessions, { data, isLoading, isError }] =
    useLazyGetPastSessionsQuery();

  useEffect(() => {
    getPastSessions({});
  }, []);

  useEffect(() => {
    if (data) {
      setPastSessions(data.data);
    }
  }, [data]);

  return {
    pastSessions,
    isLoading,
    isError,
  };
};
