import React, { useEffect } from 'react';
import EmailList from '../EmailList';
import { getUnitData } from '../unit/UnitData';

export default function UnitSettings(props: { unitNum: string }) {
  const [emails, setEmails] = React.useState([] as string[]);

  useEffect(() => {
    async function fetchData() {
      let data = await getUnitData();
      setEmails(data[props.unitNum].members);
    }

    fetchData();
  }, [props.unitNum]);

  // useEffect(() => {
  //   setEmails((unitData[props.unitNum as keyof typeof unitData].members as string[]) || ([] as string[]));
  // }, [props.unitNum]);

  return (
    <div className="unit-settings">
      <div className="section-header">Members</div>
      <EmailList list={emails} setList={setEmails}></EmailList>
    </div>
  );
}
