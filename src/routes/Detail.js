import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as PostAPI from '../PostAPI'
import { _dt } from '../lib/dateUtil'

import Comment from './Comment'

import { commentAdd } from '../actions'

class Detail extends Component {

  componentDidMount() {
    PostAPI.getComments(this.props.match.params.id).then( (data) => {
      console.log('API.getComments', data)
      data.map((comment)=>{
        this.props.addComment(comment)
      })
    })
  }

  render() {
    const post = this.props.post
    console.log('...', post)
    return (
      <div className='container'>

        <div className='form-group'>
          <span className = 'label label-default'> Title </span>
          <div>
            {post && post.title}
            <span style={{marginLeft: '20px'}}>
              { post && _dt(post.timestamp) }
            </span>
          </div>
        </div>
        <div className='form-group'>
          <span className = 'label label-default'> Body </span>
          <div>
            { post && post.body}
          </div>
        </div>
        <div className='form-group'>
          <span className = 'label label-default'> Author </span>
          <div>
            { post && post.author}
          </div>
        </div>
        <div className='form-group'>
          <span className = 'label label-default'> VoteScore </span>
          <div>
            {post && post.voteScore}
          </div>
        </div>
        <div className='form-group'>
          <span className = 'label label-default'> Tag </span>
          <div>
            { post && post.category}
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

