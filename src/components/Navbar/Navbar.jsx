import React from "react";
import "./Navbar.css";
import logo from "../../assets/devcode-logo.png";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountMenu from "../AccountMenu/AccountMenu";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../../UserContext/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const {
    editorTheme,
    setEditorTheme,
    projectName,
    setProjectName,
    setShowNavbar,
    showEditorOptions,
    setShowEditorOptions,
    setShowLoader,
    htmlCode,
    cssCode,
    jsCode,
    projectId,
    setProjectId,
    setHtmlCode,
    setCssCode,
    setJsCode,
  } = props;

  const userData = useContext(UserContext);
  console.log("UserData:::", userData);

  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/code-editor") {
      setShowEditorOptions(true);
    } else {
      setShowEditorOptions(false);
    }
  }, [window.location.pathname]);

  const handleSaveBtnClick = async () => {
    if (!userData?.userName) {
      const confirmation = confirm(
        "You are not signed in! Sign in first to save your project."
      );
      if (!confirmation) {
        return;
      }
      setShowNavbar(false);
      navigate("/login");
      return;
    } else {
      setShowLoader(true);

      const url = "/save-project";
      await axios
        .post(url, {
          id: userData._id,
          projectName: projectName || "Untitled",
          htmlCode,
          cssCode,
          jsCode,
          projectId,
        })
        .then((res) => {
          if (res) {
            if (res?.data?.data?.projects?.length) {
              res?.data?.data?.projects.forEach((project) => {
                if (project.projectName === projectName) {
                  setProjectId(project._id);
                }
              });
            }
            setShowLoader(false);
            alert(`Project ${projectName} saved successfully`);
          }
        })
        .catch((error) => {
          setShowLoader(false);
          console.log("Error::::", error);
        });
    }
  };

  return (
    <nav className="nav-container">
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="DevCode Logo" />
      </div>
      {showEditorOptions && (
        <input
          className="project-name-input"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      )}
      <div className="account-settings">
        {showEditorOptions && (
          <>
            <button className="save-btn" onClick={() => handleSaveBtnClick()}>
              Save
            </button>
            <button
              className="theme-button"
              onClick={() =>
                setEditorTheme(editorTheme === "dark" ? "light" : "dark")
              }
            >
              {editorTheme === "dark" ? (
                <LightModeIcon className="sun-icon" titleAccess="Light Theme" />
              ) : (
                <DarkModeIcon className="moon-icon" titleAccess="Dark Theme" />
              )}
            </button>
          </>
        )}
        <AccountMenu
          userData={userData}
          setShowNavbar={setShowNavbar}
          setShowEditorOptions={setShowEditorOptions}
          setShowLoader={setShowLoader}
          setHtmlCode={setHtmlCode}
          setCssCode={setCssCode}
          setJsCode={setJsCode}
          setProjectName={setProjectName}
          setProjectId={setProjectId}
          htmlCode={htmlCode}
          cssCode={cssCode}
          jsCode={jsCode}
          projectId={projectId}
          projectName={projectName}
        />
      </div>
    </nav>
  );
}

export default Navbar;
