import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import * as PostAPI from '../PostAPI'
import { _dt } from '../lib/dateUtil'

import Form from './Form'
import Comment from './Comment'

import { postVote, postDelete } from '../actions/postActions'

import './style.css'

class Detail extends Component {

  state = {
    editModalOpen : false
  }

  processVote = (id, option) => {
    PostAPI.votePost(id, option).then( (data) => {
      // console.log('API.votePost', data)
      this.props.votePost(data)
    })
  }

  processDelete = (id) => {
    PostAPI.deletePost(id).then( (data) => {
      // console.log('API.deletePost', data)
      this.props.deletePost(data)
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
          <span className = 'label label-default title'> Title </span>
          {post && post.title}
        </div>
        <div className='form-group'>
          <span className = 'label label-default title'> Date </span>
          { post && _dt(post.timestamp) }
        </div>
        <div className='form-group'>
          <span className = 'label label-default title'> Body </span>
          <div className = 'body-content'>
            { post && post.body }
          </div>
        </div>
        <div className='form-group'>
          <span className = 'label label-default title'> Author </span>
          { post && post.author}
        </div>
        <div className='form-group'>
          <span className = 'label label-default title'> VoteScore </span>
          {post && post.voteScore}
        </div>
        <div className='form-group'>
          <span className = 'label label-default title'> Category </span>
          { post && post.category}
        </div>
        <div className='form-group'>
          <span className = 'label label-default title'> # of Comments </span>
          { this.props.comments.filter((comment)=>(
                  comment.parentId===this.props.match.params.id &&
                  comment.deleted === false)).length
          }
        </div>
        <hr/>
        <div>
          <button className='btn btn-default' onClick={() => this.processVote(post.id, "upVote")}>voteUp</button>
          <button className='btn btn-default' onClick={() => this.processVote(post.id, "downVote")}>voteDown</button>
          <button className='btn btn-default' onClick={() => this.openEditModal()}>Edit</button>
          <button className='btn btn-default' onClick={() => this.processDelete(post.id)}>Delete</button>
        </div>

        <hr/>

        <Comment
          comments={this.props.comments}
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

function mapStateToProps({category, comment} ) {
  return {
    categories: category.contents,
    comments: Object.keys(comment.contents).map((key) => (
          comment.contents[key]
        ))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    votePost : (data) => dispatch((postVote(data))),
    deletePost : (data) => dispatch((postDelete(data))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)

