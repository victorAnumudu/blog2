import React from "react";
import { Routes, Route } from "react-router-dom";

import { PageWrapper } from "../components/styles/PageWrappers";

import { AuthContext } from "../AuthorizationContext";

// restricted routes
import NavbarProfile from "../components/NavbarProfile";
import Profile from "../pages/Profile";
import Post from "../pages/Post";
import Edit from "../pages/Edit";
import Delete from "../pages/Delete";

//unrestricted routes
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Restricted = () => {
  let { isLoggedIn } = AuthContext();
  return (
    <PageWrapper>
      {isLoggedIn ? <NavbarProfile /> : <Navbar />}
      {isLoggedIn ? (
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<Post />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/delete/:id" element={<Delete />} />
          <Route path="*" element={<Profile />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Home />} />
        </Routes>
      )}
    </PageWrapper>
  );
};

export default Restricted;
