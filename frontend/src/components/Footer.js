import React from "react";

import Styles from "styled-components";

import FooterLogo from "../assets/footer.svg";

const Footer = () => {
  return (
    <FooterElement>
      <FooterFlex>
        <Footerleft>
          <FooterImg src={FooterLogo} alt="footer logo image" />
          <FooterText>
            Gates is a blog that focuses on Japanese art and anime. They feature
            information on Otaku conventions and other anime topics. Hear from
            famous anime filmmakers and artists as well as plenty of news about
            the art of cartoon creation in the Japanese culture.
          </FooterText>
        </Footerleft>
        <FooterRight>
          <Subscribe>Subscribe</Subscribe>
          <Submit>&#62;</Submit>
          <Input type="text" placeholder="Enter your email" />
        </FooterRight>
      </FooterFlex>

      <CopyRight>@copyright 2021 Gates</CopyRight>
    </FooterElement>
  );
};

export default Footer;

// Style for FOOTER CONTAINER
const FooterElement = Styles.footer`
    color: #fff;
    background-color: #333;
    padding: 10px 50px;
    @media screen and (max-width: 768px){
        & {
            padding: 20px;
        }
    }
`;

const FooterFlex = Styles.div`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 992px){
        & {
            flex-wrap: wrap;
            margin: 10px 0;
        }
    }

`;

// styles for footer left side
const Footerleft = Styles.div`
width: 50%;
@media screen and (max-width: 992px){
    & {
        width: 100%;
    }
}
`;

const FooterImg = Styles.img`
width: 80px;
display: block;
`;

// style for footer text
const FooterText = Styles.p`
margin: 20px 0;
font-size: 1.2rem;
`;

// styles for footer right side
const FooterRight = Styles.div`
width: 40%;
display: flex;
padding: 5px;
background-color: #e3e3e3;
height: 70px;
position: relative;
@media screen and (max-width: 992px){
    & {
        width: 100%;
    }
`;

// styles for Subscribe
const Subscribe = Styles.div`
position: absolute;
top: 50%;
transform: translate(10%, -50%);
background-color: #000;
padding: 10px;
font-size: 1.2rem;
border-radius: 5px;
`;

// styles for Subscribe
const Submit = Styles.div`
position: absolute;
top: 50%;
right: 10px;
transform: translate(0%, -50%);
background-color: #000;
padding: 4px 10px;
font-size: 1.2rem;
border-radius: 50%;
`;

// styles for Input
const Input = Styles.input`
padding: 10px 50px 10px 120px;
width: 100%;
font-size: 1.2rem;
outline: none;
border: none;
background-color: transparent;
& placeholder{
    color: #000;
}
`;

// footer copyright
const CopyRight = Styles.p`
    border-top: 2px solid #e3e3e3;
    padding: 10px 0;
    font-size: 1.2rem;
`;
