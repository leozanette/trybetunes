import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      usuario: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.pegarUsuario();
  }

  componentDidUpdate() {
    this.pegarUsuario();
  }

  async pegarUsuario() {
    const user = await getUser();
    console.log(user);
    this.setState({
      usuario: user,
      loading: true,
    });
  }

  render() {
    const { usuario, loading } = this.state;
    return (

      <header data-testid="header-component">
        <div>
          <h1>TrybeTunes</h1>
        </div>
        <div>

          <h2 data-testid="header-user-name">{ loading ? usuario.name : <Loading /> }</h2>
          <nav>
            <Link to="/trybetunes/search" data-testid="link-to-search">Pesquisar</Link>
            <Link
              to="/trybetunes/favorites"
              data-testid="link-to-favorites"
            >
              Favoritas

            </Link>
            <Link to="/trybetunes/profile" data-testid="link-to-profile">Perfil</Link>
          </nav>
        </div>

      </header>
    );
  }
}

export default Header;
