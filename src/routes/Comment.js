import React, { Component } from 'react';

class Comment extends Component {
  render() {
    const {comments} = this.props
    return (
      <div>
        <table className='table table-bordered table-hover'>
          <thead>
            <tr>
              <th>Comment</th>
              <th>Author</th>
              <th>Date</th>
              <th>vote</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>

        {comments.map((comment)=>(
          <tr key={ comment.id }>
            <td>
              { comment.body }
            </td>
            <td>
              { comment.author }
            </td>
            <td>
              { comment.timestamp }
            </td>
            <td>
              { comment.voteScore }
            </td>
            <td>
              <button className='btn btn-default'>vote</button>
            </td>
          </tr>
        ))}
          </tbody>
        </table>

        <div className='form-inline'>
          <span className = 'label label-default' style={{marginRight:'10px'}}> Author </span>
          <input type='text' className='form-control' style={{marginRight:'20px'}} name='author'/>
          <span className = 'label label-default' style={{marginRight:'10px'}}> Comment </span>
          <input type='text' className='form-control' style={{marginRight:'20px'}} name='Comment'/>
          <button className='btn btn-default'>Comment</button>
        </div>

      </div>
    );
  }
}

export default Comment;