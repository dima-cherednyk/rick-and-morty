import React from 'react';
import { PageNavLink } from '../PageNavLink/PageNavLink';
import './Header.scss';

export const Header = () => {
  return (
    <nav className="navbar">
      <PageNavLink to="/" text="Home Page" />
      <PageNavLink to="/character" text="Characters" />
      <PageNavLink to="/episode" text="Episodes" />
      <PageNavLink to="/location" text="Locations" />
      <PageNavLink to="/my-watch-list" text="My watch list" />
    </nav>
  );
};
