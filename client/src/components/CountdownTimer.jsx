import React, { useState, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';

const CountdownTimer = ({ targetTime, onComplete, showLabel = true, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTime));

  useEffect(() => {
    if (!targetTime) return;
    
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetTime);
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime, onComplete]);

  function calculateTimeLeft(endTime) {
  if (!endTime) return { total: 0 };

  const now = new Date();
  const target = new Date(endTime); // ✅ ISO string parsing

  const difference = target - now;

  if (difference <= 0) {
    return { total: 0 };
  }

  return {
    total: difference,
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
}


  if (!targetTime) {
    return <span className={className}>No time set</span>;
  }

  const showHours = timeLeft.hours > 0;
  const showMinutes = timeLeft.minutes > 0 || showHours;
  const showSeconds = timeLeft.seconds > 0 || showMinutes;

  return (
    <div className={`flex items-center ${className}`}>
      {showLabel && <FiClock className="mr-1" />}
      {timeLeft.total > 0 ? (
        <div className="flex items-center space-x-1">
          {showLabel && <span>Starts in:</span>}
          <div className="flex space-x-1">
            {showHours && (
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-sm">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
            )}
            {showMinutes && (
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-sm">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
            )}
            {showSeconds && (
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-sm">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            )}
          </div>
        </div>
      ) : (
        <span>Meeting time!</span>
      )}
    </div>
  );
};

export default CountdownTimer;
