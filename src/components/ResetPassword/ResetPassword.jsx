import React, { useState } from "react";
import "./ResetPassword.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword({ setShowLoader }) {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const { id, token } = useParams();
  console.log("Params:::", id, token);

  const navigate = useNavigate();

  const clearAllFields = () => {
    setPassword("");
    setConfirmpassword("");
  };

  const handleResetBtnClick = async () => {
    if (password.length < 6) {
      alert("Password must be atleast of 6 characters !");
    } else if (password !== confirmpassword) {
      alert("Password and Confirm Password are not equal !");
    } else {
      setShowLoader(true);
      const url = `/reset-password/${id}/${atob(token)}`;
      await axios
        .post(url, {
          newPassword: password,
        })
        .then((res) => {
          console.log("Response:::", res);
          if (res) {
            setShowLoader(false);
            alert("Password Updated Successfully");
            clearAllFields();
            navigate("/login");
          }
        })
        .catch((error) => {
          setShowLoader(false);
          console.log("Error::::", error);
        });
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <h1>Reset Password</h1>
        <input
          className="password-input-field"
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="password-input-field"
          type="password"
          placeholder="Confirm Password"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <button className="reset-btn" onClick={() => handleResetBtnClick()}>
          Submit
        </button>
        <a href="/">Home</a>
      </div>
    </div>
  );
}

export default ResetPassword;
