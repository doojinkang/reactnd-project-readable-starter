import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import * as PostAPI from '../PostAPI'
import { _dt } from '../lib/dateUtil'

import Form from './Form'
import Comment from './Comment'

import { postVote, postDelete } from '../actions/postActions'

class Detail extends Component {

  state = {
    editModalOpen : false
  }

  processVote = (id, option) => {
    PostAPI.votePost(id, option).then( (data) => {
      console.log('API.votePost', data)
      const newVoteScore = data.voteScore
      this.props.votePost({id, newVoteScore})
    })
  }

  processDelete = (id) => {
    PostAPI.deletePost(id).then( (data) => {
      console.log('API.deletePost', data)
      this.props.deletePost({id})
      this.props.history.goBack()
    })
  }

  openEditModal = () => {
    console.log('openEditModal')
    this.setState(() => ({
      editModalOpen: true,
    }))
  }
  closeEditModal = () => {
    this.setState(() => ({
      editModalOpen: false,
    }))
  }

  render() {
    const post = this.props.post
    // console.log('...', post)
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
          <button className='btn btn-default' onClick={() => this.openEditModal()}>Edit</button>
          <button className='btn btn-default' onClick={() => this.processDelete(post.id)}>Delete</button>
        </div>

        <hr/>

        <Comment
          parentId={this.props.match.params.id}
        />

        <Modal bsSize='large' show={this.state.editModalOpen} onHide={this.closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {post && post.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              closeForm={this.closeEditModal}
              categories={this.props.categories}
              post={post}
            />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.closeEditModal}>Close</button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    votePost : (data) => dispatch((postVote(data))),
    deletePost : (data) => dispatch((postDelete(data))),
  }
}

export default connect(undefined, mapDispatchToProps)(Detail)

