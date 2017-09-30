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

import { addPost } from './actions/postActions'
import { addCategory } from './actions/categoryActions'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

class App extends Component {

  componentDidMount = () => {
    PostAPI.getCategories().then( (data) => {
      // console.log('API.getCategories', data)
      this.props.addCategory(data)
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
          <Header categories={this.props.categories}/>
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
              />
            )}
          />
          <Route path='/detail/:id'
            render={(props) => (
              <Detail {...props}
               post={this.props.posts.find((post)=>(post.id===props.match.params.id))}
              />
            )}
          />
          <Route path='/write' component={Form}/>
        </div>
      </Router>
    )
  }
}

function mapStateToProps( {post, category} ) {
  return {
    posts: Object.keys(post.contents).map((key) => (
          post.contents[key]
        )),
    categories: category.contents,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost : (data) => dispatch(addPost(data)),
    addCategory : (data) => dispatch(addCategory(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

