import React from 'react';
import { Router } from '@reach/router';

import ScrollToTop from './ScrollToTop';
import Nav from './Nav';
import User from './User';
import TopArtists from './TopArtists';
import RecentlyPlayed from './RecentlyPlayed';
import TopTracks from './TopTracks';
import Playlists from './Playlists';
import Playlist from './Playlist';
import Recommendations from './Recommendations';
import Artist from './Artist';
import Track from './Track';

import '../styles/profile.scss';

const Profile = () => (
  <div className="profile-wrapper">
    <Nav />
    <Router primary={false}>
      <ScrollToTop path="/">
        <User path="/" />
        <TopArtists path="artists" />
        <RecentlyPlayed path="recent" />
        <TopTracks path="tracks" />
        <Playlists path="playlists" />
        <Playlist path="playlists/:playlistId" />
        <Recommendations path="recommendations/:playlistId" />
        <Artist path="artist/:artistId" />
        <Track path="track/:trackId" />
      </ScrollToTop>
    </Router>
  </div>
);

export default Profile;