import React, { useState } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../../UserContext/store";
import { useEffect } from "react";

function UpdateProfile({ setShowLoader }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const userData = useContext(UserContext);

  useEffect(() => {
    if (userData) {
      setUserName(userData?.userName);
      setEmail(userData?.email);
    }
  }, [userData]);

  const clearAllFields = () => {
    setUserName("");
    setEmail("");
  };

  const handleUpdateBtnClick = async () => {
    if (!userName || !email) {
      alert("All fields are required !");
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
      alert("Invalid email address !");
    } else {
      setShowLoader(true);
      const url = "/update-user";
      await axios
        .post(url, {
          userId: userData?._id,
          userName,
          email,
        })
        .then((res) => {
          if (res) {
            setShowLoader(false);
            alert("User Updated Successfully");
            clearAllFields();
            navigate("/profile");
          }
        })
        .catch((error) => {
          setShowLoader(false);
          alert(error.response.data.error || "User Update Failed !");
          console.log("Error::::", error);
        });
    }
  };

  return (
    <div className="update-profile-container">
      <div className="update-profile-form">
        <h1>Update Profile</h1>
        <input
          className="update-input-field"
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="update-input-field"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="link" onClick={() => navigate("/forgot-password")}>
          Reset Password
        </span>
        <button className="update-btn" onClick={() => handleUpdateBtnClick()}>
          Update
        </button>
        <span className="link" onClick={() => navigate("/profile")}>
          Back
        </span>
      </div>
    </div>
  );
}

export default UpdateProfile;
