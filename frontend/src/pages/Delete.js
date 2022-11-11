import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Main } from "../components/styles/PageWrappers";

import { Overlay } from "../components/styles/Overlay";

import style from "../components/styles/form.module.css"; // css file for styling

const Delete = () => {
  let [posts, setPosts] = useState({});

  const { pathname } = useLocation(); // pathname
  let navigate = useNavigate();

  let postId = pathname.split("/")[pathname.split("/").length - 1];

  useEffect(() => {
    let getPost = async () => {
      let res = fetch(`http://localhost:4000/post/post/${postId}`, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
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

  //function to handle delete request
  let handleDeletePost = async (e) => {
    e.preventDefault();
    let msg = document.querySelector(".msg"); // message element
    msg.textContent = "";

    let spinner = document.querySelector(".form_spinner__MAXR9"); // spinner element
    spinner.classList.remove("form_hide_spinner__dKWth");

    try {
      let res = await fetch(`http://localhost:4000/post/delete/${postId}`, {
        method: "DELETE",
        headers: {
          authorization: localStorage.getItem("token"),
          "content-type": "application/json",
        },
      });

      let response = await res.json();
      msg.textContent = response.message;

      if (response.status) {
        localStorage.setItem("token", response.token);
        msg.style.color = "green";
        setTimeout(() => {
          navigate("/profile");
          spinner.classList.add("form_hide_spinner__dKWth");
        }, 500);
      } else {
        msg.style.color = "red";
        setTimeout(() => {
          navigate("/profile");
          spinner.classList.add("form_hide_spinner__dKWth");
        }, 500);
      }
    } catch (error) {
      msg.textContent = error.message;
      msg.style.color = "red";
      setTimeout(() => {
        navigate("/profile");
        spinner.classList.add("form_hide_spinner__dKWth");
      }, 500);
    }
  };

  return (
    <Main>
      <div className={style.form_con}>
        <Overlay />
        <form onSubmit={handleDeletePost}>
          <h2>Delete Post</h2>
          <p className={`msg`}></p>
          <div className={style.input_group}>
            <label htmlFor="name">Title</label>
            <input
              type="text"
              name="name"
              value={posts.title}
              id="name"
              disabled
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="post">Description</label>
            <textarea
              name="post"
              id="post"
              value={posts.description}
              disabled
            />
          </div>
          <div className={style.submit_group}>
            <div className={`${style.spinner} ${style.hide_spinner}`}></div>
            <input type="submit" value="Delete" />
          </div>
        </form>
      </div>
    </Main>
  );
};

export default Delete;
