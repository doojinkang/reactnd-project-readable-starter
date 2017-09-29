import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {Grid, Row, Col } from 'react-bootstrap'

import { _dt } from '../lib/dateUtil'
import { sortGenerator, glyphy } from '../lib/sortUtil'

class PostList extends Component {
  state = {
    sortBy: 'timestamp',  // or 'voteScore'
    order: 'descending',  // or 'ascending'
  }

  nameByPath(path) {
    const { categories } = this.props
    const theCategory = categories.find((category) => (category.path===path))
    // console.log('nameByPath', path, theCategory)
    return theCategory ? theCategory.name : path
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
    const { posts, categories } = this.props
    const { catPath } = this.props.match.params
    const filteredPost = catPath ?
          posts.filter((post)=>(post.category===this.nameByPath(catPath))) :
          posts
    filteredPost.sort(sortGenerator(this.state.sortBy, this.state.order))

    return (
      <div className='container'>
        <Grid>
          <Row className="show-grid">
            <Col xs={8}>
            </Col>
            <Col xs={2}>
              <strong>Category : {catPath ? this.nameByPath(catPath) : 'All'}</strong>
            </Col>
            <Col xs={2}>
              <Link to='/write'>Submit a Story</Link>
            </Col>
          </Row>
        </Grid>
        <br />

        <table className='table table-bordered table-hover'>
          <thead>
            <tr>
              <th>Title</th>
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
          { filteredPost.map( (post) => (
            <tr key={post.id}>
              <td>
                <Link to={`/detail/${post.id}`}>{ post.title }</Link>
              </td>
              <td>
                { post.author }
              </td>
              <td>
                { _dt(post.timestamp) }
              </td>
              <td>
                { post.voteScore }
              </td>
            </tr>
          ))}
          </tbody>
        </table>

      </div>
    )
  }
}

function mapStateToProps({category} ) {
  return {
    categories: category.contents,
  }
}

export default connect(mapStateToProps, undefined)(PostList)

