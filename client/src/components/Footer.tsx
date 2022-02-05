import React, { useEffect, useState } from 'react';
import '../styles/components/Footer.scss';

export default function Footer() {
  let [days, setDays] = useState('000');
  let [hours, setHours] = useState('00');
  let [minutes, setMinutes] = useState('00');
  let [seconds, setSeconds] = useState('00');

  let [col0slide, setCol0Slide] = useState(false);
  let [col1slide, setCol1Slide] = useState(false);
  let [col2slide, setCol2Slide] = useState(false);
  let [col3slide, setCol3Slide] = useState(false);

  let [pastSecs, setPastSecs] = useState([] as any[]);

  function updateTime() {
    // Time until Feb 5, 2022
    const then = new Date('February 5, 2022 12:00:00').getTime();

    const now = new Date().getTime();
    const diff = then - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setDays(days.toString().padStart(3, '0'));
    setHours(hours.toString().padStart(2, '0'));
    setMinutes(minutes.toString().padStart(2, '0'));
    setSeconds(seconds.toString().padStart(2, '0'));
  }

  /*useEffect(() => {
    updateTime();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (pastSecs.includes(seconds)) return;

      if (seconds === '30') setPastSecs(['30']);
      else if (seconds === '20') setPastSecs([...pastSecs.filter((s) => s !== '30'), '20']);
      else setPastSecs([...pastSecs, seconds]);

      setCol3Slide(true);
      if (seconds === '00') {
        setCol2Slide(true);
        if (minutes === '00') {
          setCol1Slide(true);

          if (hours === '00') setCol0Slide(true);
        }
      }

      setTimeout(() => {
        setCol0Slide(false);
        setCol1Slide(false);
        setCol2Slide(false);
        setCol3Slide(false);

        updateTime();
      }, 500);
    }, 500);
  }, [seconds, minutes, hours, pastSecs]);*/

  return (
    <div className="footer">
      {
        <div className="credits">
          Website designed by Ryan Salik. <a href="https://github.com/Orion31Dev/Staples-WTP">GitHub</a>
        </div>
      }
      <div className="clock">
        <div className={'col0 col' + (col0slide ? ' slide' : '')}>
          <div className="days">{subtractFromString(days, 1, true, true, true)}</div>
          <div className="days">{days}</div>
          <div className="days e">&nbsp;</div>
          <div className="days e">&nbsp;</div>
          <div className="days e">&nbsp;</div>
        </div>
        <div className={'col1 col' + (col1slide ? ' slide' : '')}>
          <div className="hours e">&nbsp;</div>
          <div className="hours e">&nbsp;</div>
          <div className="hours">{subtractFromString(hours, 1, false, false)}</div>
          <div className="hours">{hours}</div>
          <div className="hours e">&nbsp;</div>
        </div>
        <div className={'col2 col' + (col2slide ? ' slide' : '')}>
          <div className="minutes e">&nbsp;</div>
          <div className="minutes e">&nbsp;</div>
          <div className="minutes e">&nbsp;</div>
          <div className="minutes">{subtractFromString(minutes, 1)}</div>
          <div className="minutes">{minutes}</div>
        </div>
        <div className={'col3 col' + (col3slide ? ' slide' : '')}>
          <div className="seconds e">&nbsp;</div>
          <div className="seconds">{subtractFromString(seconds, 1)}</div>
          <div className="seconds">{seconds}</div>
          <div className="seconds e">&nbsp;</div>
          <div className="seconds e">&nbsp;</div>
        </div>
      </div>
      <div className="msg">{window.location.href.includes('unit/3') ? 'There used to be an easter egg here' : 'The competition is here.'}</div>
      <div className="clock w">
        <div className={'col0 col' + (col0slide ? ' slide' : '')}>
          <div className="days">{subtractFromString(days, 1, true, true, true)}</div>
          <div className="days">{days}</div>
          <div className="days">{subtractFromString(days, -1, true, true, true)}</div>
          <div className="days">{subtractFromString(days, -2, true, true, true)}</div>
          <div className="days">{subtractFromString(days, -3, true, true, true)}</div>
        </div>
        <div className={'col1 col' + (col1slide ? ' slide' : '')}>
          <div className="hours">{subtractFromString(hours, 3, false, false)}</div>
          <div className="hours">{subtractFromString(hours, 2, false, false)}</div>
          <div className="hours">{subtractFromString(hours, 1, false, false)}</div>
          <div className="hours">{hours}</div>
          <div className="hours">{subtractFromString(hours, -1, false, false)}</div>
        </div>
        <div className={'col2 col' + (col2slide ? ' slide' : '')}>
          <div className="minutes">{subtractFromString(minutes, 4)}</div>
          <div className="minutes">{subtractFromString(minutes, 3)}</div>
          <div className="minutes">{subtractFromString(minutes, 2)}</div>
          <div className="minutes">{subtractFromString(minutes, 1)}</div>
          <div className="minutes">{minutes}</div>
        </div>
        <div className={'col3 col' + (col3slide ? ' slide' : '')}>
          <div className="seconds">{subtractFromString(seconds, 2)}</div>
          <div className="seconds">{subtractFromString(seconds, 1)}</div>
          <div className="seconds">{seconds}</div>
          <div className="seconds">{subtractFromString(seconds, -1)}</div>
          <div className="seconds">{subtractFromString(seconds, -2)}</div>
        </div>
      </div>
    </div>
  );
}

function subtractFromString(str: string, sub: number, allow60 = false, allow24 = true, days = false) {
  let num = parseInt(str);

  num = num - sub;

  if (!allow24) {
    if (num < 0) num = 24 + num;
    if (num >= 24 && !allow24) num -= 24;
  } else {
    if (num < 0) num += 60;
    if (num >= 60 && !allow60) num -= 60;
  }

  return num.toString().padStart(days ? 3 : 2, '0');
}
