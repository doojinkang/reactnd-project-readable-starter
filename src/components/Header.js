import React from 'react';
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = (props) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        Readable SNS
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Text>
        <Link to='/'>ALL</Link>
      </Navbar.Text>
    {props.categories && props.categories.map((category) => (
      <Navbar.Text key={category.name}>
        <Link to={`/created/${category.path}`}>{category.name}</Link>
      </Navbar.Text>
    ))}
      <Navbar.Text pullRight>
        <Link to='/about'>About</Link>
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
