import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Header = (props) => (
  <Navbar default collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        Readable SNS
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <MenuItem>
          <NavLink to='/'>Home</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to='/about'>About</NavLink>
        </MenuItem>
        <NavDropdown title="Tags" id="basic-nav-dropdown">
        {props.tags.map((tag) => (
          <MenuItem key={tag.name}>
            <NavLink to={`/created/${tag.path}`}>{tag.name}</NavLink>
          </MenuItem>
        ))}
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
