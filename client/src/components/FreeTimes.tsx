import React from 'react';
import { MeetingDay } from 'wtp-shared';
import { getFreeTimesInDay, updateFreeTimes } from '../dataUtils';
import '../styles/components/FreeTimes.scss';
import { formatDate, formatHour } from '../timeUtils';

export default function FreeTimes(props: { day: Date; back: () => void, admin: boolean }) {
  let [day, setDay] = React.useState({} as MeetingDay);

  React.useEffect(() => {
    getFreeTimesInDay(props.day).then((day) => {
      setDay(day);
      console.log(day);
    });
  }, [props.day]);

  function GenerateHourSlots() {
    const hours = [];
    for (let i = 0; i < 24; i += 4) {
      hours.push(
        <tr key={i}>
          <td>
            <HourSlot hour={i} free={day && day.freeTimes ? day.freeTimes[i] : false} key={i} />
          </td>
          <td>
            <HourSlot hour={i + 1} free={day && day.freeTimes ? day.freeTimes[i + 1] : false} key={i + 1} />
          </td>
          <td>
            <HourSlot hour={i + 2} free={day && day.freeTimes ? day.freeTimes[i + 2] : false} key={i + 2} />
          </td>
          <td>
            <HourSlot hour={i + 3} free={day && day.freeTimes ? day.freeTimes[i + 3] : false} key={i + 3} />
          </td>
        </tr>
      );
    }
    return hours;
  }

  function ToggleHour(i: number) {
    let freeTimes = [] as boolean[];

    if (!day || !day.freeTimes) {
      for (let j = 0; j < 24; j++) {
        freeTimes[j] = j === i;
      }
    } else {
      freeTimes = day.freeTimes;
      freeTimes[i] = !freeTimes[i];
    }

    let newDay = {
      day: props.day,
      freeTimes: freeTimes,
    };

    setDay(newDay);

    if (newDay && newDay.freeTimes) updateFreeTimes(newDay);
  }

  function HourSlot(props: { hour: number; free: boolean }) {
    return (
      <div onClick={() => ToggleHour(props.hour)} className={`hour-slot${props.free ? ' free' : ''}`}>
        {formatHour(props.hour + 1)}
      </div>
    );
  }

  return (
    <div className="free-times">
      <div className="title">
        {props.admin && "Set "}Free Times for <span>{formatDate(props.day)}</span>
      </div>
      <div className="back" onClick={props.back}>
        &lt; Back to Calendar
      </div>
      <table>
        <tbody>{GenerateHourSlots()}</tbody>
      </table>
    </div>
  );
}
