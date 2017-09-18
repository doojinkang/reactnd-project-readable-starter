import React, { Component } from 'react'
import { connect } from 'react-redux'

import uuid from 'uuid'
import base64 from 'uuid-base64'

import * as PostAPI from '../PostAPI'

import Toast from '../components/Toast'
import { postAdd } from '../actions'

class Form extends Component {
  state = {
    isEditMode : false,
    post: {}
  }

  componentDidMount() {
    // setState in constructor causes the Warning and not work at all
    // Warning: setState(...): Can only update a mounted or mounting component.
    // This usually means you called setState() on an unmounted component.
    // This is a no-op. Please check the code for the Form component.
    if (this.props.post) {
      this.setState(() => ({
        isEditMode : true,
        post: this.props.post
      }))
    }
    else {
      this.setState(() => ({
        isEditMode : false,
        post: {
          title : '',
          body : '',
          author : '',
          category : '',
          // id, timestamp is set on handleSubmit
          // deleted, voteScore is set on server
        }
      }))
    }
    // console.log('componentDidMount', this.state)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const value = {
      id: base64.encode(uuid.v4()),
      timestamp: Date.now(),
      ...this.state.post
    }
    if (value.title.trim() === '') {
      this.toast.show('Message', 'Enter Title')
      return
    }
    if (value.body.trim() === '') {
      this.toast.show('Message', 'Enter Body')
      return
    }
    if (value.author.trim() === '') {
      this.toast.show('Message', 'Enter Author')
      return
    }
    if (value.category === '') {
      this.toast.show('Message', 'Select Category')
      return
      // value.category = this.props.categories[0].name
    }
    // console.log(value)

    if ( this.state.isEditMode ) {
      PostAPI.editPost(value.id, value.timestamp, value.title,
                       value.body, value.author, value.category).then( (data) => {
        // console.log('API.editPost', data)
        this.props.addPost(data)
        this.props.closeForm()
      })
    }
    else {
      PostAPI.newPost(value.id, value.timestamp, value.title,
                      value.body, value.author, value.category).then( (data) => {
        // console.log('API.newPost', data)
        this.props.addPost(data)
        this.props.history.push('/')
      })
    }
  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    // console.log('handleChange', name, value)
    this.setState(() => ({
      ...this.state,
      'post' : {
        ...this.state['post'],
        [name] : value
      }
    }))
  }

  render() {
    const post = this.state.post

    return (
      <div className={this.state.isEditMode ? 'container-fluid' : 'container'}>

        <div>
          Mode : {this.state.isEditMode? 'Edit': 'Create'}
        </div>

        <form action='' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <span className = 'label label-default'> Title </span>
            <input type='text' className='form-control' name='title'
                value={post && post.title}
                onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <span className = 'label label-default'> Body </span>
            <textarea className='form-control' name='body' rows='5'
                value={post && post.body}
                onChange={this.handleChange}
            />
          </div>
          <div className='form-inline'>
            <span className = 'label label-default' style={{marginRight:'20px'}}> Author </span>
            <input type='text' className='form-control' name='author'
                value={post && post.author}
                onChange={this.handleChange}
            />
            <span className = 'label label-default' style={{margin:'0 20px 0 50px'}}> Category </span>
            <select
                name='category'
                value={post.category}
                onChange={this.handleChange} >
                <option value='' disabled> Select </option>
            {
              this.props.categories.map((category) => (
                <option key={category.name} value={category.name}> {category.name} </option>
              ))
            }
            </select>
          </div>
          <div style={{marginTop:'10px'}}>
            <button className='btn btn-default'>Submit</button>
            <span style={{marginLeft: '10px'}}>
              <a href='javascript:history.back()'>Cancel</a>
            </span>
          </div>
        </form>

        <Toast onRef={ref => (this.toast = ref)}/>

      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost : (data) => dispatch(postAdd({id: data.id, post:data})),
  }
}

export default connect(undefined, mapDispatchToProps)(Form)
