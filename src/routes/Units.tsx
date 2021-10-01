import React from 'react';
import '../styles/routes/Units.scss';
import { ReactComponent as Unit1Img } from '../images/unit1.svg';
import { ReactComponent as Unit2Img } from '../images/unit2.svg';
import { ReactComponent as Unit3Img } from '../images/unit3.svg';
import { ReactComponent as Unit4Img } from '../images/unit4.svg';
import { ReactComponent as Unit5Img } from '../images/unit5.svg';
import { ReactComponent as Unit6Img } from '../images/unit6.svg';

export default function Units() {
  let [fade, setFade] = React.useState(true);

  React.useEffect(() => {
    setFade(false);
  }, []);

  return (
    <div className={'units section flex' + (fade ? ' fade' : '')}>
      <div className="title">Units</div>
      <a href="/unit/1">
        <div className="unit flex">
          <Unit1Img />
        </div>
      </a>
      <div className="mobile-br"></div>
      <a href="/unit/2">
        <div className="unit unit2 flex">
          <Unit2Img />
        </div>
      </a>
      <div className="mobile-br"></div>
      <a href="/unit/3">
        <div className="unit flex">
          <Unit3Img />
        </div>
      </a>
      <div className="comp-br"></div>
      <a href="/unit/4">
        <div className="unit flex">
          <Unit4Img />
        </div>
      </a>
      <div className="mobile-br"></div>
      <a href="/unit/5">
        <div className="unit flex">
          <Unit5Img />
        </div>
      </a>
      <div className="mobile-br"></div>
      <a href="/unit/6">
        <div className="unit flex">
          <Unit6Img />
        </div>
      </a>
    </div>
  );
}
