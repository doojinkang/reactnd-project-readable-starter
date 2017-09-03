import React, { Component } from 'react'

class Form extends Component {
  state = {
    tagValue : ''
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

        <form action='' method='post'>
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
          </div>
        </form>

      </div>
    )
  }
}

export default Form
