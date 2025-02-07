import { useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { calculateMeetingTimer } from '~/lib/helpers/paths';
import { useMeetingTimer } from '~/lib/hooks/useMeetingTimer';
import {
  useCheckOutMutation,
  useCheckInMutation,
  useLazyGetSessionByIdQuery,
  useTutorCheckInMutation,
} from '~/lib/services/student-mutation';

interface Session {
  start_time: string;
  end_time: string;
  start: string;
  has_checked_in: boolean;
  instructor_check_in: string;
  student?: {
    has_checked_in: boolean;
  };
}

const useHomeMeet = (
  id: string,
  callback: () => void,
  callback2: () => void,
  callback3: () => void,
  onOpenJoin: () => void
) => {
  const toast = useToast();
  const [session, setSession] = useState<any>(null);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>('00:00');
  const intervalRef = useRef<NodeJS.Timeout>();

  const { remainingTime, isTimeUp, isNearingEnd } = useMeetingTimer(
    session?.start_time ?? '',
    session?.end_time ?? '',
    session?.start ?? ''
  );

  const [getSessionById, { isLoading, isSuccess, data, isError, error }] =
    useLazyGetSessionByIdQuery();
  const [checkIn, checkInStatus] = useCheckInMutation();
  const [checkOut, checkOutStatus] = useCheckOutMutation();

  const [tutorCheckIn, tutorCheckInStatus] = useTutorCheckInMutation();
  const formatTime = useCallback((startTime: string) => {
    const diff = Math.floor(
      (Date.now() - new Date(startTime).getTime()) / 1000
    );

    // Stop at 15 minutes (900 seconds)
    const cappedDiff = Math.min(diff, 900);

    const minutes = Math.floor(cappedDiff / 60);
    const seconds = cappedDiff % 60;

    // Clear interval if we've reached 15 minutes
    if (diff >= 900 && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const showToast = useCallback(
    (title: string, description: string, status: 'success' | 'error') => {
      toast({
        title,
        description,
        status,
        position: 'top',
      });
    },
    [toast]
  );

  // Session data effect
  useEffect(() => {
    if (isSuccess && data?.data) {
      setSession(data.data);
      setCheckInTime(data.data.instructor_check_in);

      if (data.data.start) {
        callback2();
      } else if (data.data.has_checked_in && data.data.instructor_check_in) {
        setElapsedTime(formatTime(data.data.instructor_check_in));
        if (!data.data.student?.has_checked_in) {
          callback();
        }
      }
    }
    if (isError && error) {
      // @ts-ignore
      showToast('Error', error?.data?.message, 'error');
    }
  }, [
    isSuccess,
    data,
    isError,
    error,
    callback,
    callback2,
    formatTime,
    showToast,
  ]);

  // Status effects combined
  useEffect(() => {
    const statuses = [
      {
        success: checkInStatus.isSuccess,
        error: checkInStatus.isError,
        // @ts-ignore
        errorMsg: checkInStatus.error?.data?.message,
        successMsg: 'You have successfully checked in',
      },
      {
        success: checkOutStatus.isSuccess,
        error: checkOutStatus.isError,
        // @ts-ignore
        errorMsg: checkOutStatus.error?.data?.message,
        successMsg: 'You have successfully checked out',
      },
      {
        success: tutorCheckInStatus.isSuccess,
        error: tutorCheckInStatus.isError,
        // @ts-ignore
        errorMsg: tutorCheckInStatus.error?.data?.message,
        successMsg: 'You have successfully updated tutor availability',
      },
    ];

    statuses.forEach(({ success, error, errorMsg, successMsg }) => {
      if (success) {
        showToast('Success', successMsg, 'success');
        getSessionById(id);
        if (successMsg === 'You have successfully checked out') {
          callback3();
        }
        if (successMsg === 'You have successfully checked out') {
          onOpenJoin();
        }
      }
      if (error) {
        showToast('Error', errorMsg, 'error');
      }
    });
  }, [
    checkInStatus.isSuccess,
    checkInStatus.isError,
    checkOutStatus.isSuccess,
    checkOutStatus.isError,
    tutorCheckInStatus.isSuccess,
    tutorCheckInStatus.isError,
    id,
    showToast,
  ]);

  // Timer effect
  useEffect(() => {
    if (session?.has_checked_in && checkInTime) {
      setElapsedTime(formatTime(checkInTime));

      const now = Date.now();
      const nextSecond = Math.ceil(now / 1000) * 1000;
      const delay = nextSecond - now;

      const timeoutId = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          setElapsedTime(formatTime(checkInTime));
        }, 1000);
      }, delay);

      return () => {
        clearTimeout(timeoutId);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [session?.has_checked_in, checkInTime, formatTime]);

  // Initial fetch
  useEffect(() => {
    getSessionById(id);
  }, [id, getSessionById]);

  return {
    session,
    isLoading,
    checkIn,
    isCheckInLoading: checkInStatus.isLoading,
    checkOut,
    isCheckOutLoading: checkOutStatus.isLoading,
    tutorCheckIn,
    isTutorCheckInLoading: tutorCheckInStatus.isLoading,
    elapsedTime,
    remainingTime,
    isTimeUp,
    isNearingEnd,
  };
};

export default useHomeMeet;
