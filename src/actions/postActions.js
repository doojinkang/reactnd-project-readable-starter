import { POST_ADD, POST_VOTE, POST_DELETE
       } from './types.js'

export function postAdd ({ id, post }) {
  return {
    type: POST_ADD,
    id,
    post
  }
}

export function postVote ({ id, newVoteScore }) {
  return {
    type: POST_VOTE,
    id,
    newVoteScore
  }
}

export function postDelete ({id}) {
  return {
    type: POST_DELETE,
    id,
  }
}
