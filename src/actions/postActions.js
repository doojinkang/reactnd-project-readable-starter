import {
    POST_ADD,
    POST_EDIT,
    POST_VOTE,
    POST_DELETE,
    POST_CONFIG
} from './types.js'

function postActionGenerator(type) {
  return function(post) {
    return {
      type,
      post
    }
  }
}

export const postAdd = postActionGenerator(POST_ADD)
export const postEdit = postActionGenerator(POST_EDIT)
export const postVote = postActionGenerator(POST_VOTE)
export const postDelete = postActionGenerator(POST_DELETE)

/*
export function postAdd (post) {
  return {
    type: POST_ADD,
    post
  }
}

export function postEdit (post) {
  return {
    type: POST_EDIT,
    post
  }
}

export function postVote (post) {
  return {
    type: POST_VOTE,
    post
  }
}

export function postDelete (post) {
  return {
    type: POST_DELETE,
    post
  }
}
*/

export function postConfig ({sortBy, order}) {
  return {
    type: POST_CONFIG,
    sortBy,
    order,
  }
}
