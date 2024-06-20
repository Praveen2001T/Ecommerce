import React from "react";
import "./CSS/LoginSignup.css";
import { useState } from "react";
import axios from "axios";

const LoginSignup = () => {
  const [tab, setTab] = useState("Login");
  const [error, setError] = useState("");
  const [login, setLogin] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleTab = () => {
    if (tab === "Login") {
      setTab("Sign Up");
      setLogin({
        username: "",
        email: "",
        password: "",
      });
    } else {
      setTab("Login");
      setLogin({
        email: "",
        password: "",
      });
    }
  };

  const handleChange = (key, val) => {
    setLogin((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/login", login);
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("auth-token", response.data.token);
        window.location.replace("/");
      } else {
        alert(response.data.error);
      }
    } catch (err) {
      console.log(err);
    }
    console.log(login);
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:4000/signup", login);
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("auth-token", response.data.token);
        window.location.replace("/");
      } else {
        alert(response.data.error);
      }
    } catch (err) {
      console.log(err);
    }
    console.log(login);
  };

  return (
    <div>
      <div className="signUp">
        <div className="signUp_container">
          <h1 className="title">{tab}</h1>
          <div className="signUp_fields">
            {tab === "Sign Up" && (
              <input
                type="text"
                value={login?.username}
                placeholder="Your Name"
                onChange={(e) => handleChange("username", e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              value={login?.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
            {!!error ? error : null}
            <input
              type="password"
              placeholder="Password"
              value={login?.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
            />
          </div>
          <button onClick={tab === "Login" ? handleLogin : handleSignIn}>
            Continue
          </button>
          {tab === "Sign Up" ? (
            <p className="signUp_login">
              Already have an account?{" "}
              <span className="header" onClick={handleTab}>
                Login here
              </span>
            </p>
          ) : (
            <p className="signUp_login">
              Don't you have an account?{" "}
              <span className="header" onClick={handleTab}>
                Sign Up
              </span>
            </p>
          )}
          {tab === "Sign Up" && (
            <div className="signUp_agree">
              <div className="agree_input">
                <input type="checkbox" name="" id="" />
              </div>
              <p>
                By continuing, i agree to the terms of use use & privacy policy
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
