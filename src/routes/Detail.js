import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import * as PostAPI from '../PostAPI'
import { _dt } from '../lib/dateUtil'

import Form from './Form'
import Comment from './Comment'

import { postVote, postDelete, commentAdd, commentVote } from '../actions'

class Detail extends Component {

  state = {
    editModalOpen : false
  }

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
          <button className='btn btn-default' onClick={() => this.openEditModal()}>Edit</button>
          <button className='btn btn-default' onClick={() => this.processDelete(post.id)}>Delete</button>
        </div>

        <hr/>

        <Comment parentId={this.props.match.params.id}
                 comments={this.props.comments.filter(
                   (comment)=>(
                     comment.parentId===this.props.match.params.id &&
                     ( typeof comment.deleted === 'undefined' ||
                     comment.deleted === false )
                   ))}
                 voteComment={this.props.voteComment}
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
    deletePost : (data) => dispatch((postDelete(data))),
    addComment : (data) => dispatch(commentAdd(data)),
    voteComment : (data) => dispatch(commentVote(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)

