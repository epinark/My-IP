import { DateTime } from "luxon";
function Time() {
  return <div>We are the {DateTime.now().toLocaleString()}</div>;
}

export default Time;
