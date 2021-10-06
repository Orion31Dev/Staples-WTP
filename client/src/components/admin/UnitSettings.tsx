import React, { useEffect } from 'react';
import EmailList from '../EmailList';
import unitData from '../unit/unit_data.json';

export default function UnitSettings(props: { unitNum: string }) {
  const [emails, setEmails] = React.useState(unitData[props.unitNum as keyof typeof unitData].members as string[] || ([] as string[]));

  useEffect(() => {
    setEmails(unitData[props.unitNum as keyof typeof unitData].members as string[] || ([] as string[]));
  }, [props.unitNum]);

  console.log(unitData[props.unitNum as keyof typeof unitData].members, emails);

  return (
    <div className="unit-settings">
      <div className="section-header">Members</div>
      <EmailList list={emails} setList={setEmails}></EmailList>
    </div>
  );
}
