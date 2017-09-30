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

export const addPost = postActionGenerator(POST_ADD)
export const editPost = postActionGenerator(POST_EDIT)
export const votePost = postActionGenerator(POST_VOTE)
export const deletePost = postActionGenerator(POST_DELETE)

export function configPost ({sortBy, order}) {
  return {
    type: POST_CONFIG,
    sortBy,
    order,
  }
}
