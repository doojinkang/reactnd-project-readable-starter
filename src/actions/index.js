export const POST_ADD = 'POST_ADD'
export const COMMENT_ADD = 'COMMENT_ADD'

export function postAdd ({ id, timestamp, title, body, author, voteScore, category }) {
  return {
    type: POST_ADD,
    id,
    timestamp,
    title,
    body,
    author,
    voteScore,
    category
  }
}

export function commentAdd({ id, parentId, timestamp, body, author, voteScore}) {
  return {
    type: COMMENT_ADD,
    id,
    parentId,
    timestamp,
    body,
    author,
    voteScore
  }
}
