import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import NotFound from '../pages/NotFound';

class Content extends React.Component {
  render() {
    return (
      <main className="content">
        <Switch>
          <Route path="/trybetunes/" exact component={ Login } />
          <Route path="/trybetunes/search" component={ Search } />
          <Route path="/trybetunes/album/:id" component={ Album } />
          <Route path="/trybetunes/profile/edit" component={ ProfileEdit } />
          <Route path="/trybetunes/profile" component={ Profile } />
          <Route path="/trybetunes/favorites" component={ Favorites } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default Content;
