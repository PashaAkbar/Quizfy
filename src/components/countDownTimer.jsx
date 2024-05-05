import {useState, useEffect} from 'react';

// eslint-disable-next-line react/prop-types
const CountdownTimer = ({initialSeconds, onTimeout}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  // Decrease the countdown timer every second
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Cleanup the interval on component unmount or when seconds reach 0
    return () => clearInterval(countdownInterval);
  }, []);

  // Handle timeout when countdown reaches 0
  useEffect(() => {
    if (seconds === 0) {
      // Trigger the onTimeout callback
      onTimeout();
    }
  }, [seconds, onTimeout]);

  // Format seconds into MM:SS string
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div>
      <p>{formatTime(seconds)}</p>
    </div>
  );
};

export default CountdownTimer;
