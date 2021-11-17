import React, { useEffect } from 'react';
import { ReactComponent as AnimatedLogo } from '../images/wtp-animated.svg';
import AuthButton from '../oauth/AuthButton';
import '../styles/components/Home.scss';

export default function Home() {
  let [logoFade, setLogoFade] = React.useState(false);
  let [showTitle, setShowTitle] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLogoFade(true);
      setTimeout(() => {
        setShowTitle(true);
      }, 400);
    }, 1000);
  }, []);

  return (
    <div className="home section flex">
      <AnimatedLogo className={'logo' + (logoFade ? ' fade' : '')} />
      <div className={'h-title' + (showTitle ? ' fade' : '')}>
        <span>Staples</span> We The People
      </div>
      <div className={'links' + (showTitle ? ' fade' : '')}>
        <a href="/units" className="link">
          Units
        </a>
        <div className="sep">|</div>
        <a href="https://docs.google.com/document/d/15uexFKp_Kgawl1AXJ48_33_2207Nf91gYJbFLpKfUfU/edit" className="link">
          Calendar
        </a>
        <div className="sep">|</div>
        <a href="/draft-statuses" className="link">
          Draft Statuses
        </a>
        <div className="sep">|</div>
        <AuthButton styleAsLink={true} />
      </div>
    </div>
  );
}
