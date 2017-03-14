import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { fetchPosts } from '../actions/actions'
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();
const middlewares = [
  thunkMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware);
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)

// store.dispatch(selectedSubreddit('reactjs'))
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
)

export default () => store
