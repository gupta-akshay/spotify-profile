import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getTopArtistsShort, getTopArtistsMedium, getTopArtistsLong } from '../spotify';
import { catchErrors } from '../utils';

import { IconInfo } from './icons';
import Loader from './Loader';

import '../styles/topArtists.scss';

class TopArtists extends Component {
  state = {
    topArtists: null,
    activeRange: 'long',
  }

  apiCalls = {
    long: getTopArtistsLong(),
    medium: getTopArtistsMedium(),
    short: getTopArtistsShort(),
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { data } = await getTopArtistsLong();
    this.setState({ topArtists: data });
  }

  async changeRange(range) {
    const { data } = await this.apiCalls[range];
    this.setState({ topArtists: data, activeRange: range });
  }

  setActiveRange = range => catchErrors(this.changeRange(range));

  render() {
    const { topArtists, activeRange } = this.state;

    return (
      <main className="top-artists-container">
        <header className="header">
          <h2>Top Artists</h2>
          <div className="header__ranges">
            <button
              className="header__ranges-btn"
              styles={{ color: `${activeRange === 'long' ? '#FFFFFF' : '#9B9B9B'}` }}
              onClick={() => this.setActiveRange('long')}
            >
              <span
                styles={{ color: `${activeRange === 'long' ? '1px solid #FFFFFF' : '1px solid transparent'}` }}
              >
                All Time
              </span>
            </button>
            <button
              className="header__ranges-btn"
              styles={{ color: `${activeRange === 'medium' ? '#FFFFFF' : '#9B9B9B'}` }}
              onClick={() => this.setActiveRange('medium')}
            >
              <span
                styles={{ color: `${activeRange === 'medium' ? '1px solid #FFFFFF' : '1px solid transparent'}` }}
              >
                Last 6 Months
              </span>
            </button>
            <button
              className="header__ranges-btn"
              styles={{ color: `${activeRange === 'short' ? '#FFFFFF' : '#9B9B9B'}` }}
              onClick={() => this.setActiveRange('short')}
            >
              <span
                styles={{ color: `${activeRange === 'short' ? '1px solid #FFFFFF' : '1px solid transparent'}` }}
              >
                Last 4 Weeks
              </span>
            </button>
          </div>
        </header>
        <div className="artists-container">
          {topArtists ? (
            topArtists.items.map(({ id, external_urls, images, name }, i) => (
              <div className="artist" key={id}>
                <Link className="artist__artwork" to={`/artist/${id}`}>
                  {images.length && <img src={images[1].url} alt="Artist" />}
                  <div className="artist__artwork-mask">
                    <IconInfo />
                  </div>
                </Link>
                <a className="artist__name" href={external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </main>
    );
  }
}

export default TopArtists;
