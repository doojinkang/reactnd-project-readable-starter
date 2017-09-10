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
      console.log('API.getCategories', data)
      this.setState( {categories: data} )
    })
    PostAPI.getPosts().then( (data) => {
      console.log('API.getPosts', data)
      data.map((post)=>{
        this.props.addPost(post)
      })
    })
  }

  nameByPath = (path) => {
    const theCategory = this.state.categories.find((category) => (category.path===path))
    return theCategory.name
  }

  render = () => {
    console.log('App.render', this.props.posts)
    return (
      <Router>
        <div>
          <Header categories={this.state.categories}/>
          <Route exact path='/' component={Home}/>
          <Route path='/about' component={About}/>
          <Route exact path='/created'
            render={(props) => (
              <PostList {...props} posts={this.props.posts} />
            )}
          />
          <Route path='/created/:category'
            render={(props) => (
              <PostList {...props}
                posts={this.props.posts.filter(
                  (post)=>(post.category===this.nameByPath(props.match.params.category))
                )}
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

function mapStateToProps( {post, comment} ) {
  return {
    posts: Object.keys(post).map((key) => (
          post[key]
        ))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost : (data) => dispatch(postAdd(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

