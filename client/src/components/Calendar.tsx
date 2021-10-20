import React from 'react';
import '../styles/components/Calendar.scss';
import { getFirstDayInMonth, monthNames, numOfDaysInMonth } from '../timeUtils';

export default function Calendar(props: { onSelect: (date: Date) => void }) {
  let [month, setMonth] = React.useState(new Date().getMonth());
  let [fade, setFade] = React.useState(false);

  function changeMonth(v: -1 | 1) {
    setFade(true);
    setTimeout(() => {
      setMonth((month + 12 + v) % 12);
      setFade(false);
    }, 300);
  }

  function GenerateRows(month: number) {
    let num = numOfDaysInMonth(month);

    // Get day of the week of the first day of the month
    let now = new Date();
    let firstDayOfMonth = getFirstDayInMonth(month);

    let skip = firstDayOfMonth;

    let rows = [];
    let curRow = [];

    let eleCount = Math.ceil((num + firstDayOfMonth) / 7) * 7;

    for (let i = 0; i < eleCount; i++) {
      if (i % 7 === 0 && i !== 0) {
        rows.push(curRow);
        curRow = [];
      }

      if (skip > 0 || i >= num + firstDayOfMonth) {
        curRow.push(<td className="empty day" key={i}></td>);
        skip--;
        continue;
      }

      curRow.push(
        <CalendarDay
          key={i}
          day={i + 1 - firstDayOfMonth}
          date={new Date(now.getFullYear(), month, i - firstDayOfMonth + 1)}
          today={now.getDate() + firstDayOfMonth - 1 === i && month === now.getMonth()}
        />
      );
    }

    rows.push(curRow);

    let i = 0;
    return rows.map((r) => <tr key={i++}>{r}</tr>);
  }

  function CalendarDay(cprops: { day: number | string; today?: boolean; date: Date }) {
    return (
      <td className={'day' + (cprops.today ? ' today' : '')} onClick={() => props.onSelect(cprops.date)}>
        {cprops.day}
      </td>
    );
  }

  return (
    <div className="calendar-wrapper flex">
      <div className="month-wrapper">
        <div className="prev" onClick={() => changeMonth(-1)}>
          &lt;
        </div>
        <div className={'month' + (fade ? ' fade' : '')}>{monthNames[month]}</div>
        <div className="next" onClick={() => changeMonth(1)}>
          &gt;
        </div>
      </div>
      <table className={'calendar' + (fade ? ' fade' : '')}>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{GenerateRows(month)}</tbody>
      </table>
    </div>
  );
}
