import {
    COMMENT_ADD,
    COMMENT_EDIT,
    COMMENT_VOTE,
    COMMENT_DELETE,
    COMMENT_CONFIG
} from './types.js'

function commentActionGenerator(type) {
  return function(comment) {
    return {
      type,
      comment
    }
  }
}

export const addComment = commentActionGenerator(COMMENT_ADD)
export const editComment = commentActionGenerator(COMMENT_EDIT)
export const voteComment = commentActionGenerator(COMMENT_VOTE)
export const deleteComment = commentActionGenerator(COMMENT_DELETE)

export function configComment ({sortBy, order}) {
  return {
    type: COMMENT_CONFIG,
    sortBy,
    order,
  }
}
