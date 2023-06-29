import React, { useState } from "react";
import "./Signup.css";
import devcodeIcon from "../../assets/devcode-website-icon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup({ setShowLoader }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const navigate = useNavigate();

  const clearAllFields = () => {
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmpassword("");
  };

  const handleRegisterBtnClick = async () => {
    if (!userName || !email || !password || !confirmpassword) {
      alert("All fields are required !");
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
      alert("Invalid email address !");
    } else if (password.length < 6) {
      alert("Password must be atleast of 6 characters !");
    } else if (password !== confirmpassword) {
      alert("Password and Confirm Password are not equal !");
    } else {
      setShowLoader(true);
      const url = "/register";
      await axios
        .post(url, {
          userName,
          email,
          password,
        })
        .then((res) => {
          console.log("Response:::", res);
          if (res) {
            setShowLoader(false);
            alert("User Registered Successfully");
            clearAllFields();
            navigate("/login");
          }
        })
        .catch((error) => {
          setShowLoader(false);
          alert(error.response.data.error || "User Registration Failed !");
          console.log("Error::::", error);
        });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Sign Up</h1>
        <img src={devcodeIcon} alt="DevCode" />
        <input
          className="input-field"
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
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
        <input
          className="input-field"
          type="password"
          placeholder="Confirm Password"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <button className="signup-btn" onClick={() => handleRegisterBtnClick()}>
          Register
        </button>
        <a href="/login">Already have an account? Login</a>
      </div>
    </div>
  );
}

export default Signup;
