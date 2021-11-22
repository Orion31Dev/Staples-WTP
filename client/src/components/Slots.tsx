import React from 'react';
import { MeetingDay, Slot as ISlot } from 'wtp-shared';
import { getMeetingDayFromDay, updateMeetingDay } from '../dataUtils';
import '../styles/components/Slots.scss';
import { formatDate } from '../timeUtils';

export default function Slots(props: { date: Date; back: () => void; admin: boolean }) {
  let [day, setDay] = React.useState({} as MeetingDay);

  React.useEffect(() => {
    getMeetingDayFromDay(props.date).then((day) => {
      setDay(day);
    });
  }, [props.date]);

  function onDelete(slot: ISlot) {
    let newDay = {
      ...day,
      slots: day.slots.filter((s) => JSON.stringify(s) !== JSON.stringify(slot)),
    };

    updateMeetingDay(newDay).then(() => setDay(newDay));
  }

  return (
    <div className="slots">
      <div className="title">
        {props.admin && 'Set '}Slots for <span>{formatDate(props.date)}</span>
      </div>
      <div className="back" onClick={props.back}>
        &lt; Back to Calendar
      </div>
      <div className="slots-list">
        {day.slots?.map((slot, i) => (
          <Slot
            key={i}
            slot={slot}
            onDelete={() => {
              onDelete(slot);
            }}
            admin={props.admin}
          />
        ))}
      </div>
      <CreateSlotDialog day={day} onUpdateDay={setDay} />
    </div>
  );
}

function CreateSlotDialog(props: { day: MeetingDay; onUpdateDay: Function }) {
  let [sHour, setSHour] = React.useState('11');
  let [sMin, setSMin] = React.useState('30');
  let [sAm, setSAm] = React.useState(true);
  let [eHour, setEHour] = React.useState('12');
  let [eMin, setEMin] = React.useState('00');
  let [eAm, setEAm] = React.useState(false);

  let [error, setError] = React.useState('');

  if (!props.day || !props.day.date) return <div></div>;

  return (
    <div className={`create-slot${error !== '' ? ' shake' : ''}`}>
      <div className="slot-title">Create Slot for {formatDate(props.day.date)}</div>
      <div className="start">
        <div className="label">From</div>
        <input
          type="text"
          className="hour"
          value={sHour}
          maxLength={2}
          onChange={(e) => {
            validateInput(e, setSHour);
          }}
        />
        :
        <input
          type="text"
          className="minutes"
          value={sMin}
          maxLength={2}
          onChange={(e) => {
            validateInput(e, setSMin);
          }}
        />
        <div
          className="btn-am"
          onClick={() => {
            setSAm(!sAm);
          }}
        >
          {sAm ? 'AM' : 'PM'}
        </div>
      </div>
      <div className="end">
        <div className="label">To</div>
        <input
          type="text"
          className="hour"
          value={eHour}
          maxLength={2}
          onChange={(e) => {
            validateInput(e, setEHour);
          }}
        />
        :
        <input
          type="text"
          className="minutes"
          value={eMin}
          maxLength={2}
          onChange={(e) => {
            validateInput(e, setEMin);
          }}
        />
        <div
          className="btn-am"
          onClick={() => {
            setEAm(!eAm);
          }}
        >
          {eAm ? 'AM' : 'PM'}
        </div>
      </div>
      <div
        className="btn-create"
        onClick={() => {
          let sHNum = parseInt(sHour);
          let sMNum = parseInt(sMin);
          let eHNum = parseInt(eHour);
          let eMNum = parseInt(eMin);

          let invalidTime = sHNum > 12 || sMNum > 59 || eHNum > 12 || eMNum > 59;

          if (!sAm && sHNum !== 12) sHNum += 12;
          if (sAm && sHNum === 12) sHNum = 0;
          if (!eAm && eHNum !== 12) eHNum += 12;
          if (eAm && eHNum === 12) eHNum = 0;

          let startsBeforeEnd = sHNum > eHNum || (sHNum === eHNum && sMNum >= eMNum);

          let conflict = props.day.slots.some((slot) => {
            let oSH = slot.start.hour;
            let oSM = slot.start.minutes;
            let oEH = slot.end.hour;
            let oEM = slot.end.minutes;

            let endsBeforeOtherStarts = oEH < sHNum || (oEH === sHNum && oEM < sMNum);
            let startsAfterOtherEnds = oSH > eHNum || (oSH === eHNum && oSM > eMNum);

            return !(endsBeforeOtherStarts || startsAfterOtherEnds);
          });

          if (conflict || startsBeforeEnd || invalidTime) {
            if (invalidTime) setError('Invalid time');
            else if (conflict) setError('Conflict with other slot');
            else if (startsBeforeEnd) setError('Start time must be before end time');

            setTimeout(() => {
              setError('');
            }, 1500);
            return;
          }

          let newSlot = {
            start: { hour: sHNum, minutes: sMNum },
            end: { hour: eHNum, minutes: eMNum },
          } as ISlot;

          let newMeetingDay = { date: props.day.date, slots: [...props.day.slots, newSlot] } as MeetingDay;

          updateMeetingDay(newMeetingDay).then(() => {
            props.onUpdateDay(newMeetingDay);
          });
        }}
      >
        {error !== '' ? error : 'Create'}
      </div>
    </div>
  );

  function validateInput(e: any, callback: Function) {
    // make sure input is numeric
    if (e.target.value.match(/^\d+$/) || e.target.value === '') {
      callback(e.target.value);
    }
  }
}

function Slot(props: { slot: ISlot; onDelete: Function; admin?: boolean }) {
  return (
    <div
      className={`slot${props.admin ? ' admin' : ''}`}
      onClick={() => {
        if (props.admin) {
          props.onDelete();
        }
      }}
    >
      From
      <div className="start">
        {props.slot.start.hour % 12 === 0 ? 12 : props.slot.start.hour % 12}:
        {props.slot.start.minutes.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
        &nbsp;
        {props.slot.start.hour >= 12 ? 'pm' : 'am'}
      </div>
      to
      <div className="end">
        {props.slot.end.hour % 12 === 0 ? 12 : props.slot.end.hour % 12}:
        {props.slot.end.minutes.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
        &nbsp;
        {props.slot.end.hour >= 12 ? 'pm' : 'am'}
      </div>
      |
      <div className="length">
        <span>{calculateSlotLength(props.slot)}</span> minutes
      </div>
      {props.slot.unit && <div className="unit">Unit {props.slot.unit}</div>}
    </div>
  );
}

function calculateSlotLength(slot: ISlot) {
  let sHour = slot.start.hour;
  let sMin = slot.start.minutes;
  let eHour = slot.end.hour;
  let eMin = slot.end.minutes;

  let diff = eHour - sHour;
  let diffMins = eMin - sMin;

  let totalMins = diff * 60 + diffMins;

  return totalMins;
}
