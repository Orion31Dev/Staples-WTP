import React from 'react';
import '../styles/components/Header.scss';

export default function Header() {
  return (
    <div className="header">
      <a href="/">
        <div className="title">SHS We The People</div>
      </a>
      <div className="links">
        <a className="styled" href="/">Home</a>
        <div className="sep">|</div>
        <a className="styled" href="/units">Units</a>
      </div>
    </div>
  );
}
