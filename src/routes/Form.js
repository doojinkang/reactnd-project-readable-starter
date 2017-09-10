import React, { Component } from 'react'
import { connect } from 'react-redux'

import serializeform from 'form-serialize'
import uuid from 'uuid'
import base64 from 'uuid-base64'

import * as PostAPI from '../PostAPI'

import { postAdd } from '../actions'

class Form extends Component {
  state = {
    post: {
      title: '',
      body: '',
      author: '',
      category : ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const value = {
      id: base64.encode(uuid.v4()),
      timestamp: Date.now(),
      title: 'noname title',
      body: 'no content',
      author: 'none',
      ...serializeform(e.target, { hash: true})
    }
    if (typeof value.category === 'undefined')
      value.category = this.props.categories[0].name
      // console.log(value)
      PostAPI.newPost(value.id, value.timestamp, value.title,
                    value.body, value.author, value.category).then( (data) => {
      console.log('API.newPost', data)
      this.props.addPost(data)
      this.props.history.push('/')
    })
  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log('handleChange', name, value)
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
      <div className='container'>

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

      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost : (data) => dispatch(postAdd(data)),
  }
}

export default connect(undefined, mapDispatchToProps)(Form)
