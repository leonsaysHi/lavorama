import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
// import features from './features.reducer';

import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SELECT_DATE,
  REQUEST_DATE,
  RECEIVE_DATE
} from '../actions/actions'

function nav (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts
      })
    case REQUEST_DATE:
      return Object.assign({}, state, {
        selectedDate: action.date
      })
    default:
      return state
  }
}

function contents (state = {}, action) {
  switch (action.type) {
    // case REQUEST_DATE:
    case RECEIVE_DATE:
      return Object.assign({}, state, {
        [action.date]: action.posts
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  routing,
  // features,
  nav,
  contents
})

export default rootReducer
