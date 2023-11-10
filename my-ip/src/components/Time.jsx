import { useState, useEffect } from "react";
import { DateTime } from "luxon";

function Time() {
  const [currentTime, setCurrentTime] = useState(DateTime.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(DateTime.now());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const date = currentTime.toLocaleString(DateTime.DATE_SHORT);
  const time = currentTime.toLocaleString(DateTime.TIME_24_SIMPLE);
  return (
    <>
      <div className="flex flex-row items-center p-4">
        <span className="material-icons">calendar_today</span>
        <span className="pl-2">Today is {date}</span>
      </div>
      <div className="flex flex-row items-center p-4">
        <span class="material-icons">schedule</span>
        <span className="pl-2">Your local time is: {time}</span>
      </div>
    </>
  );
}

export default Time;
