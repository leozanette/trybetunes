import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/Content';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <header>
          <h1>TrybeTunes</h1>
        </header>
        <Content />
      </BrowserRouter>
    );
  }
}

export default App;
