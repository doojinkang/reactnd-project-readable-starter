import React, { Component } from 'react'

import * as PostAPI from '../PostAPI'

class Detail extends Component {
  state = {
    post : {
      title: '',
      body: '',
      author: '',
      category: '',
    },
    comments: []
  }

  componentDidMount() {
    PostAPI.getPostDetail(this.props.match.params.id).then( (data) => {
      console.log('API.getPostDetail', data)
      this.setState( {
        ...this.state,
        post: data
      })
    })

    PostAPI.getComments(this.props.match.params.id).then( (data) => {
      console.log('API.getComments', data)
      this.setState( {
        ...this.state,
        comments: data
      })
    })
  }

  render() {
    const post = this.state.post
    const comments = this.state.comments
    console.log('...', post)
    return (
      <div className='container'>

        <div className='form-group'>
          <span className = 'label label-default'> Title </span>
          <div>
            {post.title}
          </div>
        </div>
        <div className='form-group'>
          <span className = 'label label-default'> Body </span>
          <div>
            {post.body}
          </div>
        </div>
        <div className='form-group'>
          <span className = 'label label-default'> Author </span>
          <div>
            {post.author}
          </div>
        </div>
        <div className='form-group'>
          <span className = 'label label-default'> Tag </span>
          <div>
            {post.category}
          </div>
        </div>
        <div style={{marginTop:'10px'}}>
          <button className='btn btn-default'>vote</button>
        </div>

        <hr/>
        <div>
          <table className='table table-bordered table-hover'>
            <thead>
              <tr>
                <th>Comment</th>
                <th>Author</th>
                <th>Date</th>
                <th>vote</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>

          {comments.map((comment)=>(
            <tr key={ comment.id }>
              <td>
                { comment.body }
              </td>
              <td>
                { comment.author }
              </td>
              <td>
                { comment.timestamp }
              </td>
              <td>
                { comment.voteScore }
              </td>
              <td>
                <button className='btn btn-default'>vote</button>
              </td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}

export default Detail
