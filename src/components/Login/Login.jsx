import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import devcodeIcon from "../../assets/devcode-website-icon.png";
import axios from "axios";

function Login({ setShowNavbar, setShowLoader }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const clearAllFields = () => {
    setEmail("");
    setPassword("");
  };

  const handleLoginBtnClick = async () => {
    if (!email || !password) {
      alert("All fields are required !");
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
      alert("Invalid email address !");
    } else if (password.length < 6) {
      alert("Password must be atleast of 6 characters !");
    } else {
      setShowLoader(true);
      const url = "/login";
      await axios
        .post(url, {
          email,
          password,
        })
        .then((res) => {
          console.log("Response:::", res);
          if (res) {
            localStorage.setItem("userauthtoken", res?.data?.data?.token);
            setShowLoader(false);
            alert("User Login Successfully");
            clearAllFields();
            setShowNavbar(true);
            navigate("/");
          }
        })
        .catch((error) => {
          setShowLoader(false);
          alert(error?.response?.data.error || "User Login Failed !");
          console.log("Error::::", error);
        });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Sign In</h1>
        <img src={devcodeIcon} alt="DevCode" />
        <input
          className="input-field"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="/forgot-password">Forgot Password ?</a>
        <button className="login-btn" onClick={() => handleLoginBtnClick()}>
          Login
        </button>
        <a href="/signup">Don't have an account? Sign Up</a>
      </div>
    </div>
  );
}

export default Login;
