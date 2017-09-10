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
        <NavDropdown title="Categories" id="basic-nav-dropdown">
        {props.categories.map((category) => (
          <MenuItem key={category.name}>
            <NavLink to={`/created/${category.path}`}>{category.name}</NavLink>
          </MenuItem>
        ))}
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
