import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Main } from "../components/styles/PageWrappers";

import { Overlay } from "../components/styles/Overlay";

import style from "../components/styles/form.module.css"; // css file for styling

const Post = (e) => {
  const navigate = useNavigate();

  // state for inputs in signup form
  let [input, setInput] = useState([
    { name: "title", value: "" },
    { name: "description", value: "" },
    { name: "image", value: "" },
  ]);

  //function to set input value on change
  let inputOnchange = (e) => {
    let name = e.target.name;
    setInput((prev) => {
      return prev.map((input) => {
        if (input.name === name && name === "image") {
          return { ...input, value: e.target.files[0] };
        } else if (input.name === name) {
          return { ...input, value: e.target.value };
        } else {
          return { ...input };
        }
      });
    });
  };

  let handlePost = async (e) => {
    e.preventDefault();
    let msg = document.querySelector(".msg"); // message element
    msg.textContent = "";

    let spinner = document.querySelector(".form_spinner__MAXR9"); // spinner element
    spinner.classList.remove("form_hide_spinner__dKWth");

    let errorArr = []; // an array to hold error
    let requiredInput = ["name", "email", "image"]; // an array to hold required input fields
    let userInfo = {
      title: input[0].value,
      description: input[1].value,
      image: input[2].value,
    };

    // // checking if any required input is empty and updated errorArr
    for (let info in userInfo) {
      if (!userInfo[info] && requiredInput.includes(info))
        errorArr.push(`${info} is required`);
    }

    // creating new form data
    const formData = new FormData();
    delete userInfo.confirmpassword;

    for (let key in userInfo) {
      formData.append(key, userInfo[key]);
    }
    try {
      let res = await fetch("https://carton.onrender.com/post/post", {
        method: "POST",
        body: formData,
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      let response = await res.json();
      msg.textContent = response.message;

      if (response.status) {
        msg.style.color = "green";
        setTimeout(() => {
          navigate("/profile");
          spinner.classList.add("form_hide_spinner__dKWth");
        }, 500);
      } else {
        msg.style.color = "red";
        setTimeout(() => {
          spinner.classList.add("form_hide_spinner__dKWth");
        }, 500);
      }
    } catch (error) {
      msg.textContent = error.message;
      msg.style.color = "red";
      setTimeout(() => {
        spinner.classList.add("form_hide_spinner__dKWth");
      }, 500);
    }
  };
  return (
    <Main>
      <div className={style.form_con}>
        <Overlay />
        <form onSubmit={handlePost}>
          <h2>Post Form</h2>
          <p className={`msg`}></p>
          <div className={style.input_group}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={input[0].value}
              onChange={inputOnchange}
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={input[1].value}
              onChange={inputOnchange}
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="file">Select Image</label>
            <input
              type="file"
              name="image"
              id="file"
              accept="image/*"
              onChange={inputOnchange}
            />
          </div>
          <div className={style.submit_group}>
            <div className={`${style.spinner} ${style.hide_spinner}`}></div>
            <input type="submit" value="Post" />
          </div>
        </form>
      </div>
    </Main>
  );
};

export default Post;
