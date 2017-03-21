import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
// import features from './features.reducer';

import {
  LOCATION_CHANGE,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SELECT_DATE,
  REQUEST_DATE,
  RECEIVE_DATE
} from '../actions/actions'


function selectedDate(state = '??', action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return action.payload.pathname
    default:
      return state
  }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function imagesByDate(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DATE:
    case REQUEST_DATE:
      return Object.assign({}, state, {
        [action.date]: posts(state[action.date], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  routing,
  // features,
  imagesByDate,
  selectedDate,
  posts
})

export default rootReducer
