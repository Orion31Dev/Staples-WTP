import React, { useEffect, useState } from 'react';
import DraftStatuses from 'wtp-shared/DraftStatusInterfaces';
import { getDraftStatuses, updateDraftStatuses } from '../dataUtils';
import '../styles/components/DraftStatusTable.scss';

const statusNames = ['Needs Work', 'Ok; More Work To Do', 'Close', 'Even Closer', 'Done!'];

export default function DraftStatusTable(props: { admin?: boolean }) {
  const [data, setData] = useState({} as DraftStatuses);
  const [adminCurrentUnit, setAdminCurrentUnit] = useState(undefined as number | undefined);
  const [adminCurrentCell, setAdminCurrentCell] = useState(undefined as number | undefined);

  useEffect(() => {
    getDraftStatuses().then(setData);
  }, []);

  function placeQuestion() {
    function placeQuestion(i: number) {
      let newData = { ...data };
      newData[adminCurrentUnit?.toString() as keyof DraftStatuses][`q${i}` as keyof DraftStatuses['1']] = adminCurrentCell as number;

      setData(newData);

      updateDraftStatuses(newData);

      setAdminCurrentUnit(undefined);
      setAdminCurrentCell(undefined);
    }

    return (
      <div className="place-question flex">
        <div className="label">
          Which question goes in "{statusNames[adminCurrentCell as number]}" for Unit {adminCurrentUnit}
        </div>
        <div className="q1" onClick={() => placeQuestion(1)}>
          Q1
        </div>
        <div className="q2" onClick={() => placeQuestion(2)}>
          Q2
        </div>
        <div className="q3" onClick={() => placeQuestion(3)}>
          Q3
        </div>
      </div>
    );
  }

  function generateUnitRows() {
    let arr = [];

    for (let i = 1; i <= 6; i++) {
      if (!data || !data[i.toString() as keyof DraftStatuses]) {
        arr.push(<tr key={i}></tr>);
        continue;
      }

      arr.push(
        <tr key={i}>
          <td className={`unit unit-${i}`}>Unit {i}</td>
          {generateUnitRow(i)}
        </tr>
      );
    }

    return arr;
  }

  function generateUnitRow(unit: number) {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        <td
          key={i}
          onClick={() => {
            if (props.admin) {
              setAdminCurrentUnit(unit);
              setAdminCurrentCell(i);
            }
          }}
        >
          {data[unit.toString() as keyof DraftStatuses].q1 === i && <div className="q1">Q1</div>}
          {data[unit.toString() as keyof DraftStatuses].q2 === i && <div className="q2">Q2</div>}
          {data[unit.toString() as keyof DraftStatuses].q3 === i && <div className="q3">Q3</div>}
        </td>
      );
    }

    return arr;
  }

  return (
    <div className={`draft-status-table flex${props.admin ? ' admin' : ''}`}>
      {typeof adminCurrentCell !== 'undefined' && typeof adminCurrentUnit !== 'undefined' && placeQuestion()}
      <table>
        <thead>
          <tr>
            <th>Unit</th>
            <th>{statusNames[0]}</th>
            <th>{statusNames[1]}</th>
            <th>{statusNames[2]}</th>
            <th>{statusNames[3]}</th>
            <th>{statusNames[4]}</th>
          </tr>
        </thead>
        <tbody>{generateUnitRows()}</tbody>
      </table>
    </div>
  );
}
