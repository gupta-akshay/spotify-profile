import React from 'react';
import { Router } from '@reach/router';

import ScrollToTop from './ScrollToTop';
import Nav from './Nav';
import User from './User';
import TopArtists from './TopArtists';
import RecentlyPlayed from './RecentlyPlayed';


import '../styles/profile.scss';

const Profile = () => (
  <div className="profile-wrapper">
    <Nav />
    <Router primary={false}>
      <ScrollToTop path="/">
        <User path="/" />
        <TopArtists path="artists" />
        <RecentlyPlayed path="recent" />
      </ScrollToTop>
    </Router>
  </div>
);

export default Profile;