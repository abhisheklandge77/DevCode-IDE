import React from "react";
import { useNavigate } from "react-router-dom";
import codingImage from "../../assets/home-page-coding.png";
import "./Home.css";

function Home({ setShowNavbar, setShowEditorOptions }) {
  const navigate = useNavigate();

  return (
    <div classNameName="home-container">
      <div className="main1">
        <div className="container1">
          <div className="text1">
            <h1>Welcome to DevCode !!!</h1>
            <h2>
              "Where creativity meets functionality – your ultimate web
              development destination."
            </h2>
          </div>

          <div className="text2">
            <img src={codingImage} alt="DevCode" />
          </div>
        </div>
        <div className="button">
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
      </div>
    </div>
  );
}

export default Home;
