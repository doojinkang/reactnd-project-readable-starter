import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import uuid from 'uuid'
import base64 from 'uuid-base64'

import * as PostAPI from '../PostAPI'
import { _dt } from '../lib/dateUtil'
import { sortGenerator, glyphy } from '../lib/sortUtil'

import Toast from '../components/Toast'
import { commentAdd, commentVote, commentDelete } from '../actions/commentActions'

import './style.css'

class Comment extends Component {
  state = {
    modalOpen : false,
    modalTitle : '',
    sortBy: 'timestamp',  // or 'voteScore'
    order: 'descending',  // or 'ascending'
    comment: {}
  }

  componentDidMount() {
    PostAPI.getComments(this.props.parentId).then( (data) => {
      // console.log('API.getComments', data)
      data.map((comment)=>{
        this.props.addComment(comment)
      })
    })
  }

  openModal = (comment) => {
    console.log('openModal', comment)
    if ( typeof comment !== 'undefined') {
      this.setState(() => ({
        modalOpen: true,
        modalTitle: 'Edit comment ' + comment.id,
        comment
      }))
    }
    else {
      this.setState(() => ({
        modalOpen: true,
        modalTitle: 'Create new comment',
        comment: {
          body: '',
          author: '',
          parentId: this.props.parentId
          // id, timestamp is set on handleSubmit
          // deleted, parentDeleted, voteScore is set on server
        }
      }))
    }
  }

  closeModal = () => {
    this.setState(() => ({
      modalOpen: false,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const value = {
      id: base64.encode(uuid.v4()),
      timestamp: Date.now(),
      ...this.state.comment
    }
    if (value.body.trim() === '') {
      this.toast.show('Message', 'Enter Comment')
      return
    }
    if (value.author.trim() === '') {
      this.toast.show('Message', 'Enter Author')
      return
    }
    // console.log(value)

    if ( typeof comment !== 'undefined') {
      PostAPI.editComment(value.id, value.timestamp,
        value.body, value.author, value.parentId).then( (data) => {
        // console.log('API.editComment', data)
        this.props.addComment(data)
        this.closeModal()
      })
    }
    else {
      PostAPI.newComment(value.id, value.timestamp,
        value.body, value.author, value.parentId).then( (data) => {
        // console.log('API.newComment', data)
        this.props.addComment(data)
        this.closeModal()
      })
    }
  }

  processVote = (id, option) => {
    PostAPI.voteComment(id, option).then( (data) => {
      console.log('API.voteComment', data)
      const newVoteScore = data.voteScore
      this.props.voteComment({id, newVoteScore})
    })
  }

  processDelete = (id) => {
    PostAPI.deleteComment(id).then( (data) => {
      console.log('API.deleteComment', data)
      this.props.deleteComment({id})
    })
  }


  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    // console.log('handleChange', name, value)
    this.setState(() => ({
      ...this.state,
      'comment' : {
        ...this.state['comment'],
        [name] : value
      }
    }))
  }

  handleOrder(sortBy) {
    // console.log('handleOrder', sortBy, this.state.order)
    if ( this.state.sortBy === sortBy ) {
      this.setState(() => ({
        order: this.state.order === 'ascending' ? 'decending' : 'ascending',
      }))
    }
    else {
      this.setState(() => ({
        sortBy: this.state.sortBy === 'timestamp' ? 'voteScore' : 'timestamp',
        order: 'descending'
      }))
    }
  }

  render() {
    const {comments} = this.props
    comments.sort(sortGenerator(this.state.sortBy, this.state.order))

    return (
      <div>
        <table className='table table-bordered table-hover'>
          <thead>
            <tr>
              <th>Comment</th>
              <th>Author</th>
              <th>
                <button className='btn-link'
                        onClick={() => this.handleOrder('timestamp')}
                > Date </button>
                { this.state.sortBy === 'timestamp' ? glyphy(this.state.order) : '' }
              </th>
              <th>
                <button className='btn-link'
                        onClick={() => this.handleOrder('voteScore')}
                > voteScore </button>
                { this.state.sortBy === 'voteScore' ? glyphy(this.state.order) : '' }
              </th>
            </tr>
          </thead>
          <tbody>

        {comments.filter((comment)=>(
                  comment.parentId===this.props.parentId &&
                  comment.deleted === false))
                  .map((comment)=>(
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
              <button className='btn btn-default' onClick={() => this.openModal(comment)}>Edit</button>
              <button className='btn btn-default' onClick={() => this.processDelete(comment.id)}>Delete</button>
            </td>
          </tr>
        ))}
          </tbody>
        </table>

        <div>
          <button className='btn btn-default' onClick={() => this.openModal()}>Create Comment</button>
        </div>


    <Modal bsSize='large' show={this.state.modalOpen} onHide={this.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{this.state.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action='' onSubmit={this.handleSubmit}>
          <div className='form-inline'>
            <span className = 'label label-default title'> Comment </span>
            <input type='text' className='form-control title' name='body'
                    value={this.state.comment.body}
                    onChange={this.handleChange}
            />
            <span className = 'label label-default title'> Author </span>
            <input type='text' className='form-control title' name='author'
                    value={this.state.comment.author}
                    onChange={this.handleChange}
            />
            <button className='btn btn-default'>Submit</button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={this.closeModal}>Close</button>
      </Modal.Footer>
    </Modal>

      <Toast onRef={ref => (this.toast = ref)}/>

      </div>
    );
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
    addComment : (data) => dispatch(commentAdd({id: data.id, comment:data})),
    voteComment : (data) => dispatch(commentVote(data)),
    deleteComment : (data) => dispatch(commentDelete(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)

