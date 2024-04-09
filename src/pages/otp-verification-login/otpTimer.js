import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';

const OtpTimer = ({ resetTimer }) => {
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
      } else {
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  useEffect(() => {
    setMinutes(3);
    setSeconds(0);
  }, [resetTimer]);

  const formatTime = () => {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };
  return <>{formatTime()}</>;
};

OtpTimer.propTypes = {
  resetTimer: Proptypes.bool,
};

export default OtpTimer;
