import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './routes/Home'
import About from './routes/About'
import PostList from './routes/PostList'
import Header from './components/Header'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

class App extends Component {
  render = () => (
    <Router>
      <div>
        <Header/>
        <Route exact path='/' component={Home}/>
        <Route path='/about' component={About}/>
        <Route exact path='/created' component={PostList}/>
        <Route path='/created/:tag' component={PostList}/>
      </div>
    </Router>
  )
}

export default App

