import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      checked: false,
      // favoritas: [],
    };
  }

  componentDidMount() {
    this.pegarFavoritas();
  }

  favoriteSong = () => {
    const { object } = this.props;
    this.setState({ loading: false },
      async () => {
        await addSong(object);
        this.setState(() => ({
          loading: true,
          checked: true,
        }));
      });
  }

  // notFavoriteSong = () => {
  //   const { object } = this.props;
  //   this.setState({ loading: false },
  //     async () => {
  //       await removeSong(object);
  //       this.setState((prevState) => ({
  //         loading: true,
  //         checked: !prevState.checked,
  //       }));
  //     });
  // }

  pegarFavoritas = async () => {
    const { trackId } = this.props;
    const favoritas = await getFavoriteSongs();
    this.setState({ checked: favoritas.some((a) => a.trackId === trackId) });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        { loading ? (

          <li>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ `${previewUrl}` } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              name={ trackName }
              checked={ checked }
              onChange={ this.favoriteSong }
            />

          </li>
        ) : <Loading /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  object: PropTypes.string.isRequired,
};

export default MusicCard;
