import { useEffect, useState, type ReactNode } from "react";

type TimerProps = {
  endDate: Date;
  expiredContent?: ReactNode;
  onExpiring?: () => void;
};

const Timer = ({ endDate, onExpiring }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const dateDiff = endDate.getTime() - new Date().getTime();

      if (dateDiff <= 0) {
        if (timeInterval) clearInterval(timeInterval);
        setTimeLeft({ weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onExpiring) onExpiring();
        return;
      }

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const totalDays = Math.floor(dateDiff / day);

      setTimeLeft({
        weeks: Math.floor(totalDays / 7),
        days: totalDays % 7,
        hours: Math.floor((dateDiff % day) / hour),
        minutes: Math.floor((dateDiff % hour) / minute),
        seconds: Math.floor((dateDiff % minute) / second),
      });
    };
    let timeInterval: number = 0;
    updateTimer();
    timeInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timeInterval);
  }, [endDate, onExpiring]);

  const format = (num: number) => String(num).padStart(2, "0");

  // if (endDate <= new Date()) return <>{expiredContent}</>;
  if (endDate <= new Date()) {
    return null;
  }

  return (
    <div className="timer flexbox back-light font-main rounded shadow-dark mb-4">
      {Object.entries(timeLeft).map(
        ([label, value]) =>
          (value > 0 || label === "seconds") && (
            <div key={label} className="flexcol">
              <span className="font-5 bold">{format(value)}</span>
              <span className="font-4">{label}</span>
            </div>
          ),
      )}
    </div>
  );
};

export default Timer;
