import React, { Component } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { getPlaylist, getAudioFeaturesForTracks } from '../spotify';
import { catchErrors } from '../utils';

import Loader from './Loader';
import TrackItem from './TrackItem';
import FeatureChart from './FeatureChart';

import '../styles/playlist.scss';

class Playlist extends Component {
  static propTypes = {
    playlistId: PropTypes.string,
  };

  state = {
    playlist: null,
    tracks: null,
    audioFeatures: null,
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
      const { data } = await getAudioFeaturesForTracks(playlist.tracks.items);
      this.setState({ audioFeatures: data });
    }
  }

  render() {
    const { playlist, audioFeatures } = this.state;

    return (
      <>
        {playlist ? (
          <div className="playlist-container">
            <div className="playlist">
              <div className="playlist__left">
                {playlist.images.length && (
                  <div className="playlist__cover">
                    <img src={playlist.images[0].url} alt="Album Art" />
                  </div>
                )}
                <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  <h3 className="playlist__name">{playlist.name}</h3>
                </a>
                <p className="playlist__owner">By {playlist.owner.display_name}</p>
                {playlist.description && (
                  <p className="playlist__description" dangerouslySetInnerHTML={{ __html: playlist.description }} />
                )}
                <p className="playlist__total-tracks">{playlist.tracks.total} Tracks</p>
                <Link className="playlist__rec-btn" to={`/recommendations/${playlist.id}`}>Get Recommendations</Link>
                {audioFeatures && (
                  <FeatureChart features={audioFeatures.audio_features} type="horizontalBar" />
                )}
              </div>
              <div className="playlist__right">
                <ul>
                  {playlist.tracks && playlist.tracks.items.map(({ track }, i) => (
                    <TrackItem track={track} key={i} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </>
    )
  }
}

export default Playlist;
