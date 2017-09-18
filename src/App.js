import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import * as PostAPI from './PostAPI'

import Home from './routes/Home'
import About from './routes/About'
import PostList from './routes/PostList'
import Form from './routes/Form'
import Detail from './routes/Detail'
import Header from './components/Header'

import { postAdd } from './actions'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

class App extends Component {
  state = {
    categories: []
  }

  componentDidMount = () => {
    PostAPI.getCategories().then( (data) => {
      // console.log('API.getCategories', data)
      this.setState( {categories: data} )
    })
    PostAPI.getPosts().then( (data) => {
      // console.log('API.getPosts', data)
      data.map((post)=>{
        this.props.addPost(post)
      })
    })
  }

  render = () => {
    // console.log('App.render', this.props)
    return (
      <Router>
        <div>
          <Header categories={this.state.categories}/>
          {/* Route component (Home, About) has props history, location, match */}
          <Route exact path='/' component={Home}/>
          <Route path='/about' component={About}/>
          {/* This case pass props history, location, match to PostList via {...props} */}
          <Route path='/created/:catPath?'
            render={(props) => (
              <PostList {...props}
                posts={this.props.posts.filter((post)=>(
                  post.deleted === false
                ))}
                categories={this.state.categories}
              />
            )}
          />
          <Route path='/detail/:id'
            render={(props) => (
              <Detail {...props}
               post={this.props.posts.find((post)=>(post.id===props.match.params.id))}
               categories={this.state.categories}
              />
            )}
          />
          <Route path='/write'
            render={(props) => (
              <Form {...props}
                categories={this.state.categories}
              />
            )}
          />
        </div>
      </Router>
    )
  }
}

function mapStateToProps( {post} ) {
  return {
    posts: Object.keys(post).map((key) => (
          post[key]
        ))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost : (data) => dispatch(postAdd({id: data.id, post:data})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

