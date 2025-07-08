import { useEffect, useState, useCallback, useRef } from 'react';
import { calculateMeetingTimer } from '../helpers/paths';
import { TimerResult } from '../types/data';

export const useMeetingTimer = (
  startTime: string,
  endTime: string,
  actualMeetingStartTime: string
) => {
  const intervalRef = useRef<NodeJS.Timeout>();
  const paramsRef = useRef({ startTime, endTime, actualMeetingStartTime });

  const calculateTimer = useCallback(
    () =>
      calculateMeetingTimer(
        paramsRef.current.startTime,
        paramsRef.current.endTime,
        paramsRef.current.actualMeetingStartTime
      ),
    []
  );

  const [timerState, setTimerState] = useState<TimerResult>(calculateTimer);

  useEffect(() => {
    paramsRef.current = { startTime, endTime, actualMeetingStartTime };
    setTimerState(calculateTimer());
  }, [startTime, endTime, actualMeetingStartTime, calculateTimer]);

  useEffect(() => {
    if (timerState.isTimeUp) return;

    const now = Date.now();
    const nextSecond = Math.ceil(now / 1000) * 1000;
    const delay = nextSecond - now;

    const timeoutId = setTimeout(() => {
      setTimerState(calculateTimer());

      intervalRef.current = setInterval(() => {
        setTimerState((prevState) => {
          const newState = calculateTimer();
          if (newState.isTimeUp && intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return newState;
        });
      }, 1000);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [calculateTimer, timerState.isTimeUp]);

  return timerState;
};
