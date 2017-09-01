export const POST_ADD = 'POST_ADD'

export function postAdd ({ title, body, owner, category }) {
  return {
    type: POST_ADD,
    title,
    body,
    owner,
    category
  }
}

// id - UUID should be fine, but any unique id will work
// timestamp - timestamp in whatever format you like, you can use Date.now() if you like
// title - String
// body - String
// owner - String
// category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
