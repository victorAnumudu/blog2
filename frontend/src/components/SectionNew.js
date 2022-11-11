import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../AuthorizationContext";

import Styles from "styled-components";
import Titan1 from "../assets/new/titans1.svg"; //image importation
import Titan2 from "../assets/new/titans2.svg"; //image importation

import { SectionDiv } from "./styles/PageWrappers";

const SectionNew = () => {
  let { isLoggedIn } = AuthContext();
  let [sort, setSort] = useState([
    { name: "all", value: true },
    { name: "new", value: false },
  ]);

  let [posts, setPosts] = useState([]);

  useEffect(() => {
    let getPost = async () => {
      let res = fetch("http://localhost:4000/post/post", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      let result = await res;
      let response = await result.json();
      if (response.status) {
        setPosts(response.post);
      }
    };
    getPost();
  }, []);
  // function to change active sort button when user click on any button to sort
  let onSort = async (e) => {
    let name = e.target.name;
    let res = fetch("http://localhost:4000/post/post", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    let result = await res;
    let response = await result.json();

    setPosts(() => {
      if (name == "all") {
        return response.post.filter((post) => post);
      } else {
        return response.post.filter((post) => post.category == "new");
      }
    });
    setSort((prev) => {
      return prev.map((item) =>
        item.name == name ? { ...item, value: true } : { ...item, value: false }
      );
    });
  };
  return (
    <SectionDiv>
      <Sort>
        <SortItem name="all" active={sort[0].value} onClick={onSort}>
          All
        </SortItem>
        <SortItem name="new" active={sort[1].value} onClick={onSort}>
          New
        </SortItem>
      </Sort>
      <SectionWrap>
        {posts.map((post) => (
          <New key={post._id}>
            <ImgCon>
              <NewImg src={post.image.data} alt="new movie image" />
            </ImgCon>
            <TextWrapper>
              <Text>
                <Category>{post.category}</Category>
                <Title>{post.title}</Title>
                <Description>{post.description}</Description>
                {isLoggedIn && (
                  <Action>
                    <Link to="/edit">Edit</Link>
                    <Link to={`/delete/${post._id}`}>Delete</Link>
                  </Action>
                )}
              </Text>
            </TextWrapper>
          </New>
        ))}
        {/* <New>
          <ImgCon>
            <NewImg src={Titan1} alt="new movie image" />
          </ImgCon>
          <TextWrapper>
            <Text>
              <Category>Category - All</Category>
              <Title>Attack on Titans</Title>
              <Description>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A nulla
                impedit illo maxime! Dolorum ipsa nihil qui modi omnis minus
                sapiente voluptatibus enim recusandae nulla, eligendi dicta
                error deserunt harum fugiat voluptatum odio ipsam assumenda
                voluptatem id cumque delectus.
              </Description>
              {isLoggedIn && (
                <Action>
                  <Link to="/edit">Edit</Link>
                  <Link to="/delete">Delete</Link>
                </Action>
              )}
            </Text>
          </TextWrapper>
        </New> */}
      </SectionWrap>
    </SectionDiv>
  );
};

export default SectionNew;

// STYLE for SORT CONTAINER
const SectionWrap = Styles.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  // justify-content: left;
  // align-items: center;
`;

// STYLE for SORT CONTAINER
const Sort = Styles.div`
  display: flex;
  padding-bottom: 5px;
  border-bottom: 2px solid #000;
`;

// STYLE for SORT ITEM
const SortItem = Styles.button`
padding: 5px 10px;
cursor: pointer;
outline: none;
font-size: 1.3rem;
border: 1px solid #000;
background-color: ${({ active }) => (active ? "transparent" : "#e3e3e3")} ;
color: ${({ active }) => (active ? "orange" : "black")} ;
&:nth-of-type(2){
  margin-left: 10px;
}
&:hover{
  background-color: transparent;
  color: orange;
}
`;

// STYLE for Editing and Delete Post
const Action = Styles.div`
  display: flex;
  margin-top: 20px;

  & a{
    text-decoration: none;
  }
  & a:nth-of-type(2){
    color: darkred;
    margin-left: 10px;
  }

`;

// STYLE for NEW WRAPPER
const New = Styles.div`
width: 30%;
min-width: 400px;
box-shadow: 0px 0px 4px #000;
margin: 10px auto;
  color: #000;
  @media screen and (max-width:568px){
    & {
      width: 100%;
      min-width: 100%;
    }
   }
`;

// STYLE for NEW Image Wrapper
const ImgCon = Styles.div`
  width: 100%;
  padding: 5px;
  // &:hover img{
  //   cursor:pointer;
  //   width: 70%;
  //   max-width: 1000px;
  //   height: auto;
  //   position: fixed;
  //   z-index: 2;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%)
  // }
  @media screen and (max-width:568px){
    & {
      width: 100%;
    }
   }
`;
// STYLE for NEW Image
const NewImg = Styles.img`
  display: block;
  width: 100%;
  // height: 400px;
  // transition: all .1s;
`;

// STYLE for NEW Text Wrapper
const TextWrapper = Styles.div`
  width: 100%;
`;

// STYLE for NEW Text
const Text = Styles.div`
// box-shadow: 0px 0px 3px inset #000;
  background-color: rgba(255,255,255,.6);
  padding: 15px;
`;

// STYLE for Text Category paragraph
const Category = Styles.p`
font-size: 1.1rem;
color: darkred;
font-style: italic;
`;

// STYLE for Text Title
const Title = Styles.h1`
font-size: 1.5rem;
font-weight: 900;
margin: 10px 0;
font-style: italic;
`;

// STYLE for Text Title
const Description = Styles.p`
font-size: 1.3rem;
`;
