import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import uuid from 'uuid'
import base64 from 'uuid-base64'

import * as PostAPI from '../PostAPI'
import { _dt } from '../lib/dateUtil'
import { sortGenerator, glyphy } from '../lib/sortUtil'

import Toast from '../components/Toast'
import * as commentActions from '../actions/commentActions'

import './style.css'

class Comment extends Component {
  state = {
    modalOpen : false,
    modalTitle : '',
    isEdit: false,
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
        isEdit: true,
        comment
      }))
    }
    else {
      this.setState(() => ({
        modalOpen: true,
        modalTitle: 'Create new comment',
        isEdit: false,
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

    if ( this.state.isEdit ) {
      PostAPI.editComment(value.id, value.timestamp,
        value.body, value.author, value.parentId).then( (data) => {
        console.log('API.editComment', data)
        this.props.editComment(data)
        this.closeModal()
      })
    }
    else {
      PostAPI.newComment(value.id, value.timestamp,
        value.body, value.author, value.parentId).then( (data) => {
        console.log('API.newComment', data)
        this.props.addComment(data)
        this.closeModal()
      })
    }
  }

  processVote = (id, option) => {
    PostAPI.voteComment(id, option).then( (data) => {
      // console.log('API.voteComment', data)
      this.props.voteComment(data)
    })
  }

  processDelete = (id) => {
    PostAPI.deleteComment(id).then( (data) => {
      // console.log('API.deleteComment', data)
      this.props.deleteComment(data)
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
    console.log('handleOrder comment', sortBy, this.props.order)
    if ( this.props.sortBy === sortBy ) {
      this.props.configComment({
          sortBy,
          order: this.props.order === 'ascending' ? 'decending' : 'ascending'
      })
    }
    else {
      this.props.configComment({
          sortBy: this.props.sortBy === 'timestamp' ? 'voteScore' : 'timestamp',
          order: 'descending'
      })
    }
  }

  render() {
    const {comments} = this.props
    comments.sort(sortGenerator(this.props.sortBy, this.props.order))

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
                { this.props.sortBy === 'timestamp' ? glyphy(this.props.order) : '' }
              </th>
              <th>
                <button className='btn-link'
                        onClick={() => this.handleOrder('voteScore')}
                > voteScore </button>
                { this.props.sortBy === 'voteScore' ? glyphy(this.props.order) : '' }
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
    sortBy: comment.config.sortBy,
    order: comment.config.order,
  }
}

export default connect(mapStateToProps, commentActions)(Comment)

