import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import * as PostAPI from './PostAPI'

import Home from './routes/Home'
import About from './routes/About'
import PostList from './routes/PostList'
import Header from './components/Header'

import { postAdd } from './actions'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

class App extends Component {
  state = {
    tags: []
  }

  componentDidMount = () => {
    PostAPI.getTags().then( (data) => {
      console.log('API.getTags', data)
      this.setState( {tags: data} )
    })
    PostAPI.getPosts().then( (data) => {
      console.log('API.getPosts', data)
      data.map((post)=>{
        this.props.addPost(post)
      })
    })
  }

  render = () => {
    console.log('App.render', this.props.posts)
    return (
      <Router>
        <div>
          <Header tags={this.state.tags}/>
          <Route exact path='/' component={Home}/>
          <Route path='/about' component={About}/>
          <Route exact path='/created'
            render={(props) => (
              <PostList {...props} posts={this.props.posts} />
            )}
          />
          <Route path='/created/:tag'
            render={(props) => (
              <PostList {...props}
                posts={this.props.posts.filter((post)=>(post.category===props.match.params.tag))}
              />
            )}
          />
        </div>
      </Router>
    )
  }
}

function mapStateToProps(posts) {
  return {
    posts: Object.keys(posts).map((key) => (
          posts[key]
        ))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost : (data) => dispatch(postAdd(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

