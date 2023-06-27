import React from "react";
import { useNavigate } from "react-router-dom";

function Home({ setShowNavbar, setShowEditorOptions }) {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <button
        onClick={() => {
          setShowNavbar(false);
          navigate("/signup");
        }}
      >
        Sign Up
      </button>
      <button
        onClick={() => {
          setShowNavbar(true);
          setShowEditorOptions(true);
          navigate("/code-editor");
        }}
      >
        Code Now !
      </button>
    </div>
  );
}

export default Home;
