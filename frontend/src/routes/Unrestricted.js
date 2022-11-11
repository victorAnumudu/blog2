import { Routes, Route } from "react-router-dom";

import { PageWrapper } from "../components/styles/PageWrappers";

import Navbar from "../components/Navbar"; // Nav Bar importation

// pages importation
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Unrestricted = () => {
  return (
    <PageWrapper>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </PageWrapper>
  );
};

export default Unrestricted;
