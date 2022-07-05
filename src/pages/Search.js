import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      artista: '',
      resultado: [],
      clicou: false,
    };
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onButtonClick = (event) => {
    event.preventDefault();
    const { search } = this.state;
    this.setState(
      { artista: search, clicou: true },
      async () => {
        const albuns = await searchAlbumsAPI(search);
        console.log(search);
        console.log(albuns);
        this.setState(
          {
            search: '',
            resultado: [...albuns],

          },
        );
      },
    );
  }

  render() {
    const { search, artista, clicou, resultado } = this.state;
    const minLength = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>

          <input
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            type="text"
            name="search"
            value={ search }
            onChange={ this.onInputChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ search.length < minLength }
            onClick={ this.onButtonClick }
          >
            Procurar

          </button>
        </form>
        <div>
          {clicou && (
            <div>

              { resultado.length === 0 ? <h3>Nenhum álbum foi encontrado</h3>
                : (
                  <div>
                    <h3>{ `Resultado de álbuns de: ${artista}`}</h3>
                    <section>
                      { resultado.map((album, index) => (
                        <div key={ index }>
                          <Link
                            to={ `/album/${album.collectionId}` }
                            data-testid={ `link-to-album-${album.collectionId}` }
                          >
                            <img
                              src={ album.artworkUrl100 }
                              alt={ album.collectionName }
                            />
                          </Link>
                          <p>{ album.collectionName }</p>
                          <p>{ album.artistName}</p>
                        </div>
                      )) }
                    </section>
                  </div>
                )}
            </div>
          )}
        </div>

      </div>
    );
  }
}

export default Search;
