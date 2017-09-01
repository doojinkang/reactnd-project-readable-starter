import React, { Component } from 'react'

class PostList extends Component {

  render() {
    const { posts } = this.props
    const { tag } = this.props.match.params

    return (
      <div className='container'>
        Post List
        <div>
            {tag ? tag : 'All'}
        </div>

        <table className='table table-bordered table-hover'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>vote</th>
            </tr>
          </thead>
          <tbody>
           { posts.map( (post) => (
            <tr key={post.id}>
              <td>
                { post.title }
              </td>
              <td>
                { post.author }
              </td>
              <td>
                { post.timestamp }
              </td>
              <td>
                { post.voteScore }
              </td>
            </tr>
          ))}
          </tbody>
        </table>

      </div>
    )
  }
}

export default PostList

