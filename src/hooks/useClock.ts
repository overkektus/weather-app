import { useState, useEffect } from 'react';
import momentTimezone from 'moment-timezone';

interface IUseClock {
  currentTime: momentTimezone.Moment;
}

export function useClock(timeOffset: number): IUseClock {
  const [time, setTime] = useState(momentTimezone().utcOffset(timeOffset / 60));

  const refreshClock = (): void => setTime(momentTimezone().utcOffset(timeOffset / 60));

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup(): void {
      clearInterval(timerId);
    };
  }, []);

  return { currentTime: time }
}