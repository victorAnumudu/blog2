import React, { useState, useEffect } from "react";
import { AuthContext } from "../AuthorizationContext";
import styles from "styled-components"; //style module importation
import Logo from "../assets/logo.svg"; // Nav Bar Logo

import NavLink from "./navbar/NavLink"; // Nav Link

const NavbarProfile = () => {
  let [toggleMenu, setToggleMenu] = useState(false); // state for toggling menu on mobile screen
  let [userImage, setUserImage] = useState(Logo);

  //hook to update userImage
  useEffect(() => {
    let getUser = async () => {
      let res = fetch("https://carton.onrender.com/auth/user", {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      let result = await res;
      let response = await result.json();
      if (response.status) {
        setUserImage(response.message.image);
      }
    };
    getUser();
  }, [userImage]);

  const { logout } = AuthContext(); // function to log user out

  let [active, setActive] = useState([
    { name: "blog", value: true },
    { name: "post", value: false },
    { name: "logout", value: false },
  ]); // state for adding active class on links

  let onLinkClick = (e) => {
    let name = e.target.name.toLowerCase();
    setActive((prev) => {
      return prev.map((item) =>
        item.name == name ? { ...item, value: true } : { ...item, value: false }
      );
    });

    // checking to see if user is on mobile screen and removes menu options from screen
    if (toggleMenu) {
      onToggleMenu();
    }

    // logging user out if user clicks on logout
    if (name == "logout") {
      setTimeout(() => {
        logout();
      }, 500);
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
      <NavLogo src={userImage} alt="Logo Img" />
      <NavToggler onClick={onToggleMenu}>
        <NavTogglerBar1 toggle={toggleMenu} />
        <NavTogglerBar2 toggle={toggleMenu} />
      </NavToggler>
      <NavLinks ontoggle={toggleMenu}>
        <NavLink
          path="/profile"
          name="Blog"
          active={active[0].value}
          onclick={onLinkClick}
        />
        <NavLink
          path="/post"
          name="Post"
          active={active[1].value}
          onclick={onLinkClick}
        />
        <NavLink
          path="/signup"
          name="Logout"
          active={active[2].value}
          onclick={onLinkClick}
        />
      </NavLinks>
    </Nav>
  );
};

export default NavbarProfile;

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
  border-radius: 50%;
  box-shadow: 0px 0px 3px #000;
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
