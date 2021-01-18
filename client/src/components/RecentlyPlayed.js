import React, { Component } from 'react';
import { getRecentlyPlayed } from '../spotify';
import { catchErrors } from '../utils';

import Loader from './Loader';
import TrackItem from './TrackItem';

import '../styles/recentlyPlayed.scss';

class RecentlyPlayed extends Component {
  state = {
    recentlyPlayed: null,
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { data } = await getRecentlyPlayed();
    this.setState({ recentlyPlayed: data });
  }

  render() {
    const { recentlyPlayed } = this.state;

    return (
      <main className="recently-played">
        <h2>Recently Played Tracks</h2>
        <ul className="recently-played__tracks">
          {recentlyPlayed ? (
            recentlyPlayed.items.map(({ track }, i) => <TrackItem track={track} key={i} />)
          ) : (
            <Loader />
          )}
        </ul>
      </main>
    )
  }
}

export default RecentlyPlayed;
