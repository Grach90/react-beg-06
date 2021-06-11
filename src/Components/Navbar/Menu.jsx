import React from "react";
import {Link} from 'react-router-dom';
import style from './menu.module.css';
import { InputGroup, Nav, Navbar } from "react-bootstrap";
import logo from "./logo.svg";
import { connect } from "react-redux";
import types from '../../Redux/actionTypes';

const Menu = ({isAuthenticated, logout, userInfo}) => {
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className={style.navbar} >
      <Navbar.Brand className={style.brand} as={Link} to="/">
        <img
        src={logo}
        className={style.Applogo}
          alt=""
          width="50"
          height="50"
        />
        React
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse style={{'fontSize':'20px'}} id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/contact" style={{color: 'white'}}>Contact</Nav.Link>
          <Nav.Link as={Link} to="/about" style={{color: 'white'}}>About</Nav.Link>
        </Nav>
        {!isAuthenticated && <InputGroup className={style.InputGroup}>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </InputGroup>}
        {isAuthenticated && <InputGroup className={style.InputGroup}>
          <Nav.Link  onClick={() => logout()} >Logout</Nav.Link>
          <p style={{color: 'white'}}>{userInfo}</p>
        </InputGroup>}
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.globalState.isAuthenticated,
    userInfo: state.globalState.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({type: types.LOG_OUT})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
