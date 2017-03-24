import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Root from './containers/root';
import Home from './containers/home';
import Posts from './containers/posts';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route path="/:date" component={Posts} />
  </Route>
);
