import React, { useEffect, useState } from 'react';
import AuthButton from '../oauth/AuthButton';
import { HasAdminAccess as hasAdminAccess } from '../routes/Admin';
import '../styles/components/Header.scss';

export default function Header() {
  let [isAdmin, setIsAdmin] = useState(false);

  function updateAdmin() {
    hasAdminAccess().then(setIsAdmin);
  }

  useEffect(() => {
    updateAdmin();
  }, []);

  return (
    <div className="header">
      <a href="/">
        <div className="title">SHS We The People</div>
      </a>
      <div className="links">
        <a className="styled" href="/">
          Home
        </a>
        <div className="sep">|</div>
        <a className="styled" href="/units">
          Units
        </a>
        <div className="sep">|</div>
        <a className="styled" href="https://docs.google.com/document/d/15uexFKp_Kgawl1AXJ48_33_2207Nf91gYJbFLpKfUfU/edit">
          Calendar
        </a>
        <div className="sep">|</div>
        <a className="styled" href="/draft-statuses">
          Draft Statuses
        </a>
        {isAdmin && <div className="sep">|</div> /* Why did have to to write this twice lol */}
        {isAdmin && (
          <a href="/admin" className="styled">
            Admin
          </a>
        )}
      </div>
      <AuthButton onSuccess={updateAdmin} styleAsLink={false} />
    </div>
  );
}
