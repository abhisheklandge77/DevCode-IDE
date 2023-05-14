import React from "react";
import "./Navbar.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function Navbar(props) {
  const { editorTheme, setEditorTheme } = props;

  return (
    <nav className="nav-container">
      <div className="logo">
        <h2>DevCode</h2>
      </div>
      <button
        className="theme-button"
        onClick={() =>
          setEditorTheme(editorTheme === "dark" ? "light" : "dark")
        }
      >
        {editorTheme === "dark" ? (
          <LightModeIcon className="sun-icon" />
        ) : (
          <DarkModeIcon className="moon-icon" />
        )}
      </button>
    </nav>
  );
}

export default Navbar;
