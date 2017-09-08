import React, { Component } from 'react';
import { connect } from 'react-redux'

import serializeform from 'form-serialize'
import uuid from 'uuid'
import base64 from 'uuid-base64'

import * as PostAPI from '../PostAPI'
import { _dt } from '../lib/dateUtil'

import { commentAdd } from '../actions'

class Comment extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const value = {
      id: base64.encode(uuid.v4()),
      timestamp: Date.now(),
      body: 'no content',
      author: 'none',
      parentId: this.props.parentId,
      ...serializeform(e.target, { hash: true})
    }
    console.log(value)
    PostAPI.newComment(value.id, value.timestamp,
                    value.body, value.author, value.parentId).then( (data) => {
      console.log('API.newComment', data)
      this.props.addComment(data)
    })
  }

  processVote = (id, option) => {
    PostAPI.voteComment(id, option).then( (data) => {
      console.log('API.voteComment', data)
      const newVoteScore = data.voteScore
      this.props.voteComment({id, newVoteScore})
    })
  }

  render() {
    const {comments} = this.props
    return (
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
              { _dt(comment.timestamp) }
            </td>
            <td>
              { comment.voteScore }
            </td>
            <td>
              <button className='btn btn-default' onClick={() => this.processVote(comment.id, 'upVote')}>voteUp</button>
              <button className='btn btn-default' onClick={() => this.processVote(comment.id, 'downVote')}>voteDown</button>
            </td>
          </tr>
        ))}
          </tbody>
        </table>

        <form action='' onSubmit={this.handleSubmit}>
          <div className='form-inline'>
            <span className = 'label label-default' style={{marginRight:'10px'}}> Author </span>
            <input type='text' className='form-control' style={{marginRight:'20px'}} name='author'/>
            <span className = 'label label-default' style={{marginRight:'10px'}}> Comment </span>
            <input type='text' className='form-control' style={{marginRight:'20px'}} name='body'/>
            <button className='btn btn-default'>Submit</button>
          </div>
        </form>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment : (data) => dispatch(commentAdd(data)),
  }
}

export default connect(undefined, mapDispatchToProps)(Comment)

