import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import {Grid, Row, Col } from 'react-bootstrap'

import { _dt } from '../lib/dateUtil'

class PostList extends Component {

  render() {
    const { posts } = this.props
    const { tag } = this.props.match.params

    return (
      <div className='container'>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} xsOffset={6}>
              <strong>Tag : {tag ? tag : 'All'}</strong>
            </Col>
            <Col xs={6} xsOffset={10}>
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
              <th>Date</th>
              <th>vote</th>
            </tr>
          </thead>
          <tbody>
           { posts.map( (post) => (
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

export default PostList

