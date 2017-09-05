import React, { Component } from 'react'

import * as PostAPI from '../PostAPI'

class Detail extends Component {
  state = {
    detail : {
      title: '',
      body: '',
      author: '',
      category: '',
    }
  }

  componentDidMount() {
    PostAPI.getPostDetail(this.props.match.params.id).then( (data) => {
      console.log('API.getPostDetail', data)
      this.setState( {
        ...this.state,
        detail: data
      })
    })
  }

  render() {
    const post = this.state.detail
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

      </div>
    )
  }
}

export default Detail
