import React, { useState, useEffect } from "react";

import { Main } from "../components/styles/PageWrappers";

import Hero from "../components/Hero"; // HERO SECTION IMPORT
import SectionNew from "../components/SectionNew";

//footer importation
import Footer from "../components/Footer";

const Home = () => {
  let [posts, setPosts] = useState([]);

  return (
    <Main>
      <Hero />
      <SectionNew />
      <Footer />
    </Main>
  );
};

export default Home;
