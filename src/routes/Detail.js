import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as PostAPI from '../PostAPI'
import { _dt } from '../lib/dateUtil'

import Comment from './Comment'

import { postVote, commentAdd, commentVote } from '../actions'

class Detail extends Component {

  componentDidMount() {
    PostAPI.getComments(this.props.match.params.id).then( (data) => {
      console.log('API.getComments', data)
      data.map((comment)=>{
        this.props.addComment(comment)
      })
    })
  }

  processVote = (id, option) => {
    PostAPI.votePost(id, option).then( (data) => {
      console.log('API.votePost', data)
      const newVoteScore = data.voteScore
      this.props.votePost({id, newVoteScore})
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
          <span className = 'label label-default'> Category </span>
          <div>
            { post && post.category}
          </div>
        </div>
        <div style={{marginTop:'10px'}}>
          <button className='btn btn-default' onClick={() => this.processVote(post.id, "upVote")}>voteUp</button>
          <button className='btn btn-default' onClick={() => this.processVote(post.id, "downVote")}>voteDown</button>
        </div>

        <hr/>

        <Comment parentId={this.props.match.params.id}
                 comments={this.props.comments.filter(
                   (comment)=>(comment.parentId===this.props.match.params.id))}
                 voteComment={this.props.voteComment}
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
    votePost : (data) => dispatch((postVote(data))),
    addComment : (data) => dispatch(commentAdd(data)),
    voteComment : (data) => dispatch(commentVote(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)

