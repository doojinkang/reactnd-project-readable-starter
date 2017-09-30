import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {Grid, Row, Col } from 'react-bootstrap'

import { _dt } from '../lib/dateUtil'
import { sortGenerator, glyphy } from '../lib/sortUtil'

import { configPost } from '../actions/postActions'

class PostList extends Component {
  nameByPath(path) {
    const { categories } = this.props
    const theCategory = categories.find((category) => (category.path===path))
    // console.log('nameByPath', path, theCategory)
    return theCategory ? theCategory.name : path
  }

  handleOrder(sortBy) {
    console.log('handleOrder', sortBy, this.props.order)
    if ( this.props.sortBy === sortBy ) {
      this.props.configPost({
          sortBy,
          order: this.props.order === 'ascending' ? 'decending' : 'ascending'
      })
    }
    else {
      this.props.configPost({
          sortBy: this.props.sortBy === 'timestamp' ? 'voteScore' : 'timestamp',
          order: 'descending'
      })
    }
  }


  render() {
    const { posts, categories } = this.props
    const { catPath } = this.props.match.params
    const filteredPost = catPath ?
          posts.filter((post)=>(post.category===this.nameByPath(catPath))) :
          posts
    filteredPost.sort(sortGenerator(this.props.sortBy, this.props.order))

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

function mapStateToProps({post, category} ) {
  return {
    sortBy: post.config.sortBy,
    order: post.config.order,
    categories: category.contents,
  }
}

export default connect(mapStateToProps, {configPost})(PostList)

