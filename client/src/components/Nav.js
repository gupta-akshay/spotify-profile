import React from 'react';
import { Link } from '@reach/router';

import {
  IconSpotify,
  IconUser,
  IconTime,
  IconMicrophone,
  IconPlaylist,
  IconMusic,
  IconGithub,
} from './icons';

import '../styles/nav.scss';

const isActive = ({ isCurrent }) => (isCurrent ? { className: 'active' } : null);

const NavLink = props => <Link getProps={isActive} {...props} />;

const Nav = () => (
  <nav className="nav-container">
    <div className="logo">
      <Link to="/">
        <IconSpotify />
      </Link>
    </div>
    <ul className="menu">
      <li className="menu-item">
        <NavLink to="/">
          <IconUser />
          <div>Profile</div>
        </NavLink>
      </li>
      <li className="menu-item">
        <NavLink to="artists">
          <IconMicrophone />
          <div>Top Artists</div>
        </NavLink>
      </li>
      <li className="menu-item">
        <NavLink to="tracks">
          <IconMusic />
          <div>Top Tracks</div>
        </NavLink>
      </li>
      <li className="menu-item">
        <NavLink to="recent">
          <IconTime />
          <div>Recent</div>
        </NavLink>
      </li>
      <li className="menu-item">
        <NavLink to="playlists">
          <IconPlaylist />
          <div>Playlists</div>
        </NavLink>
      </li>
    </ul>
    <div className="github">
      <a
        href="https://github.com/gupta-akshay"
        target="_blank"
        rel="noopener noreferrer">
        <IconGithub />
      </a>
    </div>
  </nav>
);

export default Nav;
