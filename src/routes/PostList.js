import React from 'react'

const PostList = ({match}) => {
  return (
    <div className='container'>
      Post List
      <div>
        {match.params.tag ? match.params.tag : 'All'}
      </div>
    </div>
  )
}

export default PostList