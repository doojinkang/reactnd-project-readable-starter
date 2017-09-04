import React, { Component } from 'react'
import { connect } from 'react-redux'

class Detail extends Component {
  render() {
    const post = this.props.posts[this.props.match.params.id]
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


function mapStateToProps(posts) {
  return {
    posts: posts
  }
}

export default connect(mapStateToProps, undefined)(Detail)
