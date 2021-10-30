import React from 'react';
import '../styles/components/Tabs.scss';

export default function Tabs(keys: any[], tabIndex: number, onClick: Function, isEnum = true) {
  let arr = [];

  let max = isEnum ? keys.length / 2 : keys.length;
  let sub = isEnum ? 1 : 0;

  for (let i = sub; i < max; i++) {
    arr.push(Tab({ tab: i, keys, onClick, tabIndex, isEnum }));
  }

  return arr;
}

export function Tab(props: { tab: number; keys: any[]; onClick: Function; tabIndex: number; isEnum: boolean }) {
  let name = props.isEnum ? props.keys[props.tab + props.keys.length / 2] : props.keys[props.tab];

  return (
    <div
      key={props.tab}
      className={'tab' + (props.tabIndex === props.tab ? ' active' : '')}
      onClick={() => {
        props.onClick(props.tab);
      }}
    >
      {props.isEnum
        ? name
            .split('_')
            .map((word: string) => {
              return word[0] + word.toLowerCase().substring(1);
            })
            .join(' ')
        : name}
    </div>
  );
}
