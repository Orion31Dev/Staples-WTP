import React from 'react';
import unitDataJson from '../unit_data.json';
import '../styles/routes/Unit.scss';

// Sad :(
import { ReactComponent as Unit1Img } from '../images/unit1.svg';
import { ReactComponent as Unit2Img } from '../images/unit2.svg';
import { ReactComponent as Unit3Img } from '../images/unit3.svg';
import { ReactComponent as Unit4Img } from '../images/unit4.svg';
import { ReactComponent as Unit5Img } from '../images/unit5.svg';
import { ReactComponent as Unit6Img } from '../images/unit6.svg';

interface UnitProps {
  match: any;
}

interface UnitState {
  unitData: typeof unitDataJson['1'];
}

export default class Unit extends React.Component<UnitProps, UnitState> {
  constructor(props: UnitProps) {
    super(props);
    let key = this.props.match.params.unitNumber.toString() as keyof typeof unitDataJson;
    this.state = {
      unitData: unitDataJson[key],
    };
  }

  render() {
    return (
      <div className="unit">
        <div className="img-wrapper flex">{UnitImage(this.props.match.params.unitNumber)}</div>
        <div className="questions">{this.state.unitData.questions[0].main + ' '}</div>
      </div>
    );
  }
}

function UnitImage(unitNumber: any) {
  console.log(unitNumber);
  switch (unitNumber) {
    case '1':
      return <Unit1Img className="unit-img" />;
    case '2':
      return <Unit2Img className="unit-img" />;
    case '3':
      return <Unit3Img className="unit-img" />;
    case '4':
      return <Unit4Img className="unit-img" />;
    case '5':
      return <Unit5Img className="unit-img" />;
    case '6':
      return <Unit6Img className="unit-img" />;
    default:
      return <div>Error</div>;
  }
}
