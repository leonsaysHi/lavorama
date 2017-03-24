import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { fetchPosts, fetchDate } from './actions/actions'
import storeConfig from './store';

import routes from './routes';
import './assets/styles/main.css';

const store = storeConfig();
store.dispatch(fetchPosts());

const history = syncHistoryWithStore(browserHistory, store);

browserHistory.listen( location =>  {
  store.dispatch(fetchDate(location.pathname.substring(1)));
});
// https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root'),
);
