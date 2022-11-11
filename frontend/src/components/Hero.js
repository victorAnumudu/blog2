import React from "react";

import Styles from "styled-components";
import { Overlay } from "./styles/Overlay"; // Overlay style component
import HeroImg from "../assets/hero.jpg"; // Hero image

const Hero = () => {
  return (
    <HeroWrapper>
      <Overlay />
      <HeroImage src={HeroImg} alt="landing Image" />
      <HeroText>
        <HeroTitle>Welcome to Gates</HeroTitle>
        <HeroDescription>
          Get the latest news on your favourite mangas, anime and manhwa around
          the world!
        </HeroDescription>
      </HeroText>
    </HeroWrapper>
  );
};

export default Hero;

//style for HERO WRAPPER
const HeroWrapper = Styles.div`
position: relative;
// height: 500px;
`;

//style for HERO Image
const HeroImage = Styles.img`
    width: 100%;
    display: block;
    min-height: 200px;
    max-height: 700px;
`;

//style for HERO TEXT
const HeroText = Styles.div`
   position: absolute;
   z-index: 1;
   top: 50%;
   transform: translate(0, -50%);
   width: 60%;
   min-width: 400px;
   padding: 20px;
   color: #fff;
   @media screen and (max-width:568px){
    & {
        min-width: 100%;
    }
   }
`;

//style for HERO TEXT TITLE
const HeroTitle = Styles.h1`
   font-size: 3rem;
   margin-bottom: 10px;
   text-shadow: 0px 0px 20px #000;
   @media screen and (max-width:568px){
    & {
        font-size: 1.5rem;
    }
   }
`;

//style for HERO TEXT TITLE
const HeroDescription = Styles.p`
   font-size: 1.5rem;
   text-shadow: 0px 0px 20px #000;
   @media screen and (max-width:568px){
    & {
        font-size: 1.2rem;
    }
   }
`;
