import React from "react";

import { Main } from "../components/styles/PageWrappers";
import Hero from "../components/Hero";
import SectionNew from "../components/SectionNew";
//footer importation
import Footer from "../components/Footer";

const Profile = () => {
  return (
    <Main>
      <Hero />
      <SectionNew />
      <Footer />
    </Main>
  );
};

export default Profile;
