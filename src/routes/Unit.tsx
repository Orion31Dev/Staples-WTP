import React from 'react';
import unitDataJson from './unit/unit_data.json';
import '../styles/routes/Unit.scss';

// Sad :(
import { ReactComponent as Unit1Img } from '../images/unit1.svg';
import { ReactComponent as Unit2Img } from '../images/unit2.svg';
import { ReactComponent as Unit3Img } from '../images/unit3.svg';
import { ReactComponent as Unit4Img } from '../images/unit4.svg';
import { ReactComponent as Unit5Img } from '../images/unit5.svg';
import { ReactComponent as Unit6Img } from '../images/unit6.svg';
import { IUnitData, IUnit } from './unit/UnitData';
import UnitQuestions from './unit/UnitQuestions';

interface UnitProps {
  match: any;
}

enum UnitTab {
  NONE,
  QUESTIONS,
}

interface UnitState {
  unitData: IUnit;
  tabIndex: number;
}

export default class Unit extends React.Component<UnitProps, UnitState> {
  constructor(props: UnitProps) {
    super(props);
    let key = this.props.match.params.unitNumber.toString() as keyof IUnitData;
    this.state = {
      unitData: unitDataJson[key],
      tabIndex: UnitTab.NONE,
    };
  }

  render() {
    return (
      <div className="unit section">
        <div></div>
        <div className="img-wrapper flex">{UnitImage(this.props.match.params.unitNumber)}</div>
        <div
          className="title"
          onClick={() => {
            this.setState({ tabIndex: UnitTab.NONE });
          }}
        >
          Unit {this.props.match.params.unitNumber}
        </div>
        <div className="tabs flex">
          {this.Tabs()}
          <a href={this.state.unitData.gDrive}><div className="tab">Google Drive</div></a>
        </div>
        {this.state.tabIndex === UnitTab.QUESTIONS && <UnitQuestions unitData={this.state.unitData} />}
      </div>
    );
  }

  private Tabs() {
    let arr = [];

    for (let i = 1; i < Object.keys(UnitTab).length / 2; i++) {
      arr.push(this.Tab(i));
    }

    return arr;
  }

  private Tab(tab: number) {
    let name = Object.keys(UnitTab)[tab + Object.keys(UnitTab).length / 2];

    return (
      <div
        key={tab.toString()}
        className={'tab' + (this.state.tabIndex === tab ? ' active' : '')}
        onClick={() => {
          this.setState({ tabIndex: tab });
          console.log(this.state.tabIndex, UnitTab.QUESTIONS, this.state.tabIndex === UnitTab.QUESTIONS);
        }}
      >
        {name.toString().charAt(0) + name.toString().toLowerCase().slice(1)}
      </div>
    );
  }
}

function UnitImage(unitNumber: any) {
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
