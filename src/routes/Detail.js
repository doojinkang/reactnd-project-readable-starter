import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as PostAPI from '../PostAPI'

import Comment from './Comment'

import { commentAdd } from '../actions'

class Detail extends Component {
  state = {
    post : {
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
        post: data
      })
    })

    PostAPI.getComments(this.props.match.params.id).then( (data) => {
      console.log('API.getComments', data)
      data.map((comment)=>{
        this.props.addComment(comment)
      })
    })
  }

  render() {
    const post = this.state.post
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

        <Comment parentId={this.props.match.params.id}
                 comments={this.props.comments.filter(
                   (comment)=>(comment.parentId===this.props.match.params.id))}
        />
      </div>
    )
  }
}

function mapStateToProps( {comment} ) {
  return {
    comments: Object.keys(comment).map((key) => (
          comment[key]
        ))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment : (data) => dispatch(commentAdd(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)

