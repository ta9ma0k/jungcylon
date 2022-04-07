import { useCallback, useEffect, useState } from 'react';

export const secondsToString = (seconds: number): string => (new Date(seconds * 1000).toISOString().substring(11, 19));

export const useTimer = () => {
  const [startTimer, setStartTimer] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (startTimer) {
      const timerId = setInterval(() => {
        setSeconds(s => ++s);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [startTimer]);

  const start = useCallback(() => {
    setSeconds(0);
    setStartTimer(true);
  }, []);

  const stop = useCallback(() => {
    setStartTimer(false);
  }, []);

  return { seconds, start, stop };
};