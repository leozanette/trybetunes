import React from 'react';
// import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      login: '',
      loading: true,
      redirect: false,
    };
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  clickLogin = (event) => {
    const { login } = this.state;
    event.preventDefault();
    this.setState({ loading: false },
      async () => {
        await createUser({ name: login });
        this.setState({
          loading: true,
          redirect: true });
      });
  }

  render() {
    const { login, loading, redirect } = this.state;
    const minLength = 3;
    if (redirect) return (<Redirect to="/search" />);
    return (
      <div data-testid="page-login">
        { loading
          ? (
            <form>
              <label htmlFor="login">
                Nome
                <input
                  type="text"
                  name="login"
                  data-testid="login-name-input"
                  value={ login }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                disabled={ login.length < minLength }
                type="submit"
                data-testid="login-submit-button"
                onClick={ this.clickLogin }
              >
                Entrar

              </button>
            </form>
          )
          : <Loading />}
      </div>
    );
  }
}

export default Login;
