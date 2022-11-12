import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Main } from "../components/styles/PageWrappers";

import { Overlay } from "../components/styles/Overlay";

import style from "../components/styles/form.module.css"; // css file for styling

const Signup = () => {
  const navigate = useNavigate();

  // const [payload, setPayload] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   confirmpassword: '',
  //   image: ''

  // })

  // const handleChange = ({target: {name, value}}) => {
  //   setPayload(prev=> {
  //     return {...prev, [name]: value}
  //   })
  // }

  // state for inputs in signup form
  let [input, setInput] = useState([
    { name: "name", value: "" },
    { name: "email", value: "" },
    { name: "password", value: "" },
    { name: "comfirmpassword", value: "" },
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

  let handleSubmit = async (e) => {
    e.preventDefault();

    let msg = document.querySelector(".msg"); // message element
    msg.textContent = "";

    let spinner = document.querySelector(".form_spinner__MAXR9"); // spinner element
    spinner.classList.remove("form_hide_spinner__dKWth");

    let errorArr = []; // an array to hold error
    let requiredInput = [
      "name",
      "email",
      "password",
      "confirmpassword",
      "image",
    ]; // an array to hold required input fields
    let userInfo = {
      name: input[0].value,
      email: input[1].value,
      password: input[2].value,
      confirmpassword: input[3].value,
      image: input[4].value,
    };

    // // checking if any required input is empty and updated errorArr
    for (let info in userInfo) {
      if (!userInfo[info] && requiredInput.includes(info))
        errorArr.push(`${info} is required`);
    }

    // //returns the function if any required input field is empty
    if (errorArr.length > 0) {
      msg.textContent = errorArr.join(", ");
      msg.style.color = "red";
      setTimeout(() => {
        spinner.classList.add("form_hide_spinner__dKWth");
      }, 500);
      return;
    }

    //check and throw error if email address is invalid
    if (
      !/^[^0-9][a-zA-Z0-9._%+-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(userInfo.email)
    ) {
      errorArr.push(`invalid email`);
    }

    // checking if password matches confirmpassword
    if (userInfo.password != userInfo.confirmpassword) {
      errorArr.push(`password mismatched`);
    }

    // checking if password length is up to five characters
    if (userInfo.password.length < 5) {
      errorArr.push(`password must be upto 5 characters`);
    }

    // updates the UI with error info, if error exist or proceeds if no error is found in error array
    if (errorArr.length > 0) {
      msg.textContent = errorArr.join(", ");
      msg.style.color = "red";
      setTimeout(() => {
        spinner.classList.add("form_hide_spinner__dKWth");
      }, 500);
      return;
    }

    // creating new form data
    const formData = new FormData();
    delete userInfo.confirmpassword;

    for (let key in userInfo) {
      formData.append(key, userInfo[key]);
    }
    try {
      let res = await fetch("https://carton.onrender.com/auth/signup", {
        method: "POST",
        body: formData,
      });

      let response = await res.json();

      msg.textContent = response.message;
      if (response.status) {
        msg.style.color = "green";
        setTimeout(() => {
          spinner.classList.add("form_hide_spinner__dKWth");
          navigate("/login");
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

  let [showPwd, setShowPwd] = useState(false); // changes password type to text if true
  // function to set show password
  let handleShwoPwd = () => {
    setShowPwd((prev) => !prev);
  };

  return (
    <Main>
      <div className={style.form_con}>
        <Overlay />
        <form onSubmit={handleSubmit}>
          <h2>Signup Form</h2>
          <p className={`msg`}></p>
          <div className={style.input_group}>
            <label htmlFor="name">Fullname</label>
            <input
              type="text"
              name="name"
              id="name"
              value={input[0].value}
              onChange={inputOnchange}
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={input[1].value}
              onChange={inputOnchange}
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="password">Password</label>
            <input
              type={showPwd ? "text" : "password"}
              name="password"
              id="password"
              value={input[2].value}
              onChange={inputOnchange}
            />
            {showPwd ? (
              <i className="fa-solid fa-lock-open" onClick={handleShwoPwd}></i>
            ) : (
              <i
                className="fa-sharp fa-solid fa-lock"
                onClick={handleShwoPwd}
              ></i>
            )}
          </div>
          <div className={style.input_group}>
            <label htmlFor="comfirmpassword">Retype Password</label>
            <input
              type={showPwd ? "text" : "password"}
              name="comfirmpassword"
              id="comfirmpassword"
              value={input[3].value}
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
          <p>
            Already have Account?
            <Link to="/login"> Login</Link>
          </p>
          <div className={style.submit_group}>
            <div className={`${style.spinner} ${style.hide_spinner}`}></div>
            <input type="submit" value="Signup" />
          </div>
        </form>
      </div>
    </Main>
  );
};

export default Signup;
