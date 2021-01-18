import React, { Component } from 'react';
import { getTopTracksShort, getTopTracksMedium, getTopTracksLong } from '../spotify';
import { catchErrors } from '../utils';

import Loader from './Loader';
import TrackItem from './TrackItem';

import '../styles/topTracks.scss';

class TopTracks extends Component {
  state = {
    topTracks: null,
    activeRange: 'long',
  };

  apiCalls = {
    long: getTopTracksLong(),
    medium: getTopTracksMedium(),
    short: getTopTracksShort(),
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { data } = await getTopTracksLong();
    this.setState({ topTracks: data });
  }

  async changeRange(range) {
    const { data } = await this.apiCalls[range];
    this.setState({ topTracks: data, activeRange: range });
  }

  setActiveRange = range => catchErrors(this.changeRange(range));

  render() {
    const { topTracks, activeRange } = this.state;

    return (
      <main className="top-tracks-container">
        <header className="header">
          <h2>Top Tracks</h2>
          <div className="header__ranges">
            <button
              className="header__ranges-btn"
              style={{ color: `${activeRange === 'long' ? '#FFFFFF' : '#9B9B9B'}` }}
              onClick={() => this.setActiveRange('long')}
            >
              <span
                style={{ border: `${activeRange === 'long' ? '1px solid #FFFFFF' : '1px solid transparent'}` }}
              >
                All Time
              </span>
            </button>
            <button
              className="header__ranges-btn"
              style={{ color: `${activeRange === 'medium' ? '#FFFFFF' : '#9B9B9B'}` }}
              onClick={() => this.setActiveRange('medium')}
            >
              <span
                style={{ border: `${activeRange === 'medium' ? '1px solid #FFFFFF' : '1px solid transparent'}` }}
              >
                Last 6 Months
              </span>
            </button>
            <button
              className="header__ranges-btn"
              style={{ color: `${activeRange === 'short' ? '#FFFFFF' : '#9B9B9B'}` }}
              onClick={() => this.setActiveRange('short')}
            >
              <span
                style={{ border: `${activeRange === 'short' ? '1px solid #FFFFFF' : '1px solid transparent'}` }}
              >
                Last 4 Weeks
              </span>
            </button>
          </div>
        </header>
        <div className="tracks-container">
          {topTracks ? (
            topTracks.items.map((track, i) => <TrackItem track={track} key={i} />)
          ) : (
            <Loader />
          )}
        </div>
      </main>
    )
  }
}

export default TopTracks;
