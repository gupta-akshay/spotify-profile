import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getPlaylists } from '../spotify';
import { catchErrors } from '../utils';

import Loader from './Loader';
import { IconMusic } from './icons';

import '../styles/playlists.scss';

class Playlists extends Component {
  state = {
    playlists: null,
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { data } = await getPlaylists();
    this.setState({ playlists: data });
  }
  
  render() {
    const { playlists } = this.state;

    return (
      <main className="playlists-container">
        <h2>Your Playlists</h2>
        <div className="wrapper">
          <div className="playlists">
            {playlists ? (
              playlists.items.map(({ id, images, name, tracks }, i) => (
                <div className="playlist" key={id}>
                  <Link className="playlist__cover" to={id}>
                    {images.length ? (
                      <img className="playlist_cover-img" src={images[0].url} alt="Album Art" />
                    ) : (
                      <div className="playlist_cover-placeholder">
                        <div className="playlist_cover-placeholder__content">
                          <IconMusic />
                        </div>
                      </div>
                    )}
                    <div className="playlist__mask">
                      <i className="fas fa-info-circle" />
                    </div>
                  </Link>
                  <div>
                    <Link className="playlist__name" to={id}>
                      {name}
                    </Link>
                    <div className="playlist__total">{tracks.total === 1 ? `1 Track` : `${tracks.total} Tracks`}</div>
                  </div>
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </main>
    );
  }
}

export default Playlists;