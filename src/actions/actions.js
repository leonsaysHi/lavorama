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
    posts: json.map(child => child)
  }
}

export function fetchPosts() {

  return dispatch => {
    dispatch(requestPosts())
    return fetch('http://lavorama.net/api/menu.json.php')
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
  }
}
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
    posts: json.map(child => child)
  }
}
export function fetchDate(date) {

  return dispatch => {
    dispatch(requestDate(date))
    return fetch(`http://lavorama.net/api/images.json.php?d=${date}`)
      .then(response => response.json())
      .then(json => dispatch(receiveDate(date, json)))
  }
}
