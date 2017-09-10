import React, { Component } from 'react'
import { connect } from 'react-redux'

import serializeform from 'form-serialize'
import uuid from 'uuid'
import base64 from 'uuid-base64'

import * as PostAPI from '../PostAPI'

import { postAdd } from '../actions'

class Form extends Component {
  state = {
    categoryValue : ''
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

  // constructor(props) {
  //   super(props)
  //   const defaultCategory = props.categories[2].name
  //   this.state = {
  //     categoryValue : defaultCategory
  //   }
  // }

  handleCategoryValue = (e) => {
    const category = e.target.value
    // console.log(category)
    this.setState(() => ({
      categoryValue: category
    }))
    // console.log(this.getState())
  }

  render() {
    return (
      <div className='container'>

        <form action='' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <span className = 'label label-default'> Title </span>
            <input type='text' className='form-control' name='title'/>
          </div>
          <div className='form-group'>
            <span className = 'label label-default'> Body </span>
            <textarea className='form-control' name='body' rows='5'/>
          </div>
          <div className='form-inline'>
            <span className = 'label label-default' style={{marginRight:'20px'}}> Author </span>
            <input type='text' className='form-control' name='author'/>
            <span className = 'label label-default' style={{margin:'0 20px 0 50px'}}> Category </span>
            <select
                    name='category'
                    value={this.state.categoryValue}
                    onChange={this.handleCategoryValue}>
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
