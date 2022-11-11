import React, { createContext, useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Authorization = createContext();

export const AuthorizationProvider = (props) => {
  const navigate = useNavigate();
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(()=>{
    if(token){
      setIsLoggedIn(true)
      navigate("/profile");
    }else {
      setIsLoggedIn(false)
      navigate("/");
    }
  },[token])

  let login = () => {
    // setIsLoggedIn(true);
    setToken(localStorage.getItem('token'))
  };
  
  let logout = () => {
    // setIsLoggedIn(false);
    localStorage.removeItem('token')
    setToken(null)
  };
  let authorizationValue = { isLoggedIn, login, logout };

  return (
    <Authorization.Provider value={authorizationValue}>
      {props.children}
    </Authorization.Provider>
  );
};

export const AuthContext = () => {
  return useContext(Authorization);
};
