import { useEffect, useState } from "react";
import { formatDate, parseDate } from "../../utils/dateHelper";

type TimeAgoProps = {
  timeProp: Date | string;
};

const TimeAgo = ({ timeProp }: TimeAgoProps) => {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    const init = () => {
      console.log();
      const date = parseDate(timeProp);
      if (date) {
        const diff = new Date().getTime() - date.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));

        if (weeks > 4) {
          setTime(formatDate(date.toISOString()));
          return;
        }

        if (weeks > 0) {
          setTime(`${weeks} week${weeks > 1 ? "s" : ""} ago`);
          return;
        }

        if (days > 0) {
          setTime(`${days} day${days > 1 ? "s" : ""} ago`);
          return;
        }

        if (hours > 0) {
          setTime(`${hours} hour${hours > 1 ? "s" : ""} ago`);
          return;
        }

        if (minutes > 0) {
          setTime(`${minutes} minute${minutes > 1 ? "s" : ""} ago`);
          return;
        }

        if (seconds > 0) {
          setTime(`${seconds} second${seconds > 1 ? "s" : ""} ago`);
        }

        if (seconds >= 0) {
          setTime(seconds < 10 ? "Just now" : `${seconds} seconds ago`);
        }
      }
    };
    init();
  }, [timeProp]);
  return <div className="time-ago">{time}</div>;
};

export default TimeAgo;
