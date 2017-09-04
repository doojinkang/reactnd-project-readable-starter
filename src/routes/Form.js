import React, { Component } from 'react'
import serializeform from 'form-serialize'
import uuid from 'uuid'
import base64 from 'uuid-base64'

class Form extends Component {
  state = {
    tagValue : ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const value = {
      ...serializeform(e.target, { hash: true}),
      id: base64.encode(uuid.v4()),
      timestamp: Date.now()
    }
    console.log(value)
    // if (this.props.onCreateContact)
    //   this.props.onCreateContact(value)
  }

  // constructor(props) {
  //   super(props)
  //   const defaultTag = props.tags[2].name
  //   this.state = {
  //     tagValue : defaultTag
  //   }
  // }

  handleTagValue = (e) => {
    const tag = e.target.value
    // console.log(tag)
    this.setState(() => ({
      tagValue: tag
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
            <span className = 'label label-default' style={{margin:'0 20px 0 50px'}}> Tag </span>
            <select
                    name='tag'
                    value={this.state.tagValue}
                    onChange={this.handleTagValue}>
                <option value='' disabled> Select </option>
            {
              this.props.tags.map((tag) => (
                <option key={tag.name} value={tag.name}> {tag.name} </option>
              ))
            }
            </select>
          </div>
          <div style={{marginTop:'10px'}}>
            <button className='btn btn-default'>Submit</button>
            <span style={{marginLeft: '10px'}}>
              <a href='#' onclick='window.history.back()'>Cancel</a>
            </span>
          </div>
        </form>

      </div>
    )
  }
}

export default Form
