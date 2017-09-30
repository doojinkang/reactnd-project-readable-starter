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

export const commentAdd = commentActionGenerator(COMMENT_ADD)
export const commentEdit = commentActionGenerator(COMMENT_EDIT)
export const commentVote = commentActionGenerator(COMMENT_VOTE)
export const commentDelete = commentActionGenerator(COMMENT_DELETE)

/*
export function commentAdd(comment) {
  return {
    type: COMMENT_ADD,
    comment
  }
}

export function commentEdit(comment) {
  return {
    type: COMMENT_EDIT,
    comment
  }
}

export function commentVote (comment) {
  return {
    type: COMMENT_VOTE,
    comment
  }
}

export function commentDelete (comment) {
  return {
    type: COMMENT_DELETE,
    comment
  }
}
*/

export function commentConfig ({sortBy, order}) {
  return {
    type: COMMENT_CONFIG,
    sortBy,
    order,
  }
}
