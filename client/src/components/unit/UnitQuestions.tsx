import { IUnit } from 'wtp-shared';
import '../../styles/components/unit/UnitQuestions.scss';

export default function UnitQuestions(props: { unitData: IUnit }) {
  return (
    <div className="questions">
      <div className="question">
        {props.unitData.questions[0].main}
        <ul className="sub">
          <li>{props.unitData.questions[0].sub[0]}</li>
          <li>{props.unitData.questions[0].sub[1]}</li>
        </ul>
      </div>
      <div className="question">
        {props.unitData.questions[1].main}
        <ul className="sub">
          <li>{props.unitData.questions[1].sub[0]}</li>
          <li>{props.unitData.questions[1].sub[1]}</li>
        </ul>
      </div>
      <div className="question">
        {props.unitData.questions[2].main}
        <ul className="sub">
          <li>{props.unitData.questions[2].sub[0]}</li>
          <li>{props.unitData.questions[2].sub[1]}</li>
        </ul>
      </div>
    </div>
  );
}
