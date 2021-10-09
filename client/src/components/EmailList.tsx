import React from 'react';
import '../styles/components/EmailList.scss';

export default function EmailList(props: { list: string[]; setList: (list: string[]) => void }) {
  const [inputVal, setInputVal] = React.useState('');

  function addEmail() {
    if (inputVal.length > 0) {
      props.setList([...props.list, inputVal]);
      setInputVal('');
    }
  }

  return (
    <div className="email-list">
      <div className="list">
        {props.list.map((email) => (
          <EmailListEntry
            key={email}
            email={email}
            onClick={() => {
              props.setList(props.list.filter((e) => e !== email));
            }}
          />
        ))}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addEmail();
          }}
        />
        <div className="button" onClick={addEmail}>
          Add
        </div>
      </div>
    </div>
  );
}

function EmailListEntry(props: { email: string; onClick: React.MouseEventHandler<HTMLDivElement> }) {
  return (
    <div className="email" onClick={props.onClick}>
      {props.email}
    </div>
  );
}
