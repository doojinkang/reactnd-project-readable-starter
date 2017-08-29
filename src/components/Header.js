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
        <NavDropdown eventKey={3} title="Tags" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>
            <NavLink to='/created/react'>React</NavLink>
          </MenuItem>
          <MenuItem eventKey={3.2}>
            <NavLink to='/created/redux'>Redux</NavLink>
          </MenuItem>
          <MenuItem eventKey={3.3}>
            <NavLink to='/created/relay'>Relay</NavLink>
          </MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
