import React, { Component } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import {
  getPlaylist,
  getRecommendationsForTracks,
  getUser,
  createPlaylist,
  addTracksToPlaylist,
  followPlaylist,
  doesUserFollowPlaylist,
} from '../spotify';
import { catchErrors } from '../utils';

import TrackItem from './TrackItem';

import '../styles/recommendations.scss';

class Recommendations extends Component {
  static propTypes = {
    playlistId: PropTypes.string,
  };

  state = {
    playlist: null,
    recommendations: null,
    userId: null,
    isFollowing: false,
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { playlistId } = this.props;
    const { data } = await getPlaylist(playlistId);
    this.setState({ playlist: data });

    if (data) {
      const { playlist } = this.state;
      const { data } = await getRecommendationsForTracks(playlist.tracks.items);
      this.setState({ recommendations: data });
    }
  }

  getTrackUrls = recommendations => recommendations.tracks.map(({ url }) => url);

  createPlaylist = async () => {
    const { playlist } = this.state;
    const name = `Recommended Tracks Based on ${playlist.name}`;
    const { data } = await getUser();
    const userId = data.id;
    this.setState({ userId });

    if (data) {
      const { data } = await createPlaylist(userId, name);
      const recPlaylistId = data.id;
      this.setState({ recPlaylistId });

      if (data) {
        catchErrors(this.addTracksAndFollow(recPlaylistId));
      }
    }
  }

  addTracksAndFollow = async playlistId => {
    const { recommendations } = this.state;
    const uris = this.getTrackUrls(recommendations).join(',');
    const { data } = await addTracksToPlaylist(playlistId, uris);

    if (data) {
      await followPlaylist(playlistId);
      catchErrors(this.isFollowing(playlistId));
    }
  }

  isFollowing = async playlistId => {
    const { userId } = this.state;
    const { data } = await doesUserFollowPlaylist(playlistId, userId);
    this.setState({ isFollowing: data[0] });
  }

  render() {
    const { playlist, recommendations, isFollowing, recPlaylistId } = this.state;

    return (
      <div className="recommendations">
        {playlist && (
          <div className="playlist-heading">
            <h2>
              Recommended Tracks Based On{' '}
              <Link className="playlist-heading__link" to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
            </h2>
            {isFollowing && recPlaylistId ? (
              <a
                href={`https://open.spotify.com/playlist/${recPlaylistId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="playlist-heading__open"
              >
                Open in Spotify
              </a>
            ) : (
              <button
                onClick={catchErrors(this.createPlaylist)}
                className="playlist-heading__save"
              >
                Save to Spotify
              </button>
            )}
          </div>
        )}
        <ul style={{ marginTop: '50px' }}>
          {recommendations && recommendations.tracks.map((track, i) => <TrackItem track={track} key={i} />)}
        </ul>
      </div>
    )
  }
}

export default Recommendations;
