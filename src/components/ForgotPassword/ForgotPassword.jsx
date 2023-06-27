import React, { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";

function ForgotPassword({ setShowLoader }) {
  const [email, setEmail] = useState("");
  const [emailSendMsg, setEmailSendMsg] = useState("");

  const handleSendEmailBtnClick = async () => {
    if (!email) {
      alert("Email is required !");
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
      alert("Invalid email address !");
    } else {
      setShowLoader(true);
      const url = "/forgot-password";
      await axios
        .post(url, {
          email,
        })
        .then((res) => {
          console.log("Response:::", res);
          if (res) {
            setEmailSendMsg("Password reset link is send to your email");
            setShowLoader(false);
            alert("Email send successfully");
          }
        })
        .catch((error) => {
          setShowLoader(false);
          alert(error.response.data.error);
          console.log("Error::::", error);
        });
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h1>Forgot Password</h1>
        <p className="email-msg">{emailSendMsg}</p>
        <input
          className="email-input-field"
          type="text"
          placeholder="Enter Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="send-email-btn"
          onClick={() => handleSendEmailBtnClick()}
        >
          Send Email
        </button>
        <a href="/">Home</a>
      </div>
    </div>
  );
}

export default ForgotPassword;
