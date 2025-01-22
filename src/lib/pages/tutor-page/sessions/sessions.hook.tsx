import React, { useEffect, useState } from 'react';
import { formatData, formatDataTutor } from '~/lib/helpers/paths';

import { useLazyGetSessionsQuery } from '~/lib/services/tutor-mutation';

const useSessionsHook = () => {
  const [sessionsData, setSessionsData] = useState<any>();

  const [triggerSessions, sessionsDetails] = useLazyGetSessionsQuery();
  useEffect(() => {
    triggerSessions({});
  }, []);

  useEffect(() => {
    if (sessionsDetails.isSuccess) {
      setSessionsData(formatDataTutor(sessionsDetails?.data?.data || []));
    }
  }, [sessionsDetails.isSuccess]);
  return {
    isLoading: sessionsDetails.isLoading,
    sessionsData,
    triggerSessions,
  };
};

export default useSessionsHook;
