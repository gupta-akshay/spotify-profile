import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { formatWithCommas, catchErrors } from '../utils';
import { getArtist, followArtist, doesUserFollowArtist } from '../spotify';

import Loader from './Loader';
import { mixins, theme } from '../styles';

import '../styles/artist.scss';

const { colors } = theme;
const FollowButton = styled.button`
  ${mixins.greenButton};
  margin-top: 50px;
  padding: 12px 50px;
  background-color: ${props => (props.isFollowing ? 'transparent' : colors.green)};
  border: 1px solid ${props => (props.isFollowing ? 'white' : 'transparent')};
  pointer-events: ${props => (props.isFollowing ? 'none' : 'auto')};
  cursor: ${props => (props.isFollowing ? 'default' : 'pointer')};
  &:hover,
  &:focus {
    background-color: ${props => (props.isFollowing ? 'transparent' : colors.offGreen)};
  }
`;

class Artist extends Component {
  static propTypes = {
    artistId: PropTypes.string,
  };

  state = {
    artist: null,
    isFollowing: null,
  };

  componentDidMount() {
    catchErrors(this.getData());
    catchErrors(this.isFollowing());
  }

  async getData() {
    const { artistId } = this.props;
    const { data } = await getArtist(artistId);
    this.setState({ artist: data });
  }

  isFollowing = async () => {
    const { artistId } = this.props;
    const { data } = await doesUserFollowArtist(artistId);
    this.setState({ isFollowing: data[0] });
  };

  follow = async () => {
    const { artistId } = this.props;
    await followArtist(artistId);
    this.isFollowing();
  };

  render() {
    const { artist, isFollowing } = this.state;

    return (
      <>
        {artist ? (
          <div className="artist-container">
            <div className="artwork">
              <img src={artist.images[0].url} alt="Artist Artwork" />
            </div>
            <div>
              <h1 className="artist-name">{artist.name}</h1>
              <div classNames="stats">
                <div className="stat">
                  <div className="number">{formatWithCommas(artist.followers.total)}</div>
                  <p className="number-label">Followers</p>
                </div>
                {artist.genres && (
                  <div className="stat">
                    <div className="number">
                      {artist.genres.map(genre => (
                        <div style={{ fontSize: '20px' }} key={genre}>{genre}</div>
                      ))}
                    </div>
                    <p className="number-label">Genres</p>
                  </div>
                )}
                {artist.popularity && (
                  <div className="stat">
                    <div className="number">{artist.popularity}%</div>
                    <p className="number-label">Popularity</p>
                  </div>
                )}
              </div>
            </div>
            <FollowButton isFollowing={isFollowing} onClick={catchErrors(this.follow)}>
              {isFollowing ? 'Following' : 'Follow'}
            </FollowButton>
          </div>
        ) : (
          <Loader />
        )}
      </>
    )
  }
}

export default Artist;
