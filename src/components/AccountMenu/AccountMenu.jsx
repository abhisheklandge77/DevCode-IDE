import React from "react";
import { useState } from "react";
import "./AccountMenu.css";
import { Menu, MenuItem } from "@mui/material";
import { Home, Logout, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AccountMenu(props) {
  const { userData, setShowNavbar, setShowEditorOptions, setShowLoader } =
    props;
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = async () => {
    handleClose();
    setShowLoader(true);
    const token = localStorage.getItem("userauthtoken");
    const url = "/logout";
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    console.log("logout response:::", response);
    if (response) {
      localStorage.removeItem("userauthtoken");
      setShowNavbar(false);
      setShowLoader(false);
      navigate("/login");
    } else {
      setShowLoader(false);
      alert("Failed to logout !");
    }
  };

  return (
    <div className="menu-container">
      <div
        className="menu-symbol"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <p>{userData ? userData?.userName[0] : <Person />}</p>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            color: "#12121a",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setShowEditorOptions(false);
            navigate("/");
          }}
        >
          <Home className="account-menu-icon" fontSize="small" /> Home
        </MenuItem>
        {!userData?.userName && (
          <MenuItem
            onClick={() => {
              handleClose();
              setShowNavbar(false);
              navigate("/login");
            }}
          >
            <Person className="account-menu-icon" fontSize="small" /> Sign In
          </MenuItem>
        )}
        {userData?.userName && (
          <>
            <MenuItem onClick={handleClose}>
              <Person className="account-menu-icon" fontSize="small" /> Profile
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>
              <Logout className="account-menu-icon" fontSize="small" />
              Logout
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
}

export default AccountMenu;
