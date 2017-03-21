/**
 * Actions
 */

import fetch from 'isomorphic-fetch'


export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json.map(child => child),
    receivedAt: Date.now()
  }
}

export function fetchPosts() {

  // First dispatch: the app state is updated to inform
  // that the API call is starting.
  return dispatch => {
    dispatch(requestPosts())
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return fetch('http://lavorama.net/api/menu.json.php')
    // We can dispatch many times!
    // Here, we update the app state with the results of the API call.
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
    // In a real world app, you also want to
    // catch any error in the network call.
  }
}
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
export const SELECT_DATE = 'SELECT_DATE'
export const RECEIVE_DATE = 'RECEIVE_DATE'
export const REQUEST_DATE = 'REQUEST_DATE'
export function selectDate(date) {
  return {
    type: SELECT_DATE,
    date
  }
}
function requestDate(date) {
  return {
    type: REQUEST_DATE,
    date
  }
}

function receiveDate(date, json) {
  return {
    type: RECEIVE_DATE,
    date,
    posts: json.map(child => child),
    receivedAt: Date.now()
  }
}
export function fetchDate(date) {

  return dispatch => {
    dispatch(requestDate(date))
    return fetch(`images.json.php?${date}`)
      .then(response => response.json())
      .then(json => dispatch(receiveDate(date, json)))
  }
}
