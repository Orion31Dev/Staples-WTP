import React from 'react';
import '../../styles/components/FreeTimes.scss';
import { formatDate, formatHour } from '../../timeUtils';

export default function FreeTimes(props: { day: Date; back: () => void }) {
  function GenerateHourSlots() {
    const hours = [];
    for (let i = 0; i < 24; i += 4) {
      hours.push(
        <tr>
          <td>
            <HourSlot hour={i} free key={i} />
          </td>
          <td>
            <HourSlot hour={i + 1} free key={i + 1} />
          </td>
          <td>
            <HourSlot hour={i + 2} free key={i + 2} />
          </td>
          <td>
            <HourSlot hour={i + 3} free key={i + 3} />
          </td>
        </tr>
      );
    }
    return hours;
  }

  function HourSlot(props: { hour: number; free: boolean }) {
    return <div className={`hour-slot ${props.free ? 'free' : ''}`}>{formatHour(props.hour + 1)}</div>;
  }

  return (
    <div className="free-times">
      <div className="title">
        Set Free Times for <span>{formatDate(props.day)}</span>
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
