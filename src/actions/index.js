export const POST_ADD = 'POST_ADD'
export const POST_VOTE = 'POST_VOTE'
export const POST_DELETE = 'POST_DELETE'
export const COMMENT_ADD = 'COMMENT_ADD'
export const COMMENT_VOTE = 'COMMENT_VOTE'
export const COMMENT_DELETE = 'COMMENT_DELETE'

export function postAdd ({ id, timestamp, title, body, author, voteScore, category, deleted }) {
  return {
    type: POST_ADD,
    id,
    timestamp,
    title,
    body,
    author,
    voteScore,
    category,
    deleted
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

export function commentAdd({id, comment}) {
  return {
    type: COMMENT_ADD,
    id,
    comment
  }
}

export function commentVote ({ id, newVoteScore }) {
  return {
    type: COMMENT_VOTE,
    id,
    newVoteScore
  }
}

export function commentDelete ({id}) {
  return {
    type: COMMENT_DELETE,
    id,
  }
}
