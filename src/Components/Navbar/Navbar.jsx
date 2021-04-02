import {NavLink} from "react-router-dom";
import {Nav} from "react-bootstrap";
import style from "./Navbar.module.css";

const navLinks = [
  {
    to: "/",
    value: "Home"
  },
  {
    to: "/Contact",
    value: "Contact"
  },
  {
    to: "/about",
    value: "About"
  }
]

function Navbar(){

  const navLinksJSX = navLinks.map((item, index) => {
    return (
      <Nav.Item key={index}>
        <NavLink 
          to={item.to}
          className="nav-link" 
          activeClassName={style.activeNavLink} 
          exact={true}
          >
            {item.value}
        </NavLink>
      </Nav.Item>
    )
  })

  return (
    <Nav className={style.nav}>
      {navLinksJSX}
    </Nav>
  )
}

export default Navbar;