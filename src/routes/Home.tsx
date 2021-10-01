import React, { useEffect } from 'react';
import { ReactComponent as AnimatedLogo } from '../images/wtp-animated.svg';
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
      <div className={'title' + (showTitle ? ' fade' : '')}>
        <span>STAPLES</span> WE THE PEOPLE
      </div>
      <div className={'links' + (showTitle ? ' fade' : '')}>
        <a href="/units" className="link">
          Units
        </a>
        <div className="sep">|</div>
      </div>
    </div>
  );
}
