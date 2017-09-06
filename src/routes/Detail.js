import React, { Component } from 'react'

import * as PostAPI from '../PostAPI'

import Comment from './Comment'

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

        <Comment comments={comments}></Comment>

      </div>
    )
  }
}

export default Detail
