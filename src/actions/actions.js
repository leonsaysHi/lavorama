/**
 * Actions
 */

import fetch from 'isomorphic-fetch'

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.map(child => child),
    receivedAt: Date.now()
  }
}

export function fetchPosts(subreddit) {

  // First dispatch: the app state is updated to inform
  // that the API call is starting.
  return dispatch => {
    dispatch(requestPosts(subreddit))
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return fetch(`http://lavorama.net/api/menu.json.php?${subreddit}`)
    // We can dispatch many times!
    // Here, we update the app state with the results of the API call.
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json)))
    // In a real world app, you also want to
    // catch any error in the network call.
  }
}
