import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: {},
      songs: [],
    };
  }

  componentDidMount() {
    this.pegarMusicas();
  }

   pegarMusicas = async () => {
     const { match: { params: { id } } } = this.props;
     const result = await getMusics(id);
     const song = result.filter((a) => a.kind === 'song');
     this.setState({
       album: result[0],
       songs: song,
     });
   }

   render() {
     const { album: { artistName, collectionName } } = this.state;
     const { songs } = this.state;
     return (
       <div data-testid="page-album">
         <Header />
         <div>
           <h3 data-testid="album-name">{ collectionName }</h3>
           <h5 data-testid="artist-name">{artistName }</h5>
           <ul>
             { songs.map((musica) => (
               <MusicCard
                 key={ musica.trackId }
                 trackId={ musica.trackId }
                 trackName={ musica.trackName }
                 previewUrl={ musica.previewUrl }
                 object={ musica }
               />

             )) }
           </ul>
         </div>
       </div>
     );
   }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Album;
