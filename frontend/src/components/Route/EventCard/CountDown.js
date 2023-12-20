import React, { useState, useEffect } from "react";

const CountDown = () => {
  const offerEndDate = new Date("2024-01-01T00:00:00Z"); // Replace with your offer end date

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = new Date(offerEndDate) - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      expired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  if (timeLeft.expired) {
    return <div>Offer has expired!</div>;
  }

  return (
    <div className="flex text-red-500 font-semibold">
      <div className="mr-2">{timeLeft.days} days</div>
      <div className="mr-2">{timeLeft.hours} hours</div>
      <div className="mr-2">{timeLeft.minutes} minutes</div>
      <div>{timeLeft.seconds} seconds</div>
    </div>
  );
};

export default CountDown;
