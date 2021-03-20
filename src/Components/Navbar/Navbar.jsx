import {NavLink} from "react-router-dom";
import {Nav} from "react-bootstrap";
import style from "./Navbar.module.css";

function Navbar(){
  return (
    <Nav>
      <Nav.Item>
        <NavLink 
          to="/" 
          className="nav-link" 
          activeClassName={style.activeNavLink} 
          exact={true}
          > Home 
          </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink 
          to="/contact" 
          className="nav-link" 
          activeClassName={style.activeNavLink} 
          exact={true}
          > Contact 
          </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink 
          to="/about" 
          className="nav-link" 
          activeClassName={style.activeNavLink} 
          exact={true}
          > About 
          </NavLink>
      </Nav.Item>
    </Nav>
  )
}

export default Navbar;