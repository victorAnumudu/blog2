import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../AuthorizationContext";

import { Overlay } from "../components/styles/Overlay";

import { Main } from "../components/styles/PageWrappers";
import style from "../components/styles/form.module.css"; // css file for styling

const Login = () => {
  const { login } = AuthContext();
  // const navigate = useNavigate();

  // state for inputs in signup form
  let [input, setInput] = useState([
    { name: "email", value: "" },
    { name: "password", value: "" },
  ]);

  //function to set input value on change
  let inputOnchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((prev) =>
      prev.map((input) =>
        input.name === name ? { ...input, value } : { ...input }
      )
    );
  };

  let handleLogin = async (e) => {
    e.preventDefault();
    let msg = document.querySelector(".msg"); // message element
    msg.textContent = "";

    let spinner = document.querySelector(".form_spinner__MAXR9"); // spinner element
    spinner.classList.remove("form_hide_spinner__dKWth");

    let errorArr = []; // an array to hold error
    let requiredInput = ["email", "password"]; // an array to hold required input fields
    let userInfo = {
      email: input[0].value,
      password: input[1].value,
    };

    // checking if any required input is empty and updated errorArr
    for (let info in userInfo) {
      if (!userInfo[info] && requiredInput.includes(info))
        errorArr.push(`${info} is required`);
    }

    //returns the function if any required input field is empty
    // if (errorArr.length > 0) {
    //   msg.textContent = errorArr.join(", ");
    //   msg.style.color = "red";
    //   setTimeout(() => {
    //     spinner.classList.add("form_hide_spinner__dKWth");
    //   }, 500);
    //   return;
    // }

    // //check and throw error if email address is invalid
    // if (
    //   !/^[^0-9][a-zA-Z0-9._%+-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(userInfo.email)
    // ) {
    //   errorArr.push(`invalid email`);
    // }

    // // checking if password length is up to five characters
    // if (userInfo.password.length < 5) {
    //   errorArr.push(`password must be upto 5 characters`);
    // }

    // // updates the UI with error info, if error exist or proceeds if no error is found in error array
    // if (errorArr.length > 0) {
    //   msg.textContent = errorArr.join(", ");
    //   msg.style.color = "red";
    //   setTimeout(() => {
    //     spinner.classList.add("form_hide_spinner__dKWth");
    //   }, 500);
    //   return;
    // }

    try {
      let res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          'content-type' : 'application/json'
        }
      });

      let response = await res.json();
      msg.textContent = response.message;

      if (response.status) {
        localStorage.setItem('token', response.token);
        msg.style.color = "green";
        setTimeout(() => {
          login()
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

  let [showPwd, setShowPwd] = useState(false); // changes password type to text if true
  // function to set show password
  let handleShwoPwd = () => {
    setShowPwd((prev) => !prev);
  };
  return (
    <Main>
      <div className={style.form_con}>
        <Overlay />
        <form onSubmit={handleLogin}>
          <h2>Login Form</h2>
          <p className={`msg`}></p>
          <div className={style.input_group}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={inputOnchange}
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="password">Password</label>
            <input
              type={showPwd ? "text" : "password"}
              name="password"
              id="password"
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
          <p>
            Don't have Account?
            <Link to="/signup"> Signup</Link>
          </p>
          <div className={style.submit_group}>
            <div className={`${style.spinner} ${style.hide_spinner}`}></div>
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </Main>
  );
};

export default Login;
