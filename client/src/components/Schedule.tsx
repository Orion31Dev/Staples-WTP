import React from 'react';
import Slots from './Slots';
import Calendar from './Calendar';
import '../styles/components/Schedule.scss';

export default function Schedule(props: { admin?: boolean }) {
  let [selectedDate, _setSelectedDate] = React.useState(undefined as undefined | Date);
  let [calendarFade, setCalendarFade] = React.useState(false);

  function setSelectedDate(date: Date | undefined) {
    setCalendarFade(true);
    setTimeout(() => {
      setCalendarFade(false);
      _setSelectedDate(date);
    }, 300);
  }

  return (
    <div className={`schedule ${calendarFade ? 'fade' : ''}`}>
      {selectedDate ? (
        <Slots back={() => setSelectedDate(undefined)} day={selectedDate} admin={props.admin || false} />
      ) : (
        <Calendar onSelect={(d) => setSelectedDate(d)} />
      )}
    </div>
  );
}
