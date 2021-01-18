import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getUserInfo, logout } from '../spotify';
import { catchErrors } from '../utils';

import { IconUser, IconInfo } from './icons';
import Loader from './Loader';
import TrackItem from './TrackItem';

import '../styles/user.scss';

class User extends Component {
  state = {
    user: null,
    followedArtists: null,
    playlists: null,
    topArtists: null,
    topTracks: null,
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { user, followedArtists, playlists, topArtists, topTracks } = await getUserInfo();
    this.setState({ user, followedArtists, playlists, topArtists, topTracks });
  }

  render() {
    const { user, followedArtists, playlists, topArtists, topTracks } = this.state;
    const totalPlaylists = playlists ? playlists.total : 0;

    return (
      <>
        {user ? (
          <main className="main-container">
            <header className="header">
              <div className="avatar">
                {user.images.length > 0 ? (
                  <img src={user.images[0].url} alt="avatar" />
                ) : (
                  <div className="avatar__no">
                    <IconUser />
                  </div>
                )}
              </div>
              <a href={user.external_urls.spotify} className="username" target="_blank" rel="noopener noreferrer">
                <h1 className="username__name">{user.display_name}</h1>
              </a>
              <div className="stats">
                <div className="stat">
                  <div className="number">{user.followers.total}</div>
                  <p className="num-label">Followers</p>
                </div>
                {followedArtists && (
                  <div className="stat">
                    <div className="number">{followedArtists.artists.items.length}</div>
                    <p className="num-label">Following</p>
                  </div>
                )}
                {totalPlaylists && (
                  <div className="stat">
                    <Link to="playlists">
                      <div className="number">{totalPlaylists}</div>
                      <p className="num-label">Playlists</p>
                    </Link>
                  </div>
                )}
              </div>
              <a className="logout" onClick={logout}>Logout</a>
            </header>
            
            <section className="preview">
              <div className="tracklist">
                <div className="tracklist__heading">
                  <h3>Top Artists of All Time</h3>
                  <Link className="tracklist__more" to="/artists">
                    See More
                  </Link>
                </div>
                <div>
                  {topArtists ? (
                    <ul>
                      {topArtists.items.slice(0, 10).map((artist, i) => (
                        <li key={i} className="artist">
                          <Link className="artist__artwork" to={`/artist/${artist.id}`}>
                            {artist.images.length && (
                              <img src={artist.images[2].url} alt="Artist" />
                            )}
                            <div className="artist__artwork-mask">
                              <IconInfo />
                            </div>
                          </Link>
                          <Link className="artist__name" to={`/artist/${artist.id}`}>
                            <span>{artist.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>

              <div className="tracklist">
                <div className="tracklist__heading">
                  <h3>Top Tracks of All Time</h3>
                  <Link className="tracklist__more" to="/tracks">
                    See More
                  </Link>
                </div>
                <ul>
                  {topTracks ? (
                    topTracks.items.slice(0, 10).map((track, i) => <TrackItem track={track} key={i} />)
                  ) : (
                    <Loader />
                  )}
                </ul>
              </div>
            </section>
          </main>
        ) : <Loader />}
      </>
    );
  }
}

export default User;
