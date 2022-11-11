import React, { useState } from "react";

import styles from "styled-components"; //style module importation
import Logo from "../assets/logo.svg"; // Nav Bar Logo

import NavLink from "./navbar/NavLink"; // Nav Link
import { useLocation } from "react-router-dom";

const Navbar = () => {
  let [toggleMenu, setToggleMenu] = useState(false); // state for toggling menu on mobile screen

  const { pathname } = useLocation();

  let onLinkClick = (e) => {
   
    // checking to see if user is on mobile screen and removes menu options from screen
    if (toggleMenu) {
      onToggleMenu();
    }
  };

  //function to CHANGE THE STATE OF TOGGLE MENU
  let onToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  //function to reset the toggle menu to default on screen resize
  window.onresize = () => {
    if (toggleMenu) {
      onToggleMenu();
    }
  };
  return (
    <Nav>
      <NavLogo src={Logo} alt="Logo Img" />
      <NavToggler onClick={onToggleMenu}>
        <NavTogglerBar1 toggle={toggleMenu} />
        <NavTogglerBar2 toggle={toggleMenu} />
      </NavToggler>
      <NavLinks ontoggle={toggleMenu}>
        <NavLink
          path="/"
          name="Home"
          active={pathname === "/"}
          onclick={onLinkClick}
        />
        <NavLink
          path="/login"
          name="Login"
          active={pathname === "/login"}
          onclick={onLinkClick}
        />
        <NavLink
          path="/signup"
          name="Signup"
          active={pathname === "/signup"}
          onclick={onLinkClick}
        />
      </NavLinks>
    </Nav>
  );
};

export default Navbar;

//style fro NAV COMPONENT

const Nav = styles.nav`
background-color: #fff;
max-width: 2000px;
margin: auto;
padding: 5px 30px;
display: flex;
justify-content: space-between;
align-items: center;
position: fixed;
z-index: 9;
top: 0;
left: 0;
right: 0;
margin-bottom: 10px;
@media screen and (max-width:568px) {
  & {
    display: block;
  }
}
`;

//style fro NAV LOGO COMPONENT
const NavLogo = styles.img`
  width: 50px;
`;

//style fro NAV LINKS COMPONENT
const NavLinks = styles.div`
display: flex;
justify-content: space-between;
align-items: center;
@media screen and (max-width:568px) {
  & {
    display: block;
    position: absolute;
    top: 100%;
    left: ${({ ontoggle }) => (ontoggle ? "0" : "-100%")};
    width: 50%;
    height: 100vh;
    transition: left .5s;
    background-color: #000;
  }
}
`;

//style fro NAV TOGGLE COMPONENT
const NavToggler = styles.div`
width: 35px;
height: 35px;
position: absolute;
top: 20%;
right: 30px;
transform: translate(0%, -5%);
display: none;
cursor: pointer;
@media screen and (max-width:568px) {
  & {
    display: block;
  }
}
`;

//style fro NAV TOGGLE COMPONENT
const NavTogglerBar1 = styles.div`
  height: 5px;
  background-color: #000;
  margin-top: ${({ toggle }) => (toggle ? "15px" : "10px")};
  transform: ${({ toggle }) => (toggle ? "rotate(-45deg)" : "rotate(0deg)")};
  transition: all .3s;
`;

const NavTogglerBar2 = styles.div`
  height: 5px;
  background-color: #000;
  margin-top: ${({ toggle }) => (toggle ? "-3px" : "5px")};
  transform: ${({ toggle }) => (toggle ? "rotate(45deg)" : "rotate(0deg)")};
  transition: all .3s;
`;
