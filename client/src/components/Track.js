import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDuration, getYear, parsePitchClass, catchErrors } from '../utils';
import { getTrackInfo } from '../spotify';

import Loader from './Loader';
import FeatureChart from './FeatureChart';

import '../styles/track.scss';

class Track extends Component {
  static propTypes = {
    trackId: PropTypes.string,
  };

  state = {
    track: null,
    audioAnalysis: null,
    audioFeatures: null,
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { trackId } = this.props;
    const { track, audioAnalysis, audioFeatures } = await getTrackInfo(trackId);
    this.setState({ track, audioAnalysis, audioFeatures });
  }

  render() {
    const { track, audioAnalysis, audioFeatures } = this.state;

    return (
      <>
        {track ? (
          <div className="track-container">
            <div className="track">
              <div className="track__artwork">
                <img src={track.album.images[0].url} alt="Album Artwork" />
              </div>
              <div className="track__info">
                <h1 className="track__info-name">{track.name}</h1>
                <h2 className="track__info-artist">
                  {track.artists &&
                    track.artists.map(({ name }, i) => (
                      <span key={i}>
                        {name}
                        {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}
                        &nbsp;
                      </span>
                    ))}
                </h2>
                <h3 className="track__info-album">
                  <a
                    href={track.album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer">
                    {track.album.name}
                  </a>{' '}
                  &middot; {getYear(track.album.release_date)}
                </h3>
                <a
                  className="track__info-play"
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Play on Spotify
                </a>
              </div>
            </div>

            {audioFeatures && audioAnalysis && (
              <div className="audio-features">
                <div className="features">
                  <div className="feature">
                    <h4 className="feature-text">{formatDuration(audioFeatures.duration_ms)}</h4>
                    <p className="feature-label">Duration</p>
                  </div>
                  <div className="feature">
                    <h4 className="feature-text">{parsePitchClass(audioFeatures.key)}</h4>
                    <p className="feature-label">Key</p>
                  </div>
                  <div className="feature">
                    <h4 className="feature-text">{audioFeatures.mode === 1 ? 'Major' : 'Minor'}</h4>
                    <p className="feature-label">Modality</p>
                  </div>
                  <div className="feature">
                    <h4 className="feature-text">{audioFeatures.time_signature}</h4>
                    <p className="feature-label">Time Signature</p>
                  </div>
                  <div className="feature">
                    <h4 className="feature-text">{Math.round(audioFeatures.tempo)}</h4>
                    <p className="feature-label">Tempo (BPM)</p>
                  </div>
                  <div className="feature">
                    <h4 className="feature-text">{track.popularity}%</h4>
                    <p className="feature-label">Popularity</p>
                  </div>
                  <div className="feature">
                    <h4 className="feature-text">{audioAnalysis.bars.length}</h4>
                    <p className="feature-label">Bars</p>
                  </div>
                  <div className="feature">
                    <h4 className="feature-text">{audioAnalysis.beats.length}</h4>
                    <p className="feature-label">Beats</p>
                  </div>
                  <div className="feature">
                    <h4 className="feature-text">{audioAnalysis.sections.length}</h4>
                    <p className="feature-label">Sections</p>
                  </div>
                  <div className="feature">
                    <h4 className="feature-text">{audioAnalysis.segments.length}</h4>
                    <p className="feature-label">Segments</p>
                  </div>
                </div>
                <FeatureChart features={audioFeatures} type="" />
                <a
                  className="desc-link"
                  href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Full Description of Audio Features
                </a>
              </div>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

export default Track;
