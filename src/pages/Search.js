import React from 'react';
// import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { search } = this.state;
    const minLength = 2;
    return (
      <div data-testid="page-search">
        <Header />
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
        >
          Procurar

        </button>
      </div>
    );
  }
}

export default Search;
