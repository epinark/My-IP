import { DateTime } from "luxon";

function Time() {
  const now = DateTime.now();
  const date = now.toLocaleString(DateTime.DATE_SHORT);
  const time = now.toLocaleString(DateTime.TIME_24_SIMPLE);
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap items-center">
        <span class="material-icons">calendar_today</span>
        <span className="pl-1">Today is {date}</span>
      </div>
      <div className="flex flex-row items-center p-4">
        <span class="material-icons">schedule</span>
        <span className="pl-1">Your local time is: {time}</span>
      </div>
    </div>
  );
}

export default Time;
