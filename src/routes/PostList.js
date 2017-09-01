import React, { Component } from 'react'
import { connect } from 'react-redux'

import { postAdd } from '../actions'

class PostList extends Component {

  render() {
    const { posts } = this.props
    console.log('render ', posts)

    return (
      <div className='container'>
        Post List
        <div>
          {this.props.match.params.tag ? this.props.match.params.tag : 'All'}
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
            <tr>
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

function mapStateToProps(posts) {
  return {
    posts: Object.keys(posts).map((key) => (
          posts[key]
        ))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost : (data) => dispatch(postAdd(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)

