import React from 'react';
import '../styles/routes/Unit.scss';
import { IUnit, IUnitData } from 'wtp-shared';

// Sad :(
import { ReactComponent as Unit1Img } from '../images/unit1.svg';
import { ReactComponent as Unit2Img } from '../images/unit2.svg';
import { ReactComponent as Unit3Img } from '../images/unit3.svg';
import { ReactComponent as Unit4Img } from '../images/unit4.svg';
import { ReactComponent as Unit5Img } from '../images/unit5.svg';
import { ReactComponent as Unit6Img } from '../images/unit6.svg';
import { getUnitData, getUserUnit } from '../dataUtils';
import UnitQuestions from '../components/unit/UnitQuestions';
import UnitVideos from '../components/unit/UnitVideos';
import Tabs from '../components/Tabs';

import Confetti from 'react-confetti';
import Schedule from '../components/Schedule';

interface UnitProps {
  match: any;
}

enum UnitTab {
  NONE,
  QUESTIONS,
  VIDEOS,
  SCHEDULE,
}

interface UnitState {
  unitData: IUnit;
  userUnit: string | undefined;
  tabIndex: number;
}

export default class Unit extends React.Component<UnitProps, UnitState> {
  constructor(props: UnitProps) {
    super(props);

    this.state = {
      unitData: {} as IUnit,
      tabIndex: UnitTab.NONE,
      userUnit: '',
    };
  }

  async componentDidMount() {
    let key = this.props.match.params.unitNumber.toString() as keyof IUnitData;

    getUnitData().then((json) => {
      this.setState({ unitData: json[key], tabIndex: UnitTab.QUESTIONS });
    });

    this.setState({ userUnit: await getUserUnit() });
  }

  render() {
    return (
      <div className="unit section">
        {this.props.match.params.unitNumber === '3' && (
          <Confetti
            numberOfPieces={500}
            recycle={false}
            confettiSource={{ x: 0, y: -30, w: window.innerWidth, h: 20 }}
            colors={
              Date.now() % 2
                ? ['#ffffff', '#333399']
                : [
                    '#f44336',
                    '#e91e63',
                    '#9c27b0',
                    '#673ab7',
                    '#3f51b5',
                    '#2196f3',
                    '#03a9f4',
                    '#00bcd4',
                    '#009688',
                    '#4CAF50',
                    '#8BC34A',
                    '#CDDC39',
                    '#FFEB3B',
                    '#FFC107',
                    '#FF9800',
                    '#FF5722',
                    '#795548',
                  ]
            }
          />
        )}
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
          {Tabs(this.filterTabs.bind(this)(), this.state.tabIndex, (tab: number) => {
            if (this.state.unitData.topic) this.setState.bind(this)({ tabIndex: tab });
          })}
          {this.state.unitData.gDrive && (
            <a href={this.state.unitData.gDrive}>
              <div className="tab">Google Drive</div>
            </a>
          )}
        </div>
        {this.state.tabIndex === UnitTab.QUESTIONS && <UnitQuestions unitData={this.state.unitData} />}
        {this.state.tabIndex === UnitTab.VIDEOS && <UnitVideos unitData={this.state.unitData} />}
        {this.state.tabIndex === UnitTab.SCHEDULE && <Schedule />}
      </div>
    );
  }

  filterTabs() {
    let arr = [];

    let showSchedule = this.state.userUnit === this.props.match.params.unitNumber;

    for (let obj in UnitTab) {
      let num = parseInt(obj);
      if (isNaN(num)) {
        if (obj === 'SCHEDULE') {
          if (showSchedule) arr.push(obj);
        } else arr.push(obj);
      } else {
        if (UnitTab[num] === 'SCHEDULE') {
          if (showSchedule) arr.push(obj);
        } else arr.push(obj);
      }
    }

    return arr;
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
