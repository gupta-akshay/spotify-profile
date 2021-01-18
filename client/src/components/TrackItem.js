import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { formatDuration } from '../utils';

import { IconInfo } from './icons';

import '../styles/trackItem.scss';

const TrackItem = ({ track }) => (
  <li className="track-item">
    <Link className="track-item__link" to={`/track/${track.id}`}>
      <div>
        <div className="track-item__artwork">
          {track.album.images.length && <img src={track.album.images[2].url} alt="Album Artwork" />}
          <div className="track-item__artwork-mask">
            <IconInfo />
          </div>
        </div>
      </div>
      <div className="track-item__meta">
        <span className="track-item__meta-left">
          {track.name && <span className="track-item__meta-name">{track.name}</span>}
          {track.artists && track.album && (
            <div className="track-item__meta-album">
              {track.artists &&
                track.artists.map(({ name }, i) => (
                  <span key={i}>
                    {name}
                    {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}&nbsp;
                  </span>
                ))}
              &nbsp;&middot;&nbsp;&nbsp;
              {track.album.name}
            </div>
          )}
        </span>
        <span className="track-item__meta-right">
          {track.duration_ms && <span className="track-item__meta-duration">{formatDuration(track.duration_ms)}</span>}
        </span>
      </div>
    </Link>
  </li>
);

TrackItem.propTypes = {
  track: PropTypes.object.isRequired,
};

export default TrackItem;
